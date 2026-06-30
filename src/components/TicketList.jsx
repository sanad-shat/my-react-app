import { useTranslation } from "react-i18next";
import { FiChevronLeft, FiGrid, FiList } from "react-icons/fi";

const TicketList = ({ tickets }) => {
  const { t } = useTranslation();

  const statusText = {
    open: t("open"),
    processing: t("processing"),
    done: t("done"),
  };

  return (
    <section className="ticket-list-section">
      <div className="dashboard-title">
        <h1>{t("supportDashboard")}</h1>
        <p>{t("dashboardSubtitle")}</p>
      </div>

      <div className="list-toolbar">
        <h3>{t("ticketList")}</h3>
        <div>
          <FiGrid />
          <FiList />
        </div>
      </div>

      <div className="tickets-list">
        {tickets.map((ticket) => (
          <div className="ticket-item" key={ticket.id}>
            <div className="ticket-main-info">
              <span className={`status ${ticket.status}`}>
                {statusText[ticket.status] || ticket.status}
              </span>

              <span className="ticket-id">#{ticket.id}</span>

              <h4>{ticket.title}</h4>
            </div>

            <div className="ticket-meta">
              <span>{t("department")}: {ticket.department}</span>
              <span>{t("lastUpdate")}: {new Date(ticket.created_at).toLocaleDateString()}</span>
            </div>

            <FiChevronLeft />
          </div>
        ))}
      </div>

      <button className="load-more">{t("loadMoreTickets")}</button>
    </section>
  );
};

export default TicketList;