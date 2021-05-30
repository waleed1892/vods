import React, {useEffect, useState} from 'react'
import {getAccessToken, getStreamers} from '../rest/api'
import {client_id} from '../global/twitchInfo'
import StreamerList from '../components/StreamerList'
import {Loading} from '../global/Loading'
// import {Helmet} from "react-helmet";
import Head from "next/head";

const cookieCutter = require('cookie-cutter')

const Streamers = ({initialStreamers}) => {
    const [streamers, setStreamers] = useState(initialStreamers.data)
    const [queryAfter, setQueryAfter] = useState(initialStreamers.pagination.cursor)
    const [isLoading, setIsLoading] = useState(false)
    // const [auth_token, setAuthToken] = useState(null)
    // const auth_token = JSON.parse(localStorage.getItem('twitchToken'))['token']

    useEffect(() => {
        window.scrollTo(0, 0)
        // setAuthToken(JSON.parse(localStorage.getItem('twitchToken'))['token'])
        // const auth_token = localStorage.getItem('twitchToken')
        // getStreamersList()
    }, [])

    // useEffect(() => {
    //     getStreamersList()
    // }, [auth_token])

    useEffect(() => {
        const handleScroll = () => {
            if ((queryAfter && window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                setIsLoading(true)
                getStreamersList()
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [streamers, queryAfter])

    // Get streamersList
    const getStreamersList = () => {
        const auth_token = cookieCutter.get('token')
        const params = {
            auth: auth_token,
            client_id: client_id,
            after: queryAfter,
            first: 80
        }
        getStreamers(params)
            .then(data => {
                const res = JSON.parse(data)
                setStreamers(streamers.slice().concat(res['data']))
                setQueryAfter(res['pagination'].cursor || false)
                setIsLoading(false)
            })
            .catch(error => console.log(JSON.stringify(error)));
    }

    return (
        <>
            <StreamerList streamers={streamers}/>
            {
                isLoading && <Loading/>
            }
            <Head>
                <title>Search Twitch Vods By Streamers</title>
                <meta name="description" content="Search Twitch Vods Videos By Streamers In One Place"/>
            </Head>
        </>
    )
}

export default Streamers

export async function getServerSideProps({req, res}) {
    const token = await getAccessToken(req, res)
    const params = {
        auth: token,
        client_id: client_id,
        after: '',
        first: 80
    }
    const data = await getStreamers(params)
    return {
        props: {
            initialStreamers: JSON.parse(data)
        }, // will be passed to the page component as props
    }
}
