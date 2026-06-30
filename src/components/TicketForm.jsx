import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiPlus, FiUpload, FiSend } from "react-icons/fi";
import { supabase } from "../lib/supabase";

const TicketForm = ({ onTicketCreated }) => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    department: t("technicalSupport"),
    priority: "medium",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.description.trim()) return;

    const { error } = await supabase.from("tickets").insert([
      {
        title: form.description.slice(0, 40),
        description: form.description,
        department: form.department,
        priority: form.priority,
        status: "open",
        customer_name: "Customer",
      },
    ]);

    if (error) {
      console.error(error);
      alert("Error while saving ticket");
      return;
    }

    setForm({
      department: t("technicalSupport"),
      priority: "medium",
      description: "",
    });

    if (onTicketCreated) onTicketCreated();
  };

  return (
    <aside className="ticket-form-card">
      <div className="form-title">
        <FiPlus />
        <div>
          <h3>{t("createTicket")}</h3>
          <p>{t("ticketHint")}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label>{t("responsibleDepartment")}</label>
        <select
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        >
          <option>{t("technicalSupport")}</option>
          <option>{t("accounting")}</option>
          <option>{t("customers")}</option>
        </select>

        <label>{t("priority")}</label>
        <div className="priority-row">
          <button type="button" className={form.priority === "high" ? "active" : ""} onClick={() => setForm({ ...form, priority: "high" })}>
            {t("high")}
          </button>
          <button type="button" className={form.priority === "medium" ? "active" : ""} onClick={() => setForm({ ...form, priority: "medium" })}>
            {t("medium")}
          </button>
          <button type="button" className={form.priority === "low" ? "active" : ""} onClick={() => setForm({ ...form, priority: "low" })}>
            {t("low")}
          </button>
        </div>

        <label>{t("problemDetails")}</label>
        <textarea
          placeholder={t("problemPlaceholder")}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div className="upload-box">
          <FiUpload />
          <span>{t("uploadFiles")}</span>
        </div>

        <button className="submit-ticket" type="submit">
          <FiSend />
          {t("sendRequest")}
        </button>
      </form>
    </aside>
  );
};

export default TicketForm;