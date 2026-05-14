import { Link } from 'react-router-dom';
import { company } from '../../data/alfa-m.js';
import './home.css';

export const Home = () => {
  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-hero-inner">
          <p className="home-eyebrow">Москва · с 2014 года</p>
          <h1 className="home-title">{company.shortName}</h1>
          <p className="home-lead">
            Компания зарегистрирована в Москве и ведёт деятельность в сфере
            розничной торговли, в том числе в лицензируемых сегментах рынка
            (основной код ОКВЭД{' '}
            <strong>{company.mainOkved.code}</strong>).
          </p>
          <div className="home-cta">
            <Link to="/activity" className="home-btn home-btn-primary">
              Направления деятельности
            </Link>
            <Link to="/materials" className="home-btn home-btn-outline">
              Материалы о компании
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section page-container page-container-big">
        <h2 className="home-section-title">Ключевые сведения</h2>
        <ul className="home-facts">
          <li>
            <strong>Регистрация:</strong> {company.regDate}, ОГРН{' '}
            {company.ogrn}, ИНН {company.inn}.
          </li>
          <li>
            <strong>Юридический адрес:</strong> {company.legalAddress}
          </li>
          <li>
            <strong>Руководитель:</strong> {company.director} —{' '}
            {company.directorRole}.
          </li>
          <li>
            <strong>Учредитель:</strong> {company.founder.name} (доля в уставном
            капитале {company.founder.share}).
          </li>
        </ul>
        <p className="home-disclaimer">
          Реквизиты на сайте — демонстрационные заглушки. Для юридически значимых
          целей используйте выписку из ЕГРЮЛ и учётные документы организации.
        </p>
        <p className="home-source">
          Условная ссылка для макета (не реестр):{' '}
          <a href={company.demoReferenceUrl} target="_blank" rel="noreferrer">
            example.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};
