import { useTranslation } from "react-i18next";
import { FiChevronLeft, FiGrid, FiList } from "react-icons/fi";

const TicketList = ({ tickets }) => {
  const { t } = useTranslation();
  const totalTickets =
  tickets.length > 0 ? Math.max(...tickets.map((ticket) => Number(ticket.id))) : 0;
console.log("Number of tickets =", tickets.length);
console.log(tickets);
  const statusText = {
    open: t("open"),
    processing: t("processing"),
    done: t("done"),
    answered: t("answered"),
  };

  return (
    <section className="ticket-list-section">
      <div className="dashboard-title">
        <h1>{t("supportDashboard")}</h1>
       <p>
  {t("dashboardSubtitle", {
    count: totalTickets,
  })}
</p>
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
              <div>
                <span className={`status ${ticket.status}`}>
                  {statusText[ticket.status] || ticket.status}
                </span>

                <span className="ticket-id">#{ticket.id}</span>
              </div>

              <h4>{ticket.title}</h4>

              <p className="ticket-description">
                {ticket.description}
              </p>
            </div>

            <div className="ticket-meta">
              <span>
                {t("department")}: {ticket.department}
              </span>
              <span>
                {t("lastUpdate")}:{" "}
                {new Date(ticket.created_at).toLocaleDateString()}
              </span>
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