import { useParams, Link } from "react-router-dom";
import { news } from "../news-page/index.jsx";
import "./style.css"
import {useEffect, useState} from "react";

const MAX_COMMENT_LEN = 2000;

export const NewsDetailed = () => {
    const { id } = useParams();
    const newsId = parseInt(id, 10);
    const newsItem = news.find((item) => item.id === newsId);
    const [comments, setComments] = useState(() => {
        const saved = sessionStorage.getItem(`news_${newsId}_comments`);
        return saved ? JSON.parse(saved) : [];
    });
    const [newComment, setNewComment] = useState('');
    const [authorName, setAuthorName] = useState('');

    useEffect(() => {sessionStorage.setItem(`news_${newsId}_comments`, JSON.stringify(comments));},[comments, newsId]);

    const handleAddComment = () => {
        const text = newComment.trim();
        if (!text) return;
        const commentToAdd = {
            id: Date.now(),
            author: authorName.trim() || 'Гость',
            text: text.slice(0, MAX_COMMENT_LEN),
            date: new Date().toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' }),
        };

        setComments(prevComments => [...prevComments, commentToAdd]);
        setNewComment('');
    }

    const handleRemoveComment = (commentId) => {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleAddComment();
        }
    }

    if (!newsItem || Number.isNaN(newsId)) {
        return (
            <div className="page-container page-container-small news-not-found">
                <h1 className="title">Материал не найден</h1>
                <p className="news-not-found-text">Проверьте адрес или вернитесь к списку материалов.</p>
                <Link to="/materials" className="back-to-news-link">← Все материалы</Link>
            </div>
        );
    }

    const remaining = MAX_COMMENT_LEN - newComment.length;

    return (
        <div className="page-container page-container-small">
            <Link to="/materials" className="back-to-news-link back-to-news-top">← К списку материалов</Link>
            <h1 className="title">{newsItem.title}</h1>
            <p className="news-detail-meta">Опубликовано: {newsItem.date}</p>
            {newsItem.img ? (
                <img
                    src={newsItem.img}
                    alt=""
                    className="news-image"
                />
            ) : null}
            <p className="full-text-style">
                {newsItem.fullText.split('\n').map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                ))}
            </p>
            <div className="comments-section">
                <h2 className="title">Комментарии</h2>
                <hr/>
                <div className="comment-input-field">
                    <label className="comment-author-label">
                        <span className="comment-author-caption">Имя (необязательно)</span>
                        <input
                            type="text"
                            className="comment-author-input"
                            placeholder="Например, Иван"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            maxLength={80}
                        />
                    </label>
                    <textarea
                        className="comment-textarea"
                        placeholder="Напишите комментарий… (Ctrl+Enter — отправить)"
                        style={{ width: "100%",maxWidth: 865  }}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value.slice(0, MAX_COMMENT_LEN))}
                        onKeyDown={handleKeyPress}
                        rows="4"
                    />
                    <div className="comment-actions-row">
                        <span className={`comment-char-count ${remaining < 120 ? 'comment-char-count-warn' : ''}`}>
                            {newComment.length} / {MAX_COMMENT_LEN}
                        </span>
                        <button
                            className="comment-submit-btn"
                            type="button"
                            disabled={!newComment.trim()}
                            onClick={handleAddComment}>
                            Отправить
                        </button>
                    </div>
                </div>
                <div className="comments-list">
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment.id} className="comment-item">
                                <div className="comment-item-header">
                                    <span className="comment-author">{comment.author || 'Гость'}</span>
                                    <button
                                        type="button"
                                        className="comment-delete-btn"
                                        onClick={() => handleRemoveComment(comment.id)}
                                        aria-label="Удалить комментарий"
                                    >
                                        Удалить
                                    </button>
                                </div>
                                <p className="comment-text">{comment.text}</p>
                                <span className="comment-date">{comment.date}</span>
                            </div>
                        ))
                    ) : (
                        <p className="no-comments">Здесь пока ничего нет. Будьте первым!</p>
                    )}
                </div>
            </div>
        </div>
    )
}
