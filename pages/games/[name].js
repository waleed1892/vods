import React, {useEffect, useState} from 'react'
import ListContent from '../../components/ListContent/index'
import {getAccessToken, getGameByGameName, getLatest, getToken, getVideosByGameId} from '../../rest/api'
import {client_id} from '../../global/twitchInfo'
// import { useParams } from 'react-router-dom'
import {Loading} from '../../global/Loading'
import {StyledDiv} from "../../components/ListContent/style";

const cookies = require('cookie-cutter')

const StreamerVods = ({game, gameVideos}) => {
    const [vods, setVods] = useState(gameVideos.data)
    const [queryAfter, setQueryAfter] = useState(gameVideos.pagination.cursor)
    const [isLoading, setIsLoading] = useState(false)
    const [gameId, setGameId] = useState(game.data[0].id)
    const [title, setTitle] = useState(game.data[0].name)
    // const { name } = useParams();
    // const auth_token = JSON.parse(localStorage.getItem('twitchToken'))['token']

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //     if (name === undefined) return;
    //     getGameInfo()
    // }, [name])

    // useEffect(() => {
    //     if (gameId === '') return;
    //     getVideos();
    // }, [gameId])

    // Get Videos when detectiong to scroll bottom
    useEffect(() => {
        const handleScroll = () => {
            if (queryAfter && vods.length > 0 && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                setIsLoading(true)
                getVideos()
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [vods, queryAfter])

    // Get GameInfo from game name
    const getGameInfo = () => {
        const token = cookies.get('token')
        const params = {
            auth: token,
            client_id: client_id,
            game_name: title
        }
        getGameByGameName(params)
            .then(data => {
                if (data && data['data'].length > 0) {
                    setGameId(data['data'][0].id)
                    setTitle(data['data'][0].name)
                }
            })
            .catch(error => console.log(JSON.stringify(error)));
    }

    // Get Videos from streamer id
    const getVideos = () => {
        const token = cookies.get('token')
        const params = {
            auth: token,
            client_id: client_id,
            game_id: gameId,
            after: queryAfter
        }
        getVideosByGameId(params)
            .then(data => {
                const res = JSON.parse(data)
                if (!res.error) {
                    setVods(vods.slice().concat(res['data']))
                    setQueryAfter(res['pagination'].cursor || false)
                } else {
                    setQueryAfter(false)
                }
                setIsLoading(false)
            })
            .catch(error => console.log(JSON.stringify(error)));
    }

    useEffect(() => {
        console.log(queryAfter)
    }, [queryAfter])

    return (
        <>
            <div className='container'>
                <StyledDiv>
                    <h1>Twitch Vods Archive - {title}</h1>
                    <div style={{flexBasis: '100%', height: 0}}></div>
                    <h2>Best Streaming Service</h2>
                </StyledDiv>
            </div>
            <ListContent vods={vods} filter={false} title={title}/>
            {isLoading && <Loading/>}
        </>
    )
}

export default StreamerVods

export async function getServerSideProps(ctx) {
    const {name} = ctx.params
    const {req, res} = ctx
    const token = await getAccessToken(req, res)
    let params = {
        auth: token,
        client_id: client_id,
        game_name: name
    }
    const data = await getGameByGameName(params)
    params = {
        auth: token,
        client_id: client_id,
        game_id: data.data[0].id,
        after: ''
    }
    const gameVideos = await getVideosByGameId(params)
    return {
        props: {
            game: data,
            gameVideos: JSON.parse(gameVideos)
        }, // will be passed to the page component as props
    }
}
