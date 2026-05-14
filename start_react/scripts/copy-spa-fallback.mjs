/**
 * GitHub Pages отдаёт 404.html при отсутствии файла.
 * Копия index.html позволяет React Router открывать прямые ссылки (например /materials/1).
 */
import { copyFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, "..", "dist");
const indexHtml = join(dist, "index.html");
const fallback = join(dist, "404.html");

if (!existsSync(indexHtml)) {
  console.error("copy-spa-fallback: dist/index.html не найден. Сначала выполните vite build.");
  process.exit(1);
}
copyFileSync(indexHtml, fallback);
console.log("copy-spa-fallback: записан dist/404.html для GitHub Pages (SPA).");
