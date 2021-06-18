// next.config.js
module.exports = {
    productionBrowserSourceMaps: true,
    images: {
        domains: ['static-cdn.jtvnw.net']
    },
}

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
// })
// module.exports = withBundleAnalyzer({})
