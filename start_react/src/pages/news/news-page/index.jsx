import { useMemo, useState } from "react";
import { NewsCard } from "../news-card/index.jsx";
import { materials } from "../../../data/materials.js";
import "./news-page.css";

export const news = materials;

function parseNewsDate(dateStr) {
    const [d, m, y] = dateStr.split(".").map(Number);
    return new Date(y, m - 1, d);
}

export const MaterialsPage = () => {
    const [query, setQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("new");

    const filteredSorted = useMemo(() => {
        const q = query.trim().toLowerCase();
        let list = news.filter(
            (item) =>
                !q ||
                item.title.toLowerCase().includes(q) ||
                item.text.toLowerCase().includes(q)
        );
        list = [...list].sort((a, b) => {
            const da = parseNewsDate(a.date);
            const db = parseNewsDate(b.date);
            return sortOrder === "new" ? db - da : da - db;
        });
        return list;
    }, [query, sortOrder]);

    return (
        <div className="page-container page-container-big">
            <h1 className="header-news">Материалы о компании</h1>
            <p className="materials-lead">
                Краткие тексты для макета сайта об ООО «Альфа-М». Реквизиты в
                материалах — заглушки; не являются юридической консультацией.
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
                    Найдено: {filteredSorted.length} из {news.length}
                </p>
            </div>
            <div className="news-page">
                {filteredSorted.length > 0 ? (
                    filteredSorted.map((item) => (
                        <NewsCard newsItem={item} key={item.id} />
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
