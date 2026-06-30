import logo from "../assets/supporthub-logo.png";
import { useNavigate, Link } from "react-router-dom";
import { FaHubspot } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import googleLogo from "../assets/google.png";
import microsoftLogo from "../assets/microsoft.png";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeLanguage = () => {
    i18n.changeLanguage(isArabic ? "en" : "ar");
  };

  // تسجيل دخول تجريبي
  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Login clicked");

    // الانتقال مباشرة إلى الداشبورد
    navigate("/customer-dashboard");

    // إذا لم يعمل navigate استخدم السطر التالي بدلاً منه:
    // window.location.href = "/customer-dashboard";
  };

  return (
    <div className="login-page" dir={isArabic ? "rtl" : "ltr"}>
      <header className="login-topbar">
        <div className="login-logo">
          <img
            src={logo}
            alt="SupportHub Logo"
            className="login-site-logo"
          />
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

            <form onSubmit={handleLogin}>
              <label>{t("email")}</label>

              <div className="login-input-box">
                <FiMail className="login-input-icon" />

                <input
                  type="email"
                  placeholder="example@supporthub.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="password-label">
                <label>{t("password")}</label>

                <Link to="/forgot-password">
                  {t("forgotPassword")}
                </Link>
              </div>

              <div className="login-input-box">
                <FiLock className="login-input-icon" />

                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

             <button
  className="login-submit"
  type="button"
  onClick={() => {
    console.log("Clicked");
    window.location.href = "/customer-dashboard";
  }}
>
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
              <button type="button">
                <img src={googleLogo} alt="Google" />
              </button>

              <button type="button">
                <img src={microsoftLogo} alt="Microsoft" />
              </button>
            </div>

            <p className="create-account">
              {t("noAccount")}{" "}
              <Link to="/register">
                {t("createNewAccount")}
              </Link>
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

export default Login;