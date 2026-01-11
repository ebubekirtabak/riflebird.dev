import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Riflebird",
  description: "AI-driven test generation and execution platform.",
  themeConfig: {
    logo: {
      light: "/riflebird-logo.svg",
      dark: "/riflebird-logo-dark.svg",
      alt: "Riflebird Logo",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Get Started", link: "/getting-started" },
    ],

    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Get Started", link: "/getting-started" },
          { text: "Fire Command", link: "/fire-command" },
          { text: "Configuration", link: "/configuration" },
          { text: "Contributing", link: "/contributing" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/ebubekirtabak/riflebird" },
    ],

    search: {
      provider: "local",
    },
  },
});
