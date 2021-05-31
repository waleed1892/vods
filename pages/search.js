import React, {useEffect, useState} from 'react'
import dynamic from "next/dynamic";

import {getAccessToken, getGameByGameName, getStreambyUserName, getStreamerVods, getVideosByGameId} from '../rest/api'
import {client_id} from '../global/twitchInfo'
const ListContent = dynamic(() => import('../components/ListContent/index'))
import {Loading} from '../global/Loading'
// import {useLocation} from "react-router-dom";
import styled from 'styled-components';
import AdSense from "react-adsense";

const cookies = require('cookie-cutter')


export const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #9146ff;
    color: #fff;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    padding: 20px 14px;
    font-size: 1.3rem;
    border-radius: 5px;
    margin: 10px 0px;
`;

export const SearchResultDiv = styled.div`
    padding: 15px;
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
`;

// Display Search result with empty
const SearchResultFail = () => {
    return (
        <>
            <div className="container">
                <StyledDiv>
                    Search Results
                </StyledDiv>
                <AdSense.Google
                    client='ca-pub-3548998999865028'
                    slot='79915789369'
                    style={{display: 'block'}}
                    layout='in-article'
                    format='fluid'
                />
                <div className="w-full card">
                    <SearchResultDiv>
                        No twitch vods found
                    </SearchResultDiv>
                </div>
            </div>
        </>
    )
}

const Search = ({game, user, search, query, videos, queryAfterProp, noResultProp}) => {
    // const search = useLocation().search;
    // const query = new URLSearchParams(search).get('q');
    const [vods, setVods] = useState(videos)
    const [queryAfter, setQueryAfter] = useState(queryAfterProp)
    const [isLoading, setIsLoading] = useState(false)
    const [userInfo, setUserInfo] = useState(user)
    const [gameInfo, setGameInfo] = useState(game)
    const [searchType, setSearchType] = useState(search)
    const [noResult, setNoResult] = useState(noResultProp)
    // const auth_token = JSON.parse(localStorage.getItem('twitchToken'))['token']
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        setNoResult(noResultProp);
        setVods(videos)
        setGameInfo(game)
        setUserInfo(user)
        setSearchType(search)
        setQueryAfter(queryAfterProp)
    }, [query])

    // useEffect(() => {
    //     if (query === null || query === '') {
    //         setNoResult(true);
    //         return;
    //     }
    //     setQueryAfter('')
    //     setVods([])
    //     setNoResult(false)
    //     setSearchType({...searchType, user: false, game: false})
    //     const auth_token = cookies.get('token')
    //     const params = {
    //         auth: auth_token,
    //         client_id: client_id,
    //         game_name: query
    //     }
    //     getGameByGameName(params)
    //         .then(data => {
    //             if (data && data['data'].length > 0) {
    //                 setSearchType({...searchType, user: false, game: true})
    //                 setGameInfo(data['data'][0])
    //             } else {
    //                 getUserInfo()
    //             }
    //         })
    //         .catch(error => console.log(JSON.stringify(error)));
    // }, [router.query.q])
    //
    // useEffect(() => {
    //     if (Object.keys(userInfo).length === 0) return;
    //     getVideosbyUserId()
    // }, [userInfo])
    //
    // useEffect(() => {
    //     if (Object.keys(gameInfo).length === 0) return;
    //     getVideosbyGameId()
    // }, [gameInfo])

    useEffect(() => {
        const handleScroll = () => {
            if (queryAfter !== 'noData' && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                setIsLoading(true)
                searchType.user ? getVideosbyUserId() : getVideosbyGameId()
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [vods, queryAfter])

    // Get GameInfo from game name
    const getUserInfo = () => {
        const auth_token = cookies.get('token')
        const params = {
            auth: auth_token,
            client_id: client_id,
            user_name: query
        }
        getStreambyUserName(params)
            .then(data => {
                if (data && data['data'].length > 0) {
                    setSearchType({...searchType, user: true, game: false})
                    setUserInfo(data['data'][0])
                } else {
                    setNoResult(true)
                }
            })
            .catch(error => console.log(JSON.stringify(error)));
    }

    // Get Videos from streamer id
    const getVideosbyUserId = () => {
        const auth_token = cookies.get('token')
        const params = {
            auth: auth_token,
            client_id: client_id,
            user_id: userInfo.id,
            after: queryAfter
        }
        getStreamerVods(params)
            .then(data => {
                let res = JSON.parse(data)
                setVods(vods.slice().concat(res['data']))
                setQueryAfter(res['pagination'].cursor || 'noData')
                setIsLoading(false)
                if (res['data'].length === 0 && vods.length === 0) setNoResult(true)
            })
            .catch(error => console.log(JSON.stringify(error)));
    }

    // Get Videos from game id
    const getVideosbyGameId = () => {
        const auth_token = cookies.get('token')
        const params = {
            auth: auth_token,
            client_id: client_id,
            game_id: gameInfo.id,
            after: queryAfter
        }
        getVideosByGameId(params)
            .then(data => {
                let res = JSON.parse(data)
                setVods(vods.slice().concat(res['data']))
                setQueryAfter(res['pagination'].cursor || 'noData')
                setIsLoading(false)
            })
            .catch(error => console.log(JSON.stringify(error)));
    }

    return (
        <>
            {noResult ? <SearchResultFail/> :
                <ListContent vods={vods} profile={searchType.game ? gameInfo : (searchType.user && userInfo)}
                             type={searchType} filter={false} title="Search"/>}
            {isLoading && <Loading/>}
        </>
    )
}

export default Search

export async function getServerSideProps(ctx) {
    const {req, res, query} = ctx
    const token = await getAccessToken(req, res);
    const params = {
        auth: token,
        client_id: client_id,
        game_name: query.q
    }
    let game = '';
    let user = '';
    let videos = [];
    let search = {user: false, game: false}
    let queryAfterProp = ''
    let noResultProp = false

    const gameData = await getGameByGameName(params)
    if (!gameData.data.length) {
        const params = {
            auth: token,
            client_id: client_id,
            user_name: query.q
        }
        const userData = await getStreambyUserName(params)
        if (userData.data.length) {
            const params = {
                auth: token,
                client_id: client_id,
                user_id: userData.data[0].id,
                after: ''
            }
            const userVideos = JSON.parse(await getStreamerVods(params))
            videos = userVideos.data
            if (!videos.length) {
                noResultProp = true
            }
            queryAfterProp = userVideos.pagination.cursor || 'noData'
            user = userData.data[0]
            search = {...search, user: true}
        } else {
            noResultProp = true
        }
    } else {
        search = {...search, game: true}
        game = gameData.data[0]
        const params = {
            auth: token,
            client_id: client_id,
            game_id: game.id,
            after: ''
        }
        const gameVideos = JSON.parse(await getVideosByGameId(params))
        videos = gameVideos.data
        if (videos.length) {
            noResultProp = false
        }
        queryAfterProp = gameVideos.pagination.cursor || 'noData'
    }
    return {
        props: {
            game: game,
            search,
            query: query.q,
            user,
            videos,
            queryAfterProp,
            noResultProp
        }, // will be passed to the page component as props
    }
}

