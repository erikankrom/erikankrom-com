import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  site: "https://erikankrom.com",
  integrations: [sitemap(), partytown()],
});