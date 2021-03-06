import React, {useEffect, useState} from 'react'
import ListContent from '../components/ListContent'
import {getAccessToken, getVideosByUserId} from '../rest/api'
import Head from "next/head";
import {StyledDiv} from "../components/ListContent/style";
import dynamic from "next/dynamic";

const Loading = dynamic(() => import('../global/Loading').then(mod => mod.Loading))

const Longest = ({initialVods}) => {

    const videoSort = (duration1, duration2) => {
        let b = format(duration1)
        let a = format(duration2)
        return b > a ? 1 : -1;
    }

    const format = (time) => {
        let hrs = time.includes("h") ? time.split('h')[0] : 0
        let mins = ''
        let secs = ''
        if (hrs === 0) mins = time.includes('m') ? time.split('m')[0] : 0
        else mins = time.includes('m') ? time.split('h')[1].split('m'[0]) : 0
        if (mins === 0) secs = time.split('s')[0]
        else secs = time.split('m')[1].split('s')[0]
        let result = parseInt(hrs) * 3600 + parseInt(mins) * 60 + parseInt(secs)
        return result
    }

    let allVods = initialVods.data
    const sorted = allVods.sort((a, b) => videoSort(b['duration'], a['duration']));
    const [vods, setVods] = useState(sorted)
    const [queryAfter, setQueryAfter] = useState(initialVods.page.cursor)
    const [isLoading, setIsLoading] = useState(false)
    // const auth_token = JSON.parse(localStorage.getItem('twitchToken'))['token']


    useEffect(() => {
        window.scrollTo(0, 0)
        // getVods()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if ((queryAfter && window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                setIsLoading(true)
                getVods()
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [vods, queryAfter])

    // Get streamersList
    const getVods = async () => {
        const cookieCutter = await require('cookie-cutter');
        const auth_token = cookieCutter(document).get('token')
        const params = {
            auth: auth_token,
            after: queryAfter,
            first: 4
        }
        import('../rest/api').then(mod => {
            mod.getVideosByUserId(params)
                .then(res => {
                    let allVods = [...vods, ...res['data']]
                    const sorted = allVods.sort((a, b) => videoSort(b['duration'], a['duration']));
                    setVods(sorted)
                    setQueryAfter(res['page'].cursor || false)
                    setIsLoading(false)
                })
                .catch(error => console.log(JSON.stringify(error)));
        })
        // getVideosByUserId(params)
        //     .then(res => {
        //         let allVods = [...vods, ...res['data']]
        //         const sorted = allVods.sort((a, b) => videoSort(b['duration'], a['duration']));
        //         setVods(sorted)
        //         setQueryAfter(res['page'].cursor || false)
        //         setIsLoading(false)
        //     })
        //     .catch(error => console.log(JSON.stringify(error)));
    }
    return (

        <>
            <div className='container'>
                <StyledDiv>
                    <h1>Longest ??? Twitch Vods</h1>
                    <div style={{flexBasis: '100%', height: 0}}></div>
                    <p>Are you in it for the long haul? Check out our archive of the longest Twitch Vods to ever be
                        recorded! Pick a Vod to play in the background while you complete chores, work on a project, or
                        even as you take a nap. Some of the longest videos include marathon gameplay, challenges, and
                        more!</p>
                </StyledDiv>
            </div>
            <ListContent vods={vods} filter={false} title="Longest"/>
            {isLoading && <Loading/>}
            <Head>
                <title>Longest Twitch Vods</title>
                <meta name="description" content="Check Out The Longest Twitch Vods Clips Here"
                />
            </Head>
        </>
    )
}

export default Longest


export async function getServerSideProps({req, res}) {
    const token = await getAccessToken(req, res)
    const params = {
        auth: token,
        after: '',
        first: 4
    }
    const data = await getVideosByUserId(params)
    return {
        props: {
            initialVods: data
        }, // will be passed to the page component as props
    }
}
