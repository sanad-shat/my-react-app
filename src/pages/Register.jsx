import logo from "../assets/supporthub-logo.png";
import { FiGlobe, FiUser, FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUserPlus } from "react-icons/fa";
import googleLogo from "../assets/google.png";
import microsoftLogo from "../assets/microsoft.png";
import { supabase } from "../lib/supabase";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const changeLanguage = () => {
    i18n.changeLanguage(isArabic ? "en" : "ar");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!fullName || !email || !password || !confirmPassword) {
      setMessage(isArabic ? "يرجى تعبئة جميع الحقول." : "Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage(isArabic ? "كلمة المرور غير متطابقة." : "Passwords do not match.");
      return;
    }

    if (!agree) {
      setMessage(isArabic ? "يرجى الموافقة على الشروط." : "Please accept the terms.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
     const { error: profileError } = await supabase
  .from("profiles")
  .upsert([
    {
      id: data.user.id,
      full_name: fullName,
      email: email,
    },
  ]);

      if (profileError) {
        console.log("Profile insert error:", profileError);
        setMessage(profileError.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    navigate("/login");
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
          <img src={logo} alt="SupportHub Logo" className="site-logo" />
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

            <form onSubmit={handleRegister}>
              <label>{t("fullName")}</label>

              <div className="input-box">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  placeholder={t("fullNamePlaceholder")}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <label>{t("email")}</label>

              <div className="input-box">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <span>{t("agree")}</span>
              </label>

              {message && <p className="form-message">{message}</p>}

              <button className="submit-btn" type="submit" disabled={loading}>
                {loading
                  ? isArabic
                    ? "جاري الإنشاء..."
                    : "Creating..."
                  : t("submit")}
              </button>
            </form>

            <div className="divider">
              <span></span>
              {t("or")}
              <span></span>
            </div>

            <div className="social-row">
              <button className="social-btn" type="button">
                <img src={googleLogo} alt="Google" />
              </button>

              <button className="social-btn" type="button">
                <img src={microsoftLogo} alt="Microsoft" />
              </button>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-links">
          <a href="#">{t("privacy")}</a>
          <a href="#">{t("terms")}</a>
          <a href="#">{t("helpCenter")}</a>
        </div>
      </footer>
    </div>
  );
};

export default Register;