import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { MaterialsPage } from "./pages/news/news-page/index.jsx";
import { Activity } from "./pages/activity/index.jsx";
import { Contacts } from "./pages/contacts/index.jsx";
import { Header } from "./layout/header.jsx";
import { MaterialDetail } from "./pages/news/news-detailed/index.jsx";
import { Home } from "./pages/home/index.jsx";
import { company } from "./data/alfa-m.js";

const routerBasename =
  import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;

function App() {
  return (
    <Router basename={routerBasename}>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/materials/:id" element={<MaterialDetail />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <p className="site-footer-text">
            ООО «Альфа-М». Информация на сайте носит ознакомительный характер; для
            юридических целей используйте выписку из ЕГРЮЛ.
          </p>
          <p className="site-footer-copy">
            © {new Date().getFullYear()} ИНН {company.inn} · ОГРН {company.ogrn}
          </p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
