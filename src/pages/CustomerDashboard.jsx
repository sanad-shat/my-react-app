import { Link } from "react-router-dom";
import { MdSupportAgent } from "react-icons/md";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomerHeader from "../components/CustomerHeader";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";
import { supabase } from "../lib/supabase";
import "./CustomerDashboard.css";

const CustomerDashboard = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

setTickets(data || []);
console.log("Fetched tickets:", data?.length);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="customer-page" dir={isArabic ? "rtl" : "ltr"}>
      <CustomerHeader />

      <main className="customer-main">
        <TicketForm onTicketCreated={fetchTickets} />

        <TicketList tickets={tickets} />

        <div className="support-agent-wrapper">
          <Link
            to="/agent-dashboard"
            className="support-link"
          >
            <MdSupportAgent />
            <span>
              {isArabic ? "الدعم الفني" : "Technical Support"}
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;