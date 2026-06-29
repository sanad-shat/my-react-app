import logo from "../assets/supporthub-logo.png";
import { FiGlobe } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiInfo, FiMail } from "react-icons/fi";
import "./VerifyCode.css";

const VerifyCode = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
const changeLanguage = () => {
  i18n.changeLanguage(isArabic ? "en" : "ar");
};
  return (
    <div className="verify-page" dir={isArabic ? "rtl" : "ltr"}>
      <header className="verify-topbar">
<div className="verify-logo">
  <img
    src={logo}
    alt="SupportHub Logo"
    className="site-logo"
  />
</div>
  <div className="verify-actions-top">
    <button className="lang-btn" onClick={changeLanguage}>
      <FiGlobe />
      {isArabic ? "English" : "العربية"}
    </button>

    <Link to="/forgot-password" className="verify-back">
      <FiArrowRight />
      {t("back")}
    </Link>
  </div>
</header>

      <main className="verify-main">
        <div className="verify-wrapper">
          <section className="verify-form-card">
            <h1>{t("verifyTitle")}</h1>

            <p>
              {t("verifySubtitle")}
              <br />
              <strong>user@example.com</strong>
              <br />
              {t("verifySubtitleEnd")}
            </p>

            <div className="otp-row">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <input key={item} maxLength="1" />
              ))}
            </div>

            <button className="verify-btn">
              {t("confirmCode")}
            </button>

            <p className="resend-text">
              {t("noCode")}{" "}
              <a href="#">{t("resendCode")}</a>
            </p>
          </section>

          <div className="support-box">
            <FiInfo />
            <span>
              {t("verifyProblem")}{" "}
              <a href="#">{t("technicalSupport")}</a>
            </span>
          </div>
        </div>

        <section className="verify-info-side">
          <div className="email-card">
            <FiMail />
            <h2>{t("emailConfirm")}</h2>
            <p>{t("emailConfirmText")}</p>
          </div>
        </section>
      </main>

      <footer className="verify-footer">
        <div className="footer-copy">
          <span>{t("footer")}</span>
        </div>

        <div className="footer-links">
          <a href="#">{t("helpCenter")}</a>
          <a href="#">{t("terms")}</a>
          <a href="#">{t("privacy")}</a>
        </div>
      </footer>
    </div>
  );
};

export default VerifyCode;