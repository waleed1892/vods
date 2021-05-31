// next.config.js
const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");
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

