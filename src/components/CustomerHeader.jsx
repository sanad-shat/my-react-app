import logo from "../assets/supporthub-logo.png";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiBell, FiSearch, FiGlobe, FiLogOut } from "react-icons/fi";
import { supabase } from "../lib/supabase";

const customerAvatar = "https://i.pravatar.cc/120?img=12";

const CustomerHeader = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [profile, setProfile] = useState(null);

  const changeLanguage = () => {
    i18n.changeLanguage(isArabic ? "en" : "ar");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("email", user.email)
        .single();

      if (!error) {
        setProfile(data);
      }
    };

    getProfile();
  }, []);

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
          <strong>{profile?.full_name || t("customerName")}</strong>
          <span>{t("premiumCustomer")}</span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut />
        </button>
      </div>
    </header>
  );
};

export default CustomerHeader;