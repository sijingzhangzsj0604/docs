// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'API7 Docs',
  tagline: '',
  url: 'https://docs.api7.ai',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'API7.ai', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: "daily",
          priority: 0.5,
        },
        gtag: {
          trackingID: 'G-EHTFFP3QP4',
        },
      }),
    ],
    [
      'redocusaurus',
      {
        specs: [
          {
            spec: "https://api7-cloud-swagger.s3.amazonaws.com/swagger/cloud-console.json",
            route: "/cloud/api",
          },
        ],
        theme: {
          primaryColor: "#e8433e",
        }
      },
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'cloud',
        path: 'docs/cloud',
        routeBasePath: '/cloud',
        sidebarPath: require.resolve('./docs/cloud/sidebars.json')
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'enterprise-whitepaper',
        path: 'docs/enterprise-whitepaper',
        routeBasePath: '/enterprise-whitepaper',
        sidebarPath: require.resolve('./docs/enterprise-whitepaper/sidebars.json')
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'enterprise',
        path: 'docs/enterprise',
        routeBasePath: '/enterprise',
        sidebarPath: require.resolve('./docs/enterprise/sidebars.js')
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'apisix',
        path: 'docs/apisix',
        routeBasePath: '/apisix',
        sidebarPath: require.resolve('./docs/apisix/sidebars.js')
      }
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: "/cloud",
            to: "/cloud/overview/api7-cloud",
          }, {
            from: "/enterprise",
            to: "/enterprise/introduction",
          }, {
            from: "/apisix",
            to: "/apisix/getting-started",
          }
        ]
      }
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Docs',
        logo: {
          alt: 'API7 Docs',
          src: 'https://static.apiseven.com/2022/10/02/63398bceeeac7.webp',
        },
        items: [
          {
            type: 'dropdown',
            label: 'Products',
            position: 'left',
            items: [
              {
                label: 'Cloud',
                href: '/cloud/overview/api7-cloud',
              },
              {
                label: 'Enterprise',
                href: '/enterprise/introduction',
              },
              {
                label: 'Apache APISIX',
                href: '/apisix/getting-started',
              }
            ],
          },
          {
            position: "left",
            label: "API Reference",
            to: "/cloud/api",
            className: "navbar-cloud-api-reference"
          },
          {
            position: "left",
            label: "Whitepaper",
            to: "/enterprise-whitepaper/introduction",
            className: "navbar-enterprise-whitepaper"
          },
          {
            href: 'https://api7.ai',
            label: 'API7.ai',
            position: 'right',
          },
          {
            href: 'https://api7.ai/contact',
            label: 'Contact Us',
            position: 'right',
          },
          {
            href: 'https://github.com/api7/docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      metadata: [{ name: 'keywords', content: 'api7, apache apisix, premium support, enterprise, documentation, docs' }],
      footer: {
        style: 'dark',
        links: [],
        copyright: `Copyright © HONG KONG APISEVEN LIMITED. 2019 - ${new Date().getFullYear()}.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'GO7A0E5H01',

        // Public API key: it is safe to commit it
        apiKey: '4039491eca368ef854448f6619fb9a83',

        indexName: 'api7',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp: /\/docs\//
          to: '/',
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
      },
    }),

  clientModules: [
    require.resolve('./scripts/listenProductsChange.ts'),
    require.resolve('./scripts/olvy.js'),
  ],

  scripts: [
    {
      src: 'https://app.olvy.co/scriptV2.js',
      async: true,
    }
  ]
};

module.exports = config;
