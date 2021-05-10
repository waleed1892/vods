import React, {useEffect, useState} from 'react'
// import GameContent from './gameContent'
import {getAccessToken, getGamesTop} from '../rest/api'
import {client_id} from '../global/twitchInfo'
import {Loading} from '../global/Loading'
// import {Helmet} from "react-helmet";
import GameContent from "../components/Games/gameContent";
import Head from "next/head";
import cookies from 'cookie-cutter';


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
    const getGamesList = () => {
        const auth_token = cookies.get('token');
        const params = {
            auth: auth_token,
            client_id: client_id,
            after: queryAfter,
            first: 80
        }
        getGamesTop(params)
            .then(data => {
                const res = JSON.parse(data)
                setGames(games.slice().concat(res['data']))
                setQueryAfter(res['pagination'].cursor || false)
                setIsLoading(false)
            })
            .catch(error => console.log(JSON.stringify(error)));
    }

    return (
        <>
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
        client_id: client_id,
        after: '',
        first: 80
    }
    const data = await getGamesTop(params)
    return {
        props: {
            initialGames: JSON.parse(data)
        }, // will be passed to the page component as props
    }
}
