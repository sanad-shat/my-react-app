import { useNavigate } from "react-router-dom";
import { MdSupportAgent } from "react-icons/md";
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
  FiTrash2,
  FiUserX,
  FiSend,
  FiPaperclip,
  FiSmile,
  FiFileText,
} from "react-icons/fi";
import { supabase } from "../lib/supabase";
import "./AgentDashboard.css";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [activePage, setActivePage] = useState("dashboard");
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);

  const fakeUsers = [
    { id: "fake-1", full_name: "أحمد خالد", email: "ahmed.khaled@supporthub.com", role: "agent", status: "active" },
    { id: "fake-2", full_name: "سارة المنصور", email: "sara.almansour@supporthub.com", role: "admin", status: "active" },
    { id: "fake-3", full_name: "محمد علي", email: "mohammad.ali@supporthub.com", role: "customer", status: "active" },
    { id: "fake-4", full_name: "ليلى خالد", email: "laila.khaled@supporthub.com", role: "agent", status: "active" },
    { id: "fake-5", full_name: "عمر السبيعي", email: "omar.alsubaie@supporthub.com", role: "customer", status: "active" },
    { id: "fake-6", full_name: "نورة العتيبي", email: "noura.alotaibi@supporthub.com", role: "customer", status: "active" },
    { id: "fake-7", full_name: "خالد العتيبي", email: "khalid.alotaibi@supporthub.com", role: "agent", status: "active" },
    { id: "fake-8", full_name: "سما الحربي", email: "sama.alharbi@supporthub.com", role: "customer", status: "active" },
    { id: "fake-9", full_name: "خالد الحمد", email: "khaled.alhamad@supporthub.com", role: "admin", status: "active" },
    { id: "fake-10", full_name: "أمل الشمري", email: "amal.alshammari@supporthub.com", role: "customer", status: "active" },
    { id: "fake-11", full_name: "عبدالله القحطاني", email: "abdullah.alqahtani@supporthub.com", role: "agent", status: "active" },
    { id: "fake-12", full_name: "رنا المطيري", email: "rana.almutairi@supporthub.com", role: "customer", status: "active" },
  ];


  const text = {
    title: isArabic ? "الدعم الفني" : "Technical Support",
    dashboard: isArabic ? "لوحة التذاكر" : "Ticket Dashboard",
    control: isArabic ? "لوحة التحكم" : "Dashboard",
    allTickets: isArabic ? "كل التذاكر" : "All Tickets",
    assigned: isArabic ? "تذاكري المعينة" : "Assigned Tickets",
    customers: isArabic ? "العملاء" : "Customers",
    reports: isArabic ? "التقارير" : "Reports",
    settings: isArabic ? "الإعدادات" : "Settings",
    admin: isArabic ? "الإدارة" : "Administration",
    search: isArabic ? "بحث سريع..." : "Quick search...",
    agentName: isArabic ? "أحمد خالد" : "Ahmed Khaled",
    online: isArabic ? "متصل الآن" : "Online",
    totalTickets: isArabic ? "عدد التذاكر" : "Total Tickets",
    repliedTickets: isArabic ? "تم الرد عليها" : "Replied Tickets",
    notRepliedTickets: isArabic ? "لم يتم الرد عليها" : "Not Replied",
    customer: isArabic ? "العميل" : "Customer",
    department: isArabic ? "القسم" : "Department",
    status: isArabic ? "الحالة" : "Status",
    priority: isArabic ? "الأولوية" : "Priority",
    highPriority: isArabic ? "تذاكر عالية الأولوية" : "High Priority Tickets",
    mediumPriority: isArabic ? "تذاكر متوسطة الأولوية" : "Medium Priority Tickets",
    lowPriority: isArabic ? "تذاكر منخفضة الأولوية" : "Low Priority Tickets",
    agentInfo: isArabic ? "معلومات الموظف" : "Agent Information",
    language: isArabic ? "اللغة" : "Language",
    currentLanguage: isArabic ? "اللغة الحالية: العربية" : "Current Language: English",
    refreshData: isArabic ? "تحديث البيانات" : "Refresh Data",
    refreshText: isArabic
      ? "يمكنك تحديث التذاكر والرسائل من هنا."
      : "You can refresh tickets and messages from here.",
    refresh: isArabic ? "تحديث" : "Refresh",
    notifications: isArabic ? "الإشعارات" : "Notifications",
    newTicketsAlert: isArabic ? "تنبيه التذاكر الجديدة: مفعل" : "New tickets alert: Enabled",
    urgentAlert: isArabic ? "تنبيه التذاكر العاجلة: مفعل" : "Urgent tickets alert: Enabled",
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
    noCustomers: isArabic ? "لا يوجد عملاء حالياً." : "No customers found.",
    noUsers: isArabic ? "لا يوجد مستخدمون حالياً." : "No users found.",
    loading: isArabic ? "جاري تحميل التذاكر..." : "Loading tickets...",
    allUsers: isArabic ? "جميع المستخدمين" : "All Users",
    usersCount: isArabic ? "عدد المستخدمين" : "Users Count",
    fullName: isArabic ? "الاسم" : "Full Name",
    email: isArabic ? "البريد الإلكتروني" : "Email",
    role: isArabic ? "الدور" : "Role",
    customerRole: isArabic ? "عميل" : "Customer",
    agentRole: isArabic ? "دعم فني" : "Support Agent",
    adminRole: isArabic ? "إدارة" : "Admin",
    deleteUser: isArabic ? "حذف المستخدم" : "Delete User",
    blockUser: isArabic ? "حظر المستخدم" : "Block User",
    deleteConfirm: isArabic
      ? "هل أنت متأكد من حذف المستخدم؟"
      : "Are you sure you want to delete this user?",
    blockConfirm: isArabic
      ? "هل أنت متأكد من حظر المستخدم؟"
      : "Are you sure you want to block this user?",
    allSystemTickets: isArabic ? "جميع تذاكر النظام" : "All System Tickets",
    mainDepartments: isArabic ? "الأقسام الرئيسية" : "Main Departments",
    latestActivities: isArabic ? "آخر الأنشطة" : "Latest Activities",
    usersUpdated: isArabic ? "تحديث بيانات المستخدمين" : "Users data updated",
    ticketsReviewed: isArabic ? "مراجعة التذاكر المفتوحة" : "Open tickets reviewed",
    rolesManaged: isArabic ? "إدارة صلاحيات النظام" : "System roles managed",
    actions: isArabic ? "الإجراءات" : "Actions",
    active: isArabic ? "نشط" : "Active",
    ticketId: isArabic ? "رقم التذكرة" : "Ticket ID",
    titleText: isArabic ? "العنوان" : "Title",
    technicalSupport: isArabic ? "الدعم الفني" : "Technical Support",
    administration: isArabic ? "الإدارة" : "Administration",
    agents: isArabic ? "موظف" : "agents",
    admins: isArabic ? "مدير" : "admins",
  };

  const statusText = {
    open: isArabic ? "مفتوحة" : "Open",
    processing: isArabic ? "قيد المعالجة" : "Processing",
    done: isArabic ? "تم الحل" : "Resolved",
    answered: isArabic ? "تم الرد" : "Answered",
    resolved: isArabic ? "تم الحل" : "Resolved",
    closed: isArabic ? "مغلقة" : "Closed",
  };

  const priorityText = {
    high: isArabic ? "عالية" : "High",
    medium: isArabic ? "متوسطة" : "Medium",
    low: isArabic ? "عادية" : "Low",
  };
  const repliedTicketIds = new Set(
    allMessages
      .filter((msg) => msg.sender === "agent")
      .map((msg) => Number(msg.ticket_id))
  );

  const totalTickets =
    tickets.length > 0
      ? Math.max(...tickets.map((ticket) => Number(ticket.id)))
      : 0;

  const repliedTickets = tickets.filter(
    (ticket) =>
      repliedTicketIds.has(Number(ticket.id)) ||
      ticket.status === "answered" ||
      ticket.status === "closed" ||
      ticket.status === "resolved"
  ).length;

  const notRepliedTickets = totalTickets - repliedTickets;

  const assignedTickets = tickets.filter(
    (ticket) =>
      repliedTicketIds.has(Number(ticket.id)) ||
      ticket.status === "answered" ||
      ticket.status === "closed" ||
      ticket.status === "resolved"
  );
console.log(tickets);
const customers = tickets.reduce((acc, ticket) => {
    const name = ticket.customer_name || "Customer";
    const existingCustomer = acc.find((item) => item.name === name);

    if (existingCustomer) {
      existingCustomer.ticketsCount += 1;
    } else {
      acc.push({
        name,
        department: ticket.department || text.title,
        ticketsCount: 1,
      });
    }

    return acc;
  }, []);

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

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Users error:", error);
      setUsers(fakeUsers);
    } else {
      setUsers(data && data.length > 0 ? data : fakeUsers);
    }
  };

  const fetchAllMessages = async () => {
    const { data, error } = await supabase.from("ticket_messages").select("*");

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

  const updateUserRole = async (userId, newRole) => {
    if (String(userId).startsWith("fake-")) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);

    if (error) {
      console.log("Update role error:", error);
      return;
    }

    fetchUsers();
  };

  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm(text.deleteConfirm);

    if (!confirmDelete) return;

    if (String(userId).startsWith("fake-")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      return;
    }

    const { error } = await supabase.from("profiles").delete().eq("id", userId);

    if (error) {
      console.log("Delete user error:", error);
      return;
    }

    fetchUsers();
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

    await supabase
      .from("tickets")
      .update({ status: "answered" })
      .eq("id", selectedTicket.id);

    const updatedTicket = {
      ...selectedTicket,
      status: "answered",
    };

    setReply("");
    setSelectedTicket(updatedTicket);

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === selectedTicket.id ? updatedTicket : ticket
      )
    );

    fetchMessages(selectedTicket.id);
    fetchAllMessages();
  };

  useEffect(() => {
    fetchTickets();
    fetchAllMessages();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedTicket) {
      fetchMessages(selectedTicket.id);
    }
  }, [selectedTicket]);


  const femaleNames = [
    "سارة",
    "ليلى",
    "سما",
    "سمر",
    "سجى",
    "نورة",
    "أمل",
    "رنا",
    "هدى",
    "منى",
    "ريم",
    "فاطمة",
    "مريم",
    "عائشة",
    "Sara",
    "Laila",
    "Sama",
    "Noura",
    "Amal",
    "Rana",
    "Maryam",
    "Fatima",
  ];

  const getUserGender = (name = "") => {
    return femaleNames.some((femaleName) => name.includes(femaleName))
      ? "female"
      : "male";
  };

  const getUserAvatar = (name = "", index = 0) => {
    const gender = getUserGender(name);
    const seed = encodeURIComponent(name || `user-${index}`);

    if (gender === "female") {
      return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&hair=long01,long02,long03&hairColor=111827,1f2937&skinColor=f2d3b1&backgroundColor=f8fafc&radius=50`;
    }

    return `https://api.dicebear.com/7.x/personas/svg?seed=${seed}&facialHairProbability=80&hairColor=111827,1f2937&skinColor=f2d3b1&backgroundColor=f8fafc&radius=50`;
  };

  const blockUser = async (userId) => {
    const confirmBlock = window.confirm(text.blockConfirm);

    if (!confirmBlock) return;

    if (String(userId).startsWith("fake-")) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, status: "blocked" } : user
        )
      );
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({ status: "blocked" })
      .eq("id", userId);

    if (error) {
      console.log("Block user error:", error);
      return;
    }

    fetchUsers();
  };


  const renderTicketsPage = (pageTickets) => (
    <section className="conversation-panel">
      <h2>{activePage === "allTickets" ? text.allTickets : text.assigned}</h2>

      {pageTickets.length === 0 ? (
        <p>{text.noTickets}</p>
      ) : (
        <div className="tickets-table">
          {pageTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="support-ticket"
              onClick={() => {
                setSelectedTicket(ticket);
                setActivePage("dashboard");
              }}
            >
              <div>
                <strong>#TKT-{ticket.id}</strong>
                <span className={`priority-badge ${ticket.priority}`}>
                  {priorityText[ticket.priority] || ticket.priority}
                </span>
              </div>

              <h4>{ticket.title}</h4>
              <p>{ticket.description}</p>

              <footer>
                <span>
                  {text.customer}: {ticket.customer_name || "Customer"}
                </span>
                <span>
                  {text.status}: {statusText[ticket.status] || statusText.open}
                </span>
              </footer>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  const renderCustomersPage = () => (
    <section className="conversation-panel">
      <h2>{text.customers}</h2>

      {customers.length === 0 ? (
        <p>{text.noCustomers}</p>
      ) : (
        <div className="tickets-table">
          {customers.map((customer, index) => (
            <div key={index} className="support-ticket">
              <h4>{customer.name}</h4>
              <p>
                {text.department}: {customer.department}
              </p>
              <footer>
                <span>
                  {text.totalTickets}: {totalTickets}
                </span>
              </footer>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  const renderReportsPage = () => (
    <section className="conversation-panel">
      <h2>{text.reports}</h2>

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

      <div className="tickets-table">
        <div className="support-ticket">
          <h4>{text.highPriority}</h4>
          <p>{tickets.filter((t) => t.priority === "high").length}</p>
        </div>

        <div className="support-ticket">
          <h4>{text.mediumPriority}</h4>
          <p>{tickets.filter((t) => t.priority === "medium").length}</p>
        </div>

        <div className="support-ticket">
          <h4>{text.lowPriority}</h4>
          <p>{tickets.filter((t) => t.priority === "low").length}</p>
        </div>
      </div>
    </section>
  );

  const renderSettingsPage = () => (
    <section className="conversation-panel">
      <h2>{text.settings}</h2>

      <div className="tickets-table">
        <div className="support-ticket">
          <h4>{text.agentInfo}</h4>
          <p>{text.agentName}</p>
          <p>{isArabic ? "فني مستوى ثان" : "Level 2 Agent"}</p>
          <p>{text.online}</p>
        </div>

        <div className="support-ticket">
          <h4>{text.language}</h4>
          <p>{text.currentLanguage}</p>
          <button className="agent-lang" onClick={changeLanguage}>
            {isArabic ? "English" : "العربية"}
          </button>
        </div>

        <div className="support-ticket">
          <h4>{text.notifications}</h4>
          <p>{text.newTicketsAlert}</p>
          <p>{text.urgentAlert}</p>
        </div>

        <div className="support-ticket">
          <h4>{text.refreshData}</h4>
          <p>{text.refreshText}</p>
          <button
            className="agent-lang"
            onClick={() => {
              fetchTickets();
              fetchAllMessages();
              fetchUsers();
            }}
          >
            {text.refresh}
          </button>
        </div>
      </div>
    </section>
  );

  const renderAdminPage = () => (
    <section className="conversation-panel">
      <h2>{text.admin}</h2>

      <div className="stats-grid">
        <div className="stat-card blue">
          <span>{tickets.length}</span>
          <p>{text.allTickets}</p>
        </div>

        <div className="stat-card green">
          <span>{users.length}</span>
          <p>{text.usersCount}</p>
        </div>

        <div className="stat-card red">
          <span>{users.filter((u) => u.role === "agent").length}</span>
          <p>{text.agentRole}</p>
        </div>
      </div>

      <div className="admin-grid">
        <div>
          <div className="admin-card">
            <h3>{text.mainDepartments}</h3>

            <div className="admin-department">
              <strong>{text.technicalSupport}</strong>
              <p>
                {users.filter((u) => u.role === "agent").length} {text.agents}
              </p>
            </div>

            <div className="admin-department">
              <strong>{text.customers}</strong>
              <p>
                {users.filter((u) => u.role === "customer").length}{" "}
                {text.customers}
              </p>
            </div>

            <div className="admin-department">
              <strong>{text.administration}</strong>
              <p>
                {users.filter((u) => u.role === "admin").length} {text.admins}
              </p>
            </div>
          </div>

          <div className="admin-card" style={{ marginTop: "24px" }}>
            <h3>{text.latestActivities}</h3>
            <p>● {text.usersUpdated}</p>
            <p>● {text.ticketsReviewed}</p>
            <p>● {text.rolesManaged}</p>
          </div>
        </div>

        <div className="admin-card">
          <h3>{text.allUsers}</h3>

          {users.length === 0 ? (
            <p>{text.noUsers}</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{text.fullName}</th>
                  <th>{text.email}</th>
                  <th>{text.role}</th>
                  <th>{text.status}</th>
                  <th>{text.actions}</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>
                      <div className="admin-user">
                        <img
                          src={getUserAvatar(user.full_name || user.name, index)}
                          alt="user"
                          className="admin-user-avatar"
                        />
                        <strong>{user.full_name || user.name || "-"}</strong>
                      </div>
                    </td>

                    <td>{user.email || "-"}</td>

                    <td>
                      <select
                        className="admin-select"
                        value={user.role || "customer"}
                        onChange={(e) =>
                          updateUserRole(user.id, e.target.value)
                        }
                      >
                        <option value="customer">{text.customerRole}</option>
                        <option value="agent">{text.agentRole}</option>
                        <option value="admin">{text.adminRole}</option>
                      </select>
                    </td>

                    <td>
                      <span className={user.status === "blocked" ? "admin-status blocked" : "admin-status"}>
                        {user.status === "blocked"
                          ? isArabic
                            ? "محظور"
                            : "Blocked"
                          : text.active}
                      </span>
                    </td>

                    <td>
                      <div className="admin-actions">
                        <button
                          className="admin-block"
                          onClick={() => blockUser(user.id)}
                        >
                          <FiUserX />
                          {text.blockUser}
                        </button>

                        <button
                          className="admin-delete"
                          onClick={() => deleteUser(user.id)}
                        >
                          <FiTrash2 />
                          {text.deleteUser}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: "24px" }}>
        <h3>{text.allSystemTickets}</h3>

        {tickets.length === 0 ? (
          <p>{text.noTickets}</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>{text.ticketId}</th>
                <th>{text.titleText}</th>
                <th>{text.customer}</th>
                <th>{text.priority}</th>
                <th>{text.status}</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>#TKT-{ticket.id}</td>
                  <td>{ticket.title}</td>
                  <td>{ticket.customer_name || "Customer"}</td>
                  <td>{priorityText[ticket.priority] || ticket.priority || "-"}</td>
                  <td>{statusText[ticket.status] || statusText.open}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );

  const renderDashboardPage = () => (
    <>
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
                  {statusText[selectedTicket.status] || statusText.open}
                </button>

                <div>
                  <span>#{`TKT-${selectedTicket.id}`}</span>
                  <h3>{selectedTicket.title}</h3>
                  <p>
                    {text.customer}:{" "}
                    {selectedTicket.customer_name || "Customer"} —{" "}
                    {text.department}: {selectedTicket.department || text.title}
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
                    {priorityText[ticket.priority] || ticket.priority}
                  </span>
                  <strong>#TKT-{ticket.id}</strong>
                </div>

                <h4>{ticket.title}</h4>
                <p>{ticket.description}</p>

                <footer>
                  <span>{ticket.department || text.title}</span>
                  <span>{statusText[ticket.status] || statusText.open}</span>
                </footer>
              </div>
            ))
          )}
        </section>
      </div>
    </>
  );

  return (
    <div className="agent-dashboard" dir={isArabic ? "rtl" : "ltr"}>
      <aside className="agent-sidebar">
        <div className="agent-header">
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
            title={isArabic ? "العودة" : "Back"}
          >
            {isArabic ? "←" : "←"}
          </button>

          <div className="agent-logo">
            <MdSupportAgent />
            <h1>{text.title}</h1>
          </div>
        </div>
        <div className="agent-profile">
          <img src="https://i.pravatar.cc/100?img=15" alt="agent" />
          <div>
            <h3>{text.agentName}</h3>
            <p>{isArabic ? "فني مستوى ثان" : "Level 2 Agent"}</p>
            <span>{text.online}</span>
          </div>
        </div>

        <nav className="agent-menu">
          <button
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => setActivePage("dashboard")}
          >
            <FiGrid /> {text.control}
          </button>

          <button
            className={activePage === "allTickets" ? "active" : ""}
            onClick={() => setActivePage("allTickets")}
          >
            <FiInbox /> {text.allTickets}
          </button>

          <button
            className={activePage === "assigned" ? "active" : ""}
            onClick={() => setActivePage("assigned")}
          >
            <FiFileText /> {text.assigned}
          </button>

          <button
            className={activePage === "customers" ? "active" : ""}
            onClick={() => setActivePage("customers")}
          >
            <FiUsers /> {text.customers}
          </button>

          <button
            className={activePage === "reports" ? "active" : ""}
            onClick={() => setActivePage("reports")}
          >
            <FiBarChart2 /> {text.reports}
          </button>

          <button
            className={activePage === "settings" ? "active" : ""}
            onClick={() => setActivePage("settings")}
          >
            <FiSettings /> {text.settings}
          </button>

          <button
            className={activePage === "admin" ? "active" : ""}
            onClick={() => setActivePage("admin")}
          >
            <FiSettings /> {text.admin}
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

        {activePage === "dashboard" && renderDashboardPage()}
        {activePage === "allTickets" && renderTicketsPage(tickets)}
        {activePage === "assigned" && renderTicketsPage(assignedTickets)}
        {activePage === "customers" && renderCustomersPage()}
        {activePage === "reports" && renderReportsPage()}
        {activePage === "settings" && renderSettingsPage()}
        {activePage === "admin" && renderAdminPage()}
      </main>
    </div>
  );
};

export default AgentDashboard;
