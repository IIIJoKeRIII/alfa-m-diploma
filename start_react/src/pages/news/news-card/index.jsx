import './style.css'
import {Link} from 'react-router-dom'

export const NewsCard = (props) => {
    const newsItem = props.newsItem

    const savedComments = sessionStorage.getItem(`news_${newsItem.id}_comments`)

    let commentCount = 0
    if(savedComments){
        const comments = JSON.parse(savedComments)
        commentCount = comments.length
    }
    else{
        commentCount = "Здесь пока нет комментариев"
    }

    return (
        <div className="news-card">
            <div className="news-card-padding">
                <h3 className="news-title-style">{newsItem.title}</h3>
                <p className="news-text-style">{newsItem.text}</p>
                <Link to={`/materials/${newsItem.id}`} className="more-btn">Узнать больше</Link>
            </div>
            <footer className="news-card-footer">
                <div className="dividing-line"></div>
                <div className="number-comments">
                    <p className="news-card-date">{newsItem.date}</p>
                    <p className="news-card-comments-line">Комментарии: {commentCount}</p>
                </div>
            </footer>
        </div>

    )
}