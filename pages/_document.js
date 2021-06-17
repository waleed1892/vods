import Document, {Head, Html, Main, NextScript} from 'next/document'
import {ServerStyleSheet as StyledComponentSheets} from 'styled-components'
import {ServerStyleSheets as MaterialUiServerStyleSheets} from '@material-ui/core/styles'
import React from "react";


class MyDocument extends Document {
    static async getInitialProps(ctx) {
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
            <Html lang={"en"}>
                <Head>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
                <script async
                        defer={true}
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3548998999865028"
                        crossOrigin="anonymous"></script>
                <script async
                        defer={true}
                        src="https://www.googletagmanager.com/gtag/js?id=UA-145394651-21"></script>
            </Html>
        )
    }
}

export default MyDocument
