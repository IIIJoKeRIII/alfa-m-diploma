import { company, additionalOkved } from '../../data/alfa-m.js';
import './activity.css';

export const Activity = () => {
  return (
    <div className="page-container page-container-big activity-page">
      <h1 className="header-news">Направления деятельности</h1>
      <p className="activity-intro">
        Ниже приведён основной и часть дополнительных кодов ОКВЭД общества с
        ограниченной ответственностью «Альфа-М» в редакции, отражённой в
        открытых реестрах. Полный перечень кодов смотрите в выписке ЕГРЮЛ.
      </p>

      <article className="activity-highlight">
        <h2>Основной вид деятельности</h2>
        <p className="activity-okved-code">{company.mainOkved.code}</p>
        <p>{company.mainOkved.title}</p>
      </article>

      <h2 className="activity-subtitle">Дополнительные виды (фрагмент)</h2>
      <div className="activity-grid">
        {additionalOkved.map((row) => (
          <article key={row.code} className="activity-card">
            <p className="activity-card-code">{row.code}</p>
            <p className="activity-card-text">{row.title}</p>
          </article>
        ))}
      </div>

      <p className="activity-note">
        В реестре также указаны, в частности, оптовая торговля табачными
        изделиями, транспортно-складские операции и консалтинг — см. полный
        список на сервисах, агрегирующих данные ЕГРЮЛ (
        <a href={company.referenceInfoUrl} target="_blank" rel="noreferrer">
          справочный сервис
        </a>
        ).
      </p>
    </div>
  );
};
