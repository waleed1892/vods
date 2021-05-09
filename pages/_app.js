import '../styles/globals.css'
import Header from "../components/Header";
import {useState, useEffect} from "react";

import 'bootstrap/dist/css/bootstrap.min.css'
import ErrorBoundary from "../global/ErrorBoundary";
// import NProgress from "nprogress"
import {useRouter} from "next/router"
import {PageLoading} from "../global/Loading";

function MyApp({Component, pageProps}) {
    const router = useRouter();
    const [pageLoading, setPageLoading] = useState(false);

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
