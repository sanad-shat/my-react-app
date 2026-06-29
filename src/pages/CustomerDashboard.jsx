import { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomerHeader from "../components/CustomerHeader";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";
import "./CustomerDashboard.css";


const CustomerDashboard = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [tickets, setTickets] = useState([
    {
      id: "SH-8291",
      titleKey: "loginIssue",
      departmentKey: "technicalSupport",
      status: "open",
      priority: "medium",
      updatedKey: "hours2",
    },
    {
      id: "SH-7542",
      titleKey: "refundRequest",
      departmentKey: "accounting",
      status: "processing",
      priority: "high",
      updatedKey: "yesterday",
    },
    {
      id: "SH-6120",
      titleKey: "profileUpdate",
      departmentKey: "customers",
      status: "done",
      priority: "low",
      updatedKey: "days3",
    },
  ]);

  const addTicket = (ticket) => {
    const newTicket = {
      id: `SH-${Math.floor(1000 + Math.random() * 9000)}`,
      title: ticket.description || "",
      departmentKey: ticket.departmentKey || "technicalSupport",
      status: "open",
      priority: ticket.priority,
      updatedKey: "now",
    };

    setTickets([newTicket, ...tickets]);
  };

  return (
    <div className="customer-page" dir={isArabic ? "rtl" : "ltr"}>
      <CustomerHeader />

      <main className="customer-main">
        <TicketForm onAddTicket={addTicket} />
        <TicketList tickets={tickets} />
      </main>
    </div>
  );
};

export default CustomerDashboard;