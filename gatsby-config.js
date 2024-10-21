module.exports = {
  siteMetadata: {
    title: 'IBM TechXchange 2024',
    description: 'IBM TechXchange 2024',
    keywords: 'gatsby,theme,carbon',
  },
  pathPrefix: `/techxchange2024-lab1596`,
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Carbon Design Gatsby Theme',
        icon: 'src/images/favicon.svg',
        short_name: 'IBM TechXchange 2024',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#161616',
        display: 'browser',
      },
    },
    {
      resolve: 'gatsby-theme-carbon',
      options: {
        repository: {
          baseUrl: 'https://github.com/IBM/techxchange2024-lab1596',
        },
        isSwitcherEnabled: false,
        titleType: 'append',
        navigationStyle: 'header',
        isSearchEnabled: false,
      },
    },
  ],
};
