import React, {useEffect, useState} from 'react'
import dynamic from "next/dynamic";
import GameContent from "../components/Games/gameContent";
import Head from "next/head";
import {PageTitleSection} from "../components/Games/style";
import Link from 'next/link'
import {getAccessToken, getGamesTop} from "../rest/api";

const Loading = dynamic(() => import('../global/Loading').then(mod => mod.Loading))

const GamePage = ({initialGames}) => {
    const [games, setGames] = useState(initialGames.data)
    const [queryAfter, setQueryAfter] = useState(initialGames.pagination.cursor)
    const [isLoading, setIsLoading] = useState(false)
    // const auth_token = JSON.parse(localStorage.getItem('twitchToken'))['token']

    useEffect(() => {
        window.scrollTo(0, 0)
        // getGamesList()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if ((queryAfter && window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                setIsLoading(true)
                getGamesList()
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [games, queryAfter])

    // Get streamersList
    const getGamesList = async () => {
        const cookies = await require('cookie-cutter');
        const auth_token = cookies.get('token');
        const params = {
            auth: auth_token,
            after: queryAfter,
            first: 80
        }
        import('../rest/api').then(mod => {
            mod.getGamesTop(params).then(res => {
                setGames([...games, ...res['data']])
                setQueryAfter(res['pagination'].cursor || false)
                setIsLoading(false)
            })
                .catch(error => console.log(JSON.stringify(error)));
        })
        // getGamesTop(params)
        //     .then(res => {
        //         setGames([...games, ...res['data']])
        //         setQueryAfter(res['pagination'].cursor || false)
        //         setIsLoading(false)
        //     })
        //     .catch(error => console.log(JSON.stringify(error)));
    }

    return (
        <>
            <div className='container'>
                <PageTitleSection>
                    <h1>Games – Twitch Vods</h1>
                    <div style={{flexBasis: '100%', height: 0}}></div>
                    <p>Do you have a favorite game that you prefer to watch on Twitch? This section of Twitch Vods are
                        exclusively sorted by game for your convenience. Here you can find top streamers and Twitch Vods
                        under categories such as <Link href='/games/Grand%20Theft%20Auto%20V'><a className='text-white'>“Grand
                            Theft Auto V”</a></Link>, <Link href='/games/World%20of%20Warcraft'><a
                            className='text-white'>“World of Warcraft: Shadowlands”</a></Link>,
                        <Link href='/games/League%20of%20Legends'><a className='text-white'>“League of
                            Legends”</a></Link>, and more!</p>
                </PageTitleSection>
            </div>
            <GameContent games={games}/>
            {isLoading && <Loading/>}

            <Head>
                <title>Search Twitch Vods By Games</title>
                <meta name="description" content="Search Twitch Vods By Games On The Biggest Library Online"
                />
            </Head>
        </>
    )
}

export default GamePage

export async function getServerSideProps({req, res}) {
    const token = await getAccessToken(req, res)
    const params = {
        auth: token,
        after: '',
        first: 80
    }
    const data = await getGamesTop(params)
    return {
        props: {
            initialGames: data
        }, // will be passed to the page component as props
    }
}
