import '../styles/globals.css'
import Header from "../components/Header";
import {useEffect, useState} from "react";

import 'bootstrap/dist/css/bootstrap.min.css'
import {useRouter} from "next/router"
import dynamic from "next/dynamic";

const PageLoading = dynamic(() => import("../global/Loading").then(mod => mod.PageLoading));

function MyApp({Component, pageProps}) {
    const router = useRouter();
    const [pageLoading, setPageLoading] = useState(false);

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles && jssStyles.parentNode)
            jssStyles.parentNode.removeChild(jssStyles)
        window.dataLayer = window.dataLayer || [];

        // function gtag() {
        //     dataLayer.push(arguments);
        // }
        //
        // gtag('js', new Date());
        // gtag('config', 'UA-145394651-21', {
        //     page_path: window.location.pathname,
        // });
    }, [])
    useEffect(() => {
        router.events.on('routeChangeStart', function () {
            setPageLoading(true)
        })

        router.events.on('routeChangeComplete', function () {
            setPageLoading(false)
        })

        router.events.on('routeChangeError', function () {
            setPageLoading(true)
        })
    }, [router.route])
    return (
        <>
            <Header></Header>
            {
                pageLoading ? <PageLoading/> :
                    <Component {...pageProps} />
            }
            {/*<ErrorBoundary children={<Component {...pageProps} />}></ErrorBoundary>*/}

        </>
    )
}

export default MyApp
