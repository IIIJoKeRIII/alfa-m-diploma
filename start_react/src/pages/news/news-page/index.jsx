import { useMemo, useState } from "react";
import { NewsCard } from "../news-card/index.jsx";
import { materials } from "../../../data/materials.js";
import "./news-page.css";

function parseMaterialDate(dateStr) {
    const [d, m, y] = dateStr.split(".").map(Number);
    return new Date(y, m - 1, d);
}

export const MaterialsPage = () => {
    const [query, setQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("new");

    const filteredSorted = useMemo(() => {
        const q = query.trim().toLowerCase();
        let list = materials.filter(
            (item) =>
                !q ||
                item.title.toLowerCase().includes(q) ||
                item.text.toLowerCase().includes(q)
        );
        list = [...list].sort((a, b) => {
            const da = parseMaterialDate(a.date);
            const db = parseMaterialDate(b.date);
            return sortOrder === "new" ? db - da : da - db;
        });
        return list;
    }, [query, sortOrder]);

    return (
        <div className="page-container page-container-big">
            <h1 className="header-news">Материалы о компании</h1>
            <p className="materials-lead">
                Обзорные материалы об ООО «Альфа-М». Тексты не заменяют
                юридическую консультацию и официальные документы организации.
            </p>
            <div className="news-toolbar">
                <label className="news-toolbar-label">
                    <span className="news-toolbar-caption">Поиск</span>
                    <input
                        type="search"
                        className="news-search-input"
                        placeholder="Заголовок или анонс…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Поиск по материалам"
                    />
                </label>
                <label className="news-toolbar-label">
                    <span className="news-toolbar-caption">Сортировка по дате</span>
                    <select
                        className="news-sort-select"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="new">Сначала новые</option>
                        <option value="old">Сначала старые</option>
                    </select>
                </label>
                <p className="news-results-count" role="status">
                    Найдено: {filteredSorted.length} из {materials.length}
                </p>
            </div>
            <div className="news-page">
                {filteredSorted.length > 0 ? (
                    filteredSorted.map((item) => (
                        <NewsCard materialItem={item} key={item.id} />
                    ))
                ) : (
                    <p className="news-empty">
                        Ничего не найдено. Измените запрос или сбросьте поиск.
                    </p>
                )}
            </div>
        </div>
    );
};
