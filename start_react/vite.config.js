import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * GitHub Pages: сайт открывается как https://<user>.github.io/<имя-репозитория>/
 * В GitHub Actions задано GITHUB_REPOSITORY=владелец/репо — берём имя репо для `base`.
 * Локально (без переменной) — base: "/".
 *
 * Windows CMD: задавайте в кавычках, иначе `/часть` воспринимается как ключ команды set:
 *   set "GITHUB_REPOSITORY=myowner/myrepo"
 */
const repoSlug = process.env.GITHUB_REPOSITORY?.split("/")[1]?.trim();
const base = repoSlug ? `/${repoSlug}/` : "/";

export default defineConfig({
  base,
  plugins: [react()],
});
