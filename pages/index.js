import React, {useEffect, useState} from 'react'
import ListContent from '../components/ListContent'
import {getAccessToken, getLatest, getToken} from '../rest/api'
import {client_id} from '../global/twitchInfo'
import {Loading} from '../global/Loading'
// import {Helmet} from "react-helmet";
import Head from 'next/head'

const cookie = require('cookie-cutter')

const Home = ({initialVods}) => {
    const [vods, setVods] = useState(initialVods.data)
    const [queryAfter, setQueryAfter] = useState(initialVods.pagination.cursor)
    const [isLoading, setIsLoading] = useState(false)
    // const auth_token = cookieCutter.get('token')
    // const auth_token = JSON.parse(localStorage.getItem('twitchToken'))['token']

    useEffect(() => {
        window.scrollTo(0, 0)
        // getTopVods()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if ((queryAfter && window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                setIsLoading(true)
                getTopVods()
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [vods, queryAfter])

    // Get streamersList
    const getTopVods = () => {
        const auth_token = cookieCutter.get('token');
        const params = {
            auth: auth_token,
            client_id: client_id,
            after: queryAfter,
            first: 5
        }
        getLatest(params)
            .then(data => {
                const res = JSON.parse(data)
                setVods(vods.slice().concat(res['data']))
                setQueryAfter(res['pagination'].cursor || false)
                setIsLoading(false)
            })
            .catch(error => console.log(JSON.stringify(error)));
    }


    return (
        <>
            <Head>
                <title>Twitch Vods Archive</title>
                <meta name="description"
                      content="The Biggest Twitch Vods Archive Online, Search videos, Clips, Streamers, Games and get all streams in one place"/>
            </Head>
            <ListContent vods={vods} title="Twitch Vods Archive - Trending"/>


            {isLoading && <Loading/>}

            {/*      <Helmet>*/}
            {/*<title>Twitch Vods Archive</title>*/}
            {/*<meta name="description" content="The Biggest Twitch Vods Archive Online, Search videos, Clips, Streamers, Games and get all streams in one place"*/}
            {/*/>*/}
            {/*      </Helmet>*/}


        </>
    )
}

export default Home
import Cookies from 'cookies'

export async function getServerSideProps({req, res}) {
    const token = await getAccessToken(req, res)
    const params = {
        auth: token,
        client_id: client_id,
        after: '',
        first: 5
    }
    const data = await getLatest(params)
    return {
        props: {
            initialVods: JSON.parse(data)
        }, // will be passed to the page component as props
    }
}