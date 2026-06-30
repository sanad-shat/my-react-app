import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiBell,
  FiSearch,
  FiGrid,
  FiInbox,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiSend,
  FiPaperclip,
  FiSmile,
  FiFileText,
} from "react-icons/fi";
import { supabase } from "../lib/supabase";
import "./AgentDashboard.css";

const AgentDashboard = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);

  const repliedTicketIds = new Set(
    allMessages
      .filter((msg) => msg.sender === "agent")
      .map((msg) => msg.ticket_id)
  );

  const totalTickets = tickets.length;

  const repliedTickets = tickets.filter(
    (ticket) =>
      repliedTicketIds.has(ticket.id) ||
      ticket.status === "answered" ||
      ticket.status === "closed" ||
      ticket.status === "resolved"
  ).length;

  const notRepliedTickets = totalTickets - repliedTickets;

  const text = {
    title: isArabic ? "الدعم الفني" : "Technical Support",
    dashboard: isArabic ? "لوحة التذاكر" : "Ticket Dashboard",
    agentName: isArabic ? "أحمد خالد" : "Ahmed Khaled",
    online: isArabic ? "متصل الآن" : "Online",
    control: isArabic ? "لوحة التحكم" : "Dashboard",
    allTickets: isArabic ? "كل التذاكر" : "All Tickets",
    assigned: isArabic ? "تذاكري المعينة" : "Assigned Tickets",
    customers: isArabic ? "العملاء" : "Customers",
    reports: isArabic ? "التقارير" : "Reports",
    settings: isArabic ? "الإعدادات" : "Settings",
    search: isArabic ? "بحث سريع..." : "Quick search...",
    totalTickets: isArabic ? "عدد التذاكر" : "Total Tickets",
    repliedTickets: isArabic ? "تم الرد عليها" : "Replied Tickets",
    notRepliedTickets: isArabic ? "لم يتم الرد عليها" : "Not Replied",
    assignedTo: isArabic
      ? "تم تعيين التذكرة إلى أحمد خالد"
      : "Ticket assigned to Ahmed Khaled",
    quickReplies: isArabic ? "ردود سريعة:" : "Quick Replies:",
    apologize: isArabic ? "نعتذر للخلل" : "Apologize for issue",
    solved: isArabic ? "تم حل المشكلة" : "Issue solved",
    internal: isArabic ? "ملاحظة داخلية" : "Internal note",
    placeholder: isArabic ? "اكتب ردك هنا..." : "Write your reply here...",
    send: isArabic ? "إرسال الرد" : "Send Reply",
    noTickets: isArabic ? "لا توجد تذاكر حالياً." : "No tickets found.",
    loading: isArabic ? "جاري تحميل التذاكر..." : "Loading tickets...",
    customer: isArabic ? "العميل" : "Customer",
    department: isArabic ? "القسم" : "Department",
  };

  const changeLanguage = () => {
    i18n.changeLanguage(isArabic ? "en" : "ar");
  };

  const fetchTickets = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Tickets error:", error);
      setTickets([]);
      setSelectedTicket(null);
    } else {
      setTickets(data || []);
      setSelectedTicket((current) => current || data?.[0] || null);
    }

    setLoading(false);
  };

  const fetchAllMessages = async () => {
    const { data, error } = await supabase
      .from("ticket_messages")
      .select("*");

    if (error) {
      console.log("All messages error:", error);
      setAllMessages([]);
    } else {
      setAllMessages(data || []);
    }
  };

  const fetchMessages = async (ticketId) => {
    if (!ticketId) return;

    const { data, error } = await supabase
      .from("ticket_messages")
      .select("*")
      .eq("ticket_id", ticketId)
      .order("created_at", { ascending: true });

    if (error) {
      console.log("Messages error:", error);
      setMessages([]);
    } else {
      setMessages(data || []);
    }
  };

  const sendMessage = async () => {
    if (!reply.trim() || !selectedTicket) return;

    const { error } = await supabase.from("ticket_messages").insert([
      {
        ticket_id: selectedTicket.id,
        sender: "agent",
        message: reply,
      },
    ]);

    if (error) {
      console.log("Send message error:", error);
      return;
    }

    const { error: updateError } = await supabase
      .from("tickets")
      .update({ status: "answered" })
      .eq("id", selectedTicket.id);

    if (updateError) {
      console.log("Update ticket status error:", updateError);
    }

    setReply("");

    const updatedTicket = {
      ...selectedTicket,
      status: "answered",
    };

    setSelectedTicket(updatedTicket);

    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === selectedTicket.id ? updatedTicket : ticket
      )
    );

    fetchMessages(selectedTicket.id);
    fetchAllMessages();
  };

  useEffect(() => {
    fetchTickets();
    fetchAllMessages();
  }, []);

  useEffect(() => {
    if (selectedTicket) {
      fetchMessages(selectedTicket.id);
    }
  }, [selectedTicket]);

  return (
    <div className="agent-dashboard" dir={isArabic ? "rtl" : "ltr"}>
      <aside className="agent-sidebar">
        <h1 className="agent-title">{text.title}</h1>

        <div className="agent-profile">
          <img src="https://i.pravatar.cc/100?img=15" alt="agent" />
          <div>
            <h3>{text.agentName}</h3>
            <p>{isArabic ? "فني مستوى ثان" : "Level 2 Agent"}</p>
            <span>{text.online}</span>
          </div>
        </div>

        <nav className="agent-menu">
          <button className="active">
            <FiGrid /> {text.control}
          </button>
          <button>
            <FiInbox /> {text.allTickets}
          </button>
          <button>
            <FiFileText /> {text.assigned}
          </button>
          <button>
            <FiUsers /> {text.customers}
          </button>
          <button>
            <FiBarChart2 /> {text.reports}
          </button>
          <button>
            <FiSettings /> {text.settings}
          </button>
        </nav>
      </aside>

      <main className="agent-main">
        <header className="agent-topbar">
          <div className="agent-avatar-box">
            <img src="https://i.pravatar.cc/100?img=12" alt="avatar" />
            <FiBell />
          </div>

          <div className="agent-search">
            <FiSearch />
            <input placeholder={text.search} />
          </div>

          <button className="agent-lang" onClick={changeLanguage}>
            {isArabic ? "English" : "العربية"}
          </button>
        </header>

        <h2>{text.dashboard}</h2>

        <div className="stats-grid">
          <div className="stat-card blue">
            <span>{totalTickets}</span>
            <p>{text.totalTickets}</p>
          </div>

          <div className="stat-card green">
            <span>{repliedTickets}</span>
            <p>{text.repliedTickets}</p>
          </div>

          <div className="stat-card red">
            <span>{notRepliedTickets}</span>
            <p>{text.notRepliedTickets}</p>
          </div>
        </div>

        <div className="agent-workspace">
          <section className="conversation-panel">
            {selectedTicket ? (
              <>
                <div className="conversation-header">
                  <button className="status-btn">
                    {selectedTicket.status || "open"}
                  </button>

                  <div>
                    <span>#{`TKT-${selectedTicket.id}`}</span>
                    <h3>{selectedTicket.title}</h3>
                    <p>
                      {text.customer}:{" "}
                      {selectedTicket.customer_name || "Customer"} —{" "}
                      {text.department}:{" "}
                      {selectedTicket.department || text.title}
                    </p>
                  </div>
                </div>

                <div className="messages-area">
                  <div className="message customer-message">
                    {selectedTicket.description}
                    <small>10:45</small>
                  </div>

                  <div className="assignment-note">{text.assignedTo}</div>

                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={
                        msg.sender === "agent"
                          ? "message agent-message"
                          : "message customer-message"
                      }
                    >
                      {msg.message}
                      <small>
                        {new Date(msg.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </div>
                  ))}
                </div>

                <div className="quick-replies">
                  <span>{text.quickReplies}</span>
                  <button onClick={() => setReply(text.apologize)}>
                    {text.apologize}
                  </button>
                  <button onClick={() => setReply(text.solved)}>
                    {text.solved}
                  </button>
                  <button onClick={() => setReply(text.internal)}>
                    {text.internal}
                  </button>
                </div>

                <div className="reply-box">
                  <textarea
                    placeholder={text.placeholder}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />

                  <div className="reply-actions">
                    <button onClick={sendMessage}>
                      <FiSend />
                      {text.send}
                    </button>

                    <div>
                      <FiFileText />
                      <FiSmile />
                      <FiPaperclip />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p>{text.noTickets}</p>
            )}
          </section>

          <section className="tickets-panel">
            {loading ? (
              <p>{text.loading}</p>
            ) : tickets.length === 0 ? (
              <p>{text.noTickets}</p>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`support-ticket ${
                    selectedTicket?.id === ticket.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div>
                    <span className={`priority-badge ${ticket.priority}`}>
                      {ticket.priority}
                    </span>
                    <strong>#TKT-{ticket.id}</strong>
                  </div>

                  <h4>{ticket.title}</h4>
                  <p>{ticket.description}</p>

                  <footer>
                    <span>{ticket.department || text.title}</span>
                    <span>{ticket.status || "open"}</span>
                  </footer>
                </div>
              ))
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;