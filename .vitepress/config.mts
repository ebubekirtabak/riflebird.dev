import { defineConfig, loadEnv, HeadConfig } from "vitepress";

const env = loadEnv("", process.cwd());
const gaId = env.VITE_GOOGLE_ANALYTICS_ID;

export default defineConfig({
  title: "Riflebird",
  description: "AI-driven test generation and execution platform.",
  head: [
    ["link", { rel: "icon", href: "/riflebird-logo.svg" }],
    ...(gaId
      ? ([
          [
            "script",
            {
              async: "",
              src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
            },
          ],
          [
            "script",
            {},
            `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${gaId}');`,
          ],
        ] as HeadConfig[])
      : []),
  ],
  lastUpdated: true,
  sitemap: {
    hostname: "https://riflebird.dev",
  },
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

    editLink: {
      pattern:
        "https://github.com/ebubekirtabak/riflebird.dev/edit/master/:path",
      text: "Edit this page on GitHub",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026",
    },
  },
});
