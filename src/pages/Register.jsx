import logo from "../assets/supporthub-logo.png";
import { FiGlobe } from "react-icons/fi";
import { Link } from "react-router-dom";
import googleLogo from "../assets/google.png";
import microsoftLogo from "../assets/microsoft.png";

import { useTranslation } from "react-i18next";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import "./Register.css";

const Register = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const changeLanguage = () => {
    i18n.changeLanguage(isArabic ? "en" : "ar");
  };

  return (
    <div className="register-page" dir={isArabic ? "rtl" : "ltr"}>
      <header className="topbar">
       <div className="login-box">
  <span>{t("loginQuestion")}</span>

  <Link to="/login" className="nav-btn">
    {t("login")}
  </Link>

  <button className="lang-btn" onClick={changeLanguage}>
    <FiGlobe />
    {isArabic ? "English" : "العربية"}
  </button>
</div>

<div className="register-logo">
  <img
    src={logo}
    alt="SupportHub Logo"
    className="site-logo"
  />
</div>
      </header>

      <main className="register-main">
        <div className="register-card">

          <section className="info-side">
            <div className="icon-box">
              <FaUserPlus />
            </div>

            <h2>{t("joinTitle")}</h2>
            <p>{t("joinText")}</p>
          </section>

          <section className="form-side">
            <h1>{t("createAccount")}</h1>
            <p className="subtitle">{t("subtitle")}</p>

            <form>
              <label>{t("fullName")}</label>

              <div className="input-box">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  placeholder={t("fullNamePlaceholder")}
                />
              </div>

              <label>{t("email")}</label>

              <div className="input-box">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  placeholder="name@company.com"
                />
              </div>

              <div className="row">
                <div>
                  <label>{t("password")}</label>

                  <div className="input-box">
                    <FiLock className="input-icon" />
                    <input
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label>{t("confirmPassword")}</label>

                  <div className="input-box">
                    <FiLock className="input-icon" />
                    <input
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <label className="checkbox">
                <input type="checkbox" />
                <span>{t("agree")}</span>
              </label>

              <button className="submit-btn" type="submit">
                {t("submit")}
              </button>
            </form>

            <div className="divider">
              <span></span>
              {t("or")}
              <span></span>
            </div>

            <div className="social-row">
              <button className="social-btn">
                <img src={googleLogo} alt="Google" />
              </button>

              <button className="social-btn">
                <img src={microsoftLogo} alt="Microsoft" />
              </button>
            </div>

          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-links">
          <a href="#">سياسة الخصوصية</a>
          <a href="#">شروط الخدمة</a>
          <a href="#">مركز المساعدة</a>
        </div>

        

        
      </footer>
    </div>
  );
};

export default Register;