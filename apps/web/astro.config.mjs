import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  site: "https://erikankrom.com",
  integrations: [sitemap(), partytown()],
  vite: {
    plugins: [tailwindcss()],
  },
});
