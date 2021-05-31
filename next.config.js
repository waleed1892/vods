// next.config.js
// const withImages = require('next-images')
// module.exports = withImages()
module.exports = {
    images: {
        domains: ['static-cdn.jtvnw.net']
    }
}
// next.config.js
module.exports = withCss(
    withPurgeCss({
        purgeCssPaths: [
            "pages/**/*",
            "components/**/*",
            "global/**/*", // also scan other-components folder
        ],
    })
);

