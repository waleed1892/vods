import React, {useEffect, useState} from 'react'
import dynamic from "next/dynamic";
import {getAccessToken, getStreambyUserName, getStreamerVods} from '../../rest/api'

import ListContent from "../../components/ListContent";
import {StyledDiv} from "../../components/ListContent/style";

const Loading = dynamic(() => import('../../global/Loading').then(mod => mod.Loading))

// const cookie = require('cookie-cutter')

const StreamerVods = ({user, videos}) => {
    const [vods, setVods] = useState(videos.data)
    const [queryAfter, setQueryAfter] = useState(videos.pagination.cursor)
    const [isLoading, setIsLoading] = useState(false)
    const [userId, setUserId] = useState(user.data[0].id)
    const [title, setTitle] = useState(user.data[0].display_name)
    // const { name } = useParams();
    // const auth_token = JSON.parse(localStorage.getItem('twitchToken'))['token']

    useEffect(() => {
        window.scrollTo(0, 0)
        // if (name === undefined) return;
        // getUserInfo()
    }, [])

    // useEffect(() => {
    //     if (userId === '') return;
    //     getVideos();
    // }, [userId])

    // Get Videos when detectiong to scroll bottom
    useEffect(() => {
        const handleScroll = () => {
            if (queryAfter !== 'noData' && vods.length > 0 && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                setIsLoading(true)
                getVideos()
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [vods, queryAfter])

    // Get userInfo from user_name
    // const getUserInfo = async () => {
    //     const cookies = await require('cookie-cutter')
    //     const auth_token = cookies.get('token')
    //     const params = {
    //         auth: auth_token,
    //         client_id: client_id,
    //         user_name: name
    //     }
    //     getStreambyUserName(params)
    //         .then(data => {
    //             if (data && data['data'].length > 0) {
    //                 setUserId(data['data'][0].id)
    //                 setTitle(data['data'][0].display_name)
    //             }
    //         })
    //         .catch(error => console.log(JSON.stringify(error)));
    // }

    // Get Videos from streamer id
    const getVideos = async () => {
        const cookie = await require('cookie-cutter')
        const auth_token = cookie.get('token')
        const params = {
            auth: auth_token,
            user_id: userId,
            after: queryAfter
        }
        getStreamerVods(params)
            .then(res => {
                setVods(vods.slice().concat(res['data']))
                setQueryAfter(res['pagination'].cursor || 'noData')
                setIsLoading(false)
            })
            .catch(error => console.log(JSON.stringify(error)));
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
    const {req, res} = ctx
    const {username} = ctx.params
    const token = await getAccessToken(req, res)
    let params = {
        auth: token,
        user_name: username
    }
    const data = await getStreambyUserName(params)
    params = {
        auth: token,
        user_id: data.data[0].id,
        after: ""
    }
    const videos = await getStreamerVods(params)
    return {
        props: {
            user: data,
            videos: videos
        }, // will be passed to the page component as props
    }
}
