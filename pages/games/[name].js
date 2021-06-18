import React, {useEffect, useState} from 'react'
import dynamic from "next/dynamic";

import ListContent from '../../components/ListContent/index'
import {getVideosByGameName} from '../../rest/api'

const Loading = dynamic(() => import('../../global/Loading').then(mod => mod.Loading))
import {StyledDiv} from "../../components/ListContent/style";

const StreamerVods = ({game, gameVideos}) => {
    const [vods, setVods] = useState(gameVideos.vods)
    const [queryAfter, setQueryAfter] = useState(40)
    const [isLoading, setIsLoading] = useState(false)
    // const [gameId, setGameId] = useState(game.id)
    const [title, setTitle] = useState(game.name)
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
    // const getGameInfo = async () => {
    //     const cookies = await require('cookie-cutter')
    //     const token = cookies.get('token')
    //     const params = {
    //         auth: token,
    //         client_id: client_id,
    //         game_name: title
    //     }
    //     getGameByGameName(params)
    //         .then(data => {
    //             if (data && data['data'].length > 0) {
    //                 setGameId(data['data'][0].id)
    //                 setTitle(data['data'][0].name)
    //             }
    //         })
    //         .catch(error => console.log(JSON.stringify(error)));
    // }

    // Get Videos from streamer id
    const getVideos = async () => {
        // const cookies = await require('cookie-cutter')
        // const token = cookies.get('token')
        // const params = {
        //     auth: token,
        //     client_id: client_id,
        //     game_id: gameId,
        //     after: queryAfter
        // }
        // getVideosByGameId(params)
        //     .then(data => {
        //         const res = JSON.parse(data)
        //         if (!res.error) {
        //             setVods(vods.slice().concat(res['data']))
        //             setQueryAfter(res['pagination'].cursor || false)
        //         } else {
        //             setQueryAfter(false)
        //         }
        //         setIsLoading(false)
        //     })
        //     .catch(error => console.log(JSON.stringify(error)));
        const params = {
            game: title,
            after: queryAfter,
            limit: 40
        }
        import('../../rest/api').then(mod => {
            mod.getVideosByGameName(params)
                .then(res => {
                    if (!res.error) {
                        setVods([...vods, ...res.vods])
                        setQueryAfter(queryAfter + 40)
                    } else {
                        setQueryAfter(0)
                    }
                    setIsLoading(false)
                })
                .catch(error => console.log(JSON.stringify(error)));
        })
        // getVideosByGameName(params)
        //     .then(res => {
        //         if (!res.error) {
        //             setVods([...vods, ...res.vods])
        //             setQueryAfter(queryAfter + 40)
        //         } else {
        //             setQueryAfter(0)
        //         }
        //         setIsLoading(false)
        //     })
        //     .catch(error => console.log(JSON.stringify(error)));
    }

    return (
        <>
            <div className='container'>
                <StyledDiv>
                    <h1>{title} Twitch Vods</h1>
                    <div style={{flexBasis: '100%', height: 0}}></div>
                    <h2></h2>
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
    // const token = await getAccessToken(req, res)
    // let params = {
    //     auth: token,
    //     client_id: client_id,
    //     game_name: name
    // }
    // const data = await getGameByGameName(params)
    // params = {
    //     auth: token,
    //     client_id: client_id,
    //     game_id: data.data[0].id,
    //     after: ''
    // }
    // const gameVideos = await getVideosByGameId(params)
    const params = {
        game: name,
        after: 0,
        limit: 40
    }
    const data = {
        name: name,
    }
    const gameVideos = await getVideosByGameName(params)
    return {
        props: {
            game: data,
            gameVideos: gameVideos
        }, // will be passed to the page component as props
    }
}
