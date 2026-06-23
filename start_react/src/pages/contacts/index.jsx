import { useState } from "react";
import "./style.css";
import { company } from "../../data/alfa-m.js";

const initialForm = { name: "", email: "", phone: "", message: "" };

function validateEmail(value) {
    if (!value.trim()) return "Укажите e-mail.";
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    return ok ? "" : "Некорректный формат e-mail.";
}

export const Contacts = () => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [touched, setTouched] = useState({});

    const setField = (key, value) => {
        setForm((f) => ({ ...f, [key]: value }));
        if (submitted) setSubmitted(false);
    };

    const validate = () => {
        const next = {};
        if (!form.name.trim()) next.name = "Укажите имя.";
        const emailErr = validateEmail(form.email);
        if (emailErr) next.email = emailErr;
        if (!form.message.trim()) next.message = "Введите текст сообщения.";
        else if (form.message.trim().length < 10)
            next.message = "Сообщение слишком короткое (минимум 10 символов).";
        return next;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched({ name: true, email: true, phone: true, message: true });
        const next = validate();
        setErrors(next);
        if (Object.keys(next).length > 0) return;
        setErrors({});
        setSubmitted(true);
        setForm(initialForm);
        setTouched({});
    };

    return (
        <div className="page-container page-container-medium contacts-page">
            <h1 className="header-news">Контакты и реквизиты</h1>
            <p className="contacts-intro">
                Реквизиты и контактные данные для деловой переписки. Телефон и
                адрес электронной почты можно запросить через форму обратной
                связи. Отправка формы в текущей версии сайта не передаётся на
                сервер — ответ предоставляется отдельными каналами связи.
            </p>
            <div className="contacts-layout">
                <div className="contacts-block">
                    <h2>Реквизиты</h2>
                    <ul className="contacts-list">
                        <li>
                            <strong>Полное наименование:</strong>{" "}
                            {company.fullName}
                        </li>
                        <li>
                            <strong>Сокращённо:</strong> {company.shortName}
                        </li>
                        <li>
                            <strong>ИНН / КПП:</strong> {company.inn} /{" "}
                            {company.kpp}
                        </li>
                        <li>
                            <strong>ОГРН:</strong> {company.ogrn}
                        </li>
                        <li>
                            <strong>Дата регистрации:</strong>{" "}
                            {company.regDate}
                        </li>
                        <li>
                            <strong>Уставный капитал:</strong>{" "}
                            {company.charterCapitalRub} ₽
                        </li>
                        <li>
                            <strong>Юридический адрес:</strong>{" "}
                            {company.legalAddress}
                        </li>
                        <li>
                            <strong>Руководитель:</strong> {company.director},{" "}
                            {company.directorRole}
                        </li>
                        <li>
                            <strong>Учредитель:</strong> {company.founder.name}{" "}
                            (ИНН {company.founder.inn}, ОГРН{" "}
                            {company.founder.ogrn}, доля{" "}
                            {company.founder.share})
                        </li>
                    </ul>
                    <p className="contacts-source">
                        Справочные сведения из открытых источников:{" "}
                        <a
                            href={company.referenceInfoUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            внешний ресурс
                        </a>
                        .
                    </p>
                </div>
                <div className="contacts-block">
                    <h2>Написать сообщение</h2>
                    {submitted && (
                        <div className="form-success" role="status">
                            Спасибо за обращение. В этой конфигурации сайта
                            данные формы не передаются на сервер; для
                            официального запроса используйте каналы связи,
                            предусмотренные в договорной документации.
                        </div>
                    )}
                    <form
                        className="contact-form"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <div className="form-row">
                            <label htmlFor="contact-name">Имя *</label>
                            <input
                                id="contact-name"
                                type="text"
                                autoComplete="name"
                                value={form.name}
                                onChange={(e) =>
                                    setField("name", e.target.value)
                                }
                                onBlur={() =>
                                    setTouched((t) => ({ ...t, name: true }))
                                }
                            />
                            {touched.name && errors.name && (
                                <div className="field-error">{errors.name}</div>
                            )}
                        </div>
                        <div className="form-row">
                            <label htmlFor="contact-email">E-mail *</label>
                            <input
                                id="contact-email"
                                type="email"
                                autoComplete="email"
                                value={form.email}
                                onChange={(e) =>
                                    setField("email", e.target.value)
                                }
                                onBlur={() =>
                                    setTouched((t) => ({ ...t, email: true }))
                                }
                            />
                            {touched.email && errors.email && (
                                <div className="field-error">{errors.email}</div>
                            )}
                        </div>
                        <div className="form-row">
                            <label htmlFor="contact-phone">Телефон</label>
                            <input
                                id="contact-phone"
                                type="tel"
                                autoComplete="tel"
                                placeholder="+7 …"
                                value={form.phone}
                                onChange={(e) =>
                                    setField("phone", e.target.value)
                                }
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="contact-message">Сообщение *</label>
                            <textarea
                                id="contact-message"
                                rows={5}
                                value={form.message}
                                onChange={(e) =>
                                    setField("message", e.target.value)
                                }
                                onBlur={() =>
                                    setTouched((t) => ({
                                        ...t,
                                        message: true,
                                    }))
                                }
                            />
                            {touched.message && errors.message && (
                                <div className="field-error">
                                    {errors.message}
                                </div>
                            )}
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="form-submit-btn">
                                Отправить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
