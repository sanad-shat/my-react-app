import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    ar: {
      translation: {
        // Register Page
        createAccount: "إنشاء حساب جديد",
        subtitle: "ابدأ رحلتك في التميز التقني اليوم",
        fullName: "الاسم الكامل",
        fullNamePlaceholder: "أدخل اسمك بالكامل",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        confirmPassword: "تأكيد كلمة المرور",
        agree:
          "أوافق على شروط الخدمة و سياسة الخصوصية الخاصة بـ SupportHub.",
        submit: "إنشاء حساب",
        or: "أو التسجيل عبر",
        loginQuestion: "هل لديك حساب بالفعل؟",
        login: "تسجيل الدخول",
        joinTitle: "انضم إلى مجتمع الخبراء",
        joinText:
          "قم بإدارة تذاكر الدعم الخاصة بك بكفاءة عالية وسرعة استجابة فائقة من خلال منصة SupportHub المتطورة.",
        footer: "© 2024 SupportHub. جميع الحقوق محفوظة.",

        // Login Page
        help: "مساعدة",
        loginTitle: "تسجيل الدخول",
        loginSubtitle: "أدخل تفاصيل حسابك للمتابعة",

        heroLoginTitle: "إدارة الدعم الفني",
        heroLoginHighlight: "بذكاء وكفاءة",

        heroLoginText:
          "مرحباً بك مجدداً في نظام SupportHub. يرجى تسجيل الدخول للوصول إلى لوحة التحكم الخاصة بك ومتابعة طلبات الدعم الفني المعلقة.",

        forgotPassword: "نسيت كلمة المرور؟",
        orLogin: "أو الدخول عبر",

        noAccount: "ليس لديك حساب؟",
        createNewAccount: "إنشاء حساب جديد",
      },
    },

    en: {
      translation: {
        // Register Page
        createAccount: "Create New Account",
        subtitle: "Start your journey to technical excellence today",
        fullName: "Full Name",
        fullNamePlaceholder: "Enter your full name",
        email: "Email Address",
        password: "Password",
        confirmPassword: "Confirm Password",
        agree:
          "I agree to the Terms of Service and Privacy Policy of SupportHub.",
        submit: "Create Account",
        or: "Or sign up with",
        loginQuestion: "Already have an account?",
        login: "Login",
        joinTitle: "Join the Experts Community",
        joinText:
          "Manage your support tickets efficiently and quickly through the advanced SupportHub platform.",
        footer: "© 2024 SupportHub. All rights reserved.",

        // Login Page
        help: "Help",
        loginTitle: "Login",
        loginSubtitle: "Enter your account details to continue",

        heroLoginTitle: "Manage Technical Support",
        heroLoginHighlight: "Smartly & Efficiently",

        heroLoginText:
          "Welcome back to SupportHub. Please sign in to access your dashboard and manage pending support tickets.",

        forgotPassword: "Forgot Password?",
        orLogin: "Or sign in with",

        noAccount: "Don't have an account?",
        createNewAccount: "Create New Account",
      },
    },
  },

  lng: "ar",
  fallbackLng: "ar",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;