import logo from "../assets/supporthub-logo.png";
import { useTranslation } from "react-i18next";
import { FiBell, FiSearch, FiGlobe } from "react-icons/fi";
import { FaHubspot } from "react-icons/fa";

const customerAvatar = "https://i.pravatar.cc/120?img=12";

const CustomerHeader = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const changeLanguage = () => {
    i18n.changeLanguage(isArabic ? "en" : "ar");
  };

  return (
    <header className="customer-header">
      <div className="brand">
  <img src={logo} alt="SupportHub Logo" className="site-logo" />
</div>

      <nav className="customer-nav">
        <a>{t("myTickets")}</a>
        <a>{t("completedActivity")}</a>
        <a>{t("knowledgeBase")}</a>
      </nav>

      <div className="customer-search">
        <FiSearch />
        <input placeholder={t("searchTickets")} />
      </div>

      <button className="lang-btn" onClick={changeLanguage}>
        <FiGlobe />
        {isArabic ? "English" : "العربية"}
      </button>

      <div className="notification-wrapper">
  <FiBell className="header-icon" />
  <span className="notification-dot"></span>
</div>

      <div className="customer-user">
        <img
          src={customerAvatar}
          alt="Customer"
          className="customer-avatar"
        />

        <div>
          <strong>{t("customerName")}</strong>
          <span>{t("premiumCustomer")}</span>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;