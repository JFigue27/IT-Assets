const withSass = require('@zeit/next-sass');
const withFonts = require('next-fonts');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
// const isProd = process.env.NODE_ENV === 'production';

module.exports = withBundleAnalyzer(
  withFonts(
    withSass({
      devIndicators: {
        autoPrerender: false
      },
      target: 'serverless',
      // assetPrefix: isProd ? 'http://localhost/UniversalCatalogs/main' : '',
      // exportPathMap: function() {
      //   return {
      //     '/': { page: '/' },
      //     '/items': { page: '/items' }
      //   };
      // },
      analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
      analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: 'static',
          reportFilename: '../bundles/server.html'
        },
        browser: {
          analyserMode: 'static',
          reportFilename: '../bundles/client.html'
        }
      }
    })
  )
);
