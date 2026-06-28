import { FaHubspot } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import googleLogo from "../assets/google.png";
import microsoftLogo from "../assets/microsoft.png";
import "./Login.css";

const Login = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const changeLanguage = () => {
    i18n.changeLanguage(isArabic ? "en" : "ar");
  };

  return (
    <div className="login-page" dir={isArabic ? "rtl" : "ltr"}>
      <header className="login-topbar">
        <div className="login-logo">
          <span>SupportHub</span>
          <FaHubspot />
        </div>

        <div className="topbar-actions">
          <button className="lang-btn" onClick={changeLanguage}>
             🌐 {isArabic ? "English" : "العربية"}
          </button>
          <div className="login-help">{t("help")}</div>
        </div>
      </header>

      <main className="login-main">
        <div className="login-container">
          <section className="login-form-side">
            <h1>{t("loginTitle")}</h1>
            <p>{t("loginSubtitle")}</p>

            <form>
              <label>{t("email")}</label>
              <div className="login-input-box">
                <FiMail className="login-input-icon" />
                <input type="email" placeholder="example@supporthub.com" />
              </div>

              <div className="password-label">
  <label>{t("password")}</label>
  <Link to="/forgot-password">
  {t("forgotPassword")}
</Link>
</div>

              <div className="login-input-box">
                <FiLock className="login-input-icon" />
                <input type="password" placeholder="••••••••" />
              </div>

              <button className="login-submit" type="submit">
                <FiLogIn />
                {t("login")}
              </button>
            </form>

            <div className="login-divider">
              <span></span>
              {t("orLogin")}
              <span></span>
            </div>

            <div className="login-social-row">
              <button>
                <img src={googleLogo} alt="Google" />
              </button>
              <button>
                <img src={microsoftLogo} alt="Microsoft" />
              </button>
            </div>

            <p className="create-account">
              {t("noAccount")}{" "}
              <Link to="/register">{t("createNewAccount")}</Link>
            </p>
          </section>

          <section className="login-info-side">
            <div className="hero-icon">
              <FaHubspot />
            </div>

            <h2>
              {t("heroLoginTitle")}
              <br />
              <span>{t("heroLoginHighlight")}</span>
            </h2>

            <p>{t("heroLoginText")}</p>
          </section>
        </div>
      </main>

      <footer className="login-footer">
        <div className="footer-links">
          <a href="#">سياسة الخصوصية</a>
          <a href="#">شروط الخدمة</a>
          <a href="#">مركز المساعدة</a>
        </div>

        <div className="footer-copy">
          <strong>SupportHub</strong>
          <span>© 2026 SupportHub. جميع الحقوق محفوظة.</span>
        </div>
      </footer>
    </div>
  );
};

export default Login;