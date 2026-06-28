import { FiGlobe } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FiMail,
  FiSend,
  FiArrowRight,
  FiHelpCircle,
  FiMessageCircle,
} from "react-icons/fi";
import { MdLockReset } from "react-icons/md";
import { FaHubspot } from "react-icons/fa";
import "./ForgotPassword.css";
const ForgotPassword = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
const changeLanguage = () => {
  i18n.changeLanguage(isArabic ? "en" : "ar");
};
  return (
    <div className="forgot-page" dir={isArabic ? "rtl" : "ltr"}>
      <header className="forgot-topbar">
  <div className="forgot-logo">
    <span>SupportHub</span>
    <FaHubspot />
  </div>

  <div className="forgot-actions-top">

    <button className="lang-btn" onClick={changeLanguage}>
      <FiGlobe />
      {isArabic ? "English" : "العربية"}
    </button>

    <Link to="/login" className="back-login">
      <FiArrowRight />
      {t("backToLogin")}
    </Link>

  </div>
</header>

      <main className="forgot-main">
        <div className="forgot-card">
          <section className="forgot-form-side">
            <h1>{t("forgotPageTitle")}</h1>
            <p>{t("forgotPageSubtitle")}</p>

            <form>
              <label>{t("email")}</label>

              <div className="forgot-input-box">
                <FiMail className="forgot-input-icon" />
                <input type="email" placeholder="name@company.com" />
              </div>

              <small className="email-hint">{t("emailHint")}</small>

              <Link to="/verify-code" className="forgot-submit">
                <FiSend />
                {t("sendCode")}
              </Link>
            </form>

            <div className="forgot-divider">
              <span></span>
              {t("or")}
              <span></span>
            </div>

            <div className="forgot-actions">
              <button>
                <FiMessageCircle />
                {t("supportContact")}
              </button>

              <button>
                <FiHelpCircle />
                {t("faq")}
              </button>
            </div>
          </section>

          <section className="forgot-info-side">
            <div className="forgot-icon">
              <MdLockReset />
            </div>

            <h2>{t("recoverTitle")}</h2>
            <p>{t("recoverText")}</p>
          </section>
        </div>
      </main>

      <footer className="forgot-footer">
        <div className="footer-links">
          <a href="#">{t("privacy")}</a>
          <a href="#">{t("terms")}</a>
          <a href="#">{t("helpCenter")}</a>
        </div>

        <div className="footer-copy">
          <strong>SupportHub</strong>
          <span>{t("footer")}</span>
        </div>
      </footer>
    </div>
  );
};

export default ForgotPassword;