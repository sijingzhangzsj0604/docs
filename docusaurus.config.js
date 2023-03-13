// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const getEditUrl = (props) => {
  const {
    projectName, docPath, version,
  } = props;
  const dir = version === 'current' ? `docs/${projectName}` : `${projectName}/version-${version}`;

  return `https://github.com/api7/docs/edit/main/${dir}/${docPath}`
};

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
        sidebarPath: require.resolve('./docs/cloud/sidebars.json'),
        editUrl: (props) =>
          getEditUrl({
            ...props,
            projectName: 'cloud',
          }),
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'enterprise-whitepaper',
        path: 'docs/enterprise-whitepaper',
        routeBasePath: '/enterprise-whitepaper',
        sidebarPath: require.resolve('./docs/enterprise-whitepaper/sidebars.json'),
        editUrl: (props) =>
          getEditUrl({
            ...props,
            projectName: 'enterprise-whitepaper',
          }),
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'enterprise',
        path: 'docs/enterprise',
        routeBasePath: '/enterprise',
        sidebarPath: require.resolve('./docs/enterprise/sidebars.js'),
        editUrl: (props) =>
          getEditUrl({
            ...props,
            projectName: 'enterprise_versioned_docs',
          }),
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'apisix-ingress-controller',
        path: 'docs/apisix-ingress-controller',
        routeBasePath: '/apisix-ingress-controller',
        sidebarPath: require.resolve('./docs/apisix-ingress-controller/sidebars.js'),
        editUrl: (props) =>
          getEditUrl({
            ...props,
            projectName: 'apisix-ingress-controller_versioned_docs',
          }),
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'apisix',
        path: 'docs/apisix',
        routeBasePath: '/apisix',
        sidebarPath: require.resolve('./docs/apisix/sidebars.js'),
        editUrl: (props) =>
          getEditUrl({
            ...props,
            projectName: 'apisix_versioned_docs',
          }),
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
            to: "/apisix/documentation",
          }, {
            from: "/apisix-ingress-controller",
            to: "/apisix-ingress-controller/demo",
          }
        ]
      }
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Docs Home',
        items: [
          {
            position: "left",
            label: "Cloud",
            to: '/cloud/overview/api7-cloud',
          },
          {
            position: "left",
            label: "Enterprise",
            to: '/enterprise/introduction',
          },
          {
            position: "left",
            label: "Apache APISIX",
            to: '/apisix/documentation',
          },
        ],
      },
      metadata: [{ name: 'keywords', content: 'api7, apache apisix, premium support, enterprise, documentation, docs' }],
      footer: {
        style: 'dark',
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['lua']
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
    require.resolve('./scripts/olvy.js'),
  ],

  scripts: [
    {
      src: '/_vercel/insights/script.js',
      async: true,
    }, {
      src: 'https://app.olvy.co/scriptV2.js',
      async: true,
    }
  ]
};

module.exports = config;
