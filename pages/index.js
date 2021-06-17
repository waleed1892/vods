import React, {useEffect, useState} from 'react'
import dynamic from "next/dynamic";
import {getAccessToken, getLatest} from '../rest/api'
import Head from 'next/head'
import Link from 'next/link'
import {StyledDiv} from "../components/ListContent/style";

import ListContent from '../components/ListContent'

const Loading = dynamic(() => import('../global/Loading').then(mod => mod.Loading))
const Home = ({initialVods}) => {
    const [vods, setVods] = useState(initialVods.data)
    const [queryAfter, setQueryAfter] = useState(initialVods.pagination.cursor)
    const [isLoading, setIsLoading] = useState(false)
    // const auth_token = cookieCutter.get('token')
    // const auth_token = JSON.parse(localStorage.getItem('twitchToken'))['token']

    useEffect(() => {
        window.scrollTo(0, 0)
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
    const getTopVods = async () => {
        const cookie = await require('cookie-cutter')
        const auth_token = cookie.get('token');
        const params = {
            auth: auth_token,
            after: queryAfter,
            first: 5
        }
        getLatest(params)
            .then(res => {
                setVods([...vods, ...res['data']])
                setQueryAfter(res['pagination'].cursor || false)
                setIsLoading(false)
            })
            .catch(error => console.log(JSON.stringify(error)));
    }


    return (
        <>
            <Head>
                <title>Twitch Vods - Trending Clips, Most Viewed, Longest, Streamers</title>
                <meta name="description"
                      content="The Biggest Twitch Vods Archive Online, Search videos, Clips, Streamers, Games and get all streams in one place"/>
            </Head>
            <div className='container'>
                <StyledDiv>
                    <h1>Trending – Twitch Vods</h1>
                    <div style={{flexBasis: '100%', height: 0}}></div>
                    <p>These <Link href='/'><a className='text-white'>Twitch Vods</a></Link> are trending for a reason!
                        That’s right, these
                        clips are
                        quickly
                        becoming the most popular in their categories. Here you can view up-and-coming content that has
                        gone viral or is sure to go viral soon. From gameplay and commentary to sporting events, there
                        is trending content for everyone!
                    </p>
                </StyledDiv>
            </div>
            <ListContent vods={vods} title="Twitch Vods Archive - Trending"/>
            {isLoading && <Loading/>}
        </>
    )
}

export default Home

export async function getServerSideProps({req, res}) {
    const token = await getAccessToken(req, res)
    const params = {
        auth: token,
        after: '',
        first: 5
    }
    const data = await getLatest(params)
    // console.log(JSON.parse(data))
    return {
        props: {
            initialVods: data
        }, // will be passed to the page component as props
    }
}
