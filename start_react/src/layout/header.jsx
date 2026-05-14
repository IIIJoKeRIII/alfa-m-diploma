import "./header.css";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header-style">
      <div className="header-container">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            "site-brand" + (isActive ? " site-brand-active" : "")
          }
        >
          <span className="site-brand-mark">А</span>
          <span className="site-brand-text">
            льфа<span className="site-brand-dash">‑</span>М
          </span>
        </NavLink>
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Главная
          </NavLink>
          <NavLink
            to="/activity"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Деятельность
          </NavLink>
          <NavLink
            to="/materials"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Материалы
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Контакты
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
