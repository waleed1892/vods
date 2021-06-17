import React, {useEffect, useState} from 'react'
import dynamic from "next/dynamic";
import {getAccessToken, getStreamers} from '../rest/api'
import StreamerList from '../components/StreamerList'
import Head from "next/head";

const Loading = dynamic(() => import('../global/Loading').then(mod => mod.Loading))

const Streamers = ({initialStreamers}) => {
    const [streamers, setStreamers] = useState(initialStreamers.data)
    const [queryAfter, setQueryAfter] = useState(initialStreamers.pagination.cursor)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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
    const getStreamersList = async () => {
        const cookieCutter = await require('cookie-cutter')
        const auth_token = cookieCutter.get('token')
        const params = {
            auth: auth_token,
            after: queryAfter,
            first: 80
        }
        getStreamers(params)
            .then(res => {
                setStreamers([...streamers, ...res['data']])
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
        after: '',
        first: 80
    }
    const data = await getStreamers(params)
    return {
        props: {
            initialStreamers: data
        }, // will be passed to the page component as props
    }
}
