import Document, {Html, Head, Main, NextScript} from 'next/document'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles'
import React from "react";



class MyDocument extends Document {
    static async getInitialProps (ctx) {
        const styledComponentSheet = new StyledComponentSheets()
        const materialUiSheets = new MaterialUiServerStyleSheets()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        styledComponentSheet.collectStyles(
                            materialUiSheets.collect(<App {...props} />),
                        ),
                })

            const initialProps = await Document.getInitialProps(ctx)

            return {
                ...initialProps,
                styles: [
                    <React.Fragment key="styles">
                        {initialProps.styles}
                        {materialUiSheets.getStyleElement()}
                        {styledComponentSheet.getStyleElement()}
                    </React.Fragment>,
                ],
            }
        } finally {
            styledComponentSheet.seal()
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <script async
                            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3548998999865028"
                            crossOrigin="anonymous"></script>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
