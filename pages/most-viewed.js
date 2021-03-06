import React, {useEffect, useState} from 'react'
import ListContent from '../components/ListContent'
import {getAccessToken, getVods} from '../rest/api'
import Head from "next/head";
import Link from "next/link";
import {StyledDiv} from "../components/ListContent/style";
import dynamic from "next/dynamic";

const Loading = dynamic(() => import('../global/Loading').then(mod => mod.Loading))

const MostViewed = ({initialVods}) => {
    const videoSort = (viewCount1, viewCount2) => {
        let b = parseInt(viewCount1)
        let a = parseInt(viewCount2)
        return b > a ? 1 : -1;
    }
    let allVods = initialVods.vods
    const sorted = allVods.sort((a, b) => videoSort(b['views'], a['views']));
    const uniqueAddresses = getUnique(sorted, '_id')
    const [vods, setVods] = useState(uniqueAddresses)
    const [queryAfter, setQueryAfter] = useState(20)
    const [isLoading, setIsLoading] = useState(false)
    // const auth_token = JSON.parse(localStorage.getItem('twitchToken'))['token']


    useEffect(() => {
        window.scrollTo(0, 0)
        // getTopVods()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (queryAfter < 500 && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                setIsLoading(true)
                getTopVods()
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [vods, queryAfter])

    // Get streamersList
    const getTopVods = () => {
        const params = {
            offset: queryAfter,
        }
        import('../rest/api').then(mod => {
            mod.getVods(params)
                .then(data => {
                    let res = data;
                    let allVods = [...vods, ...res['vods']]
                    const sorted = allVods.sort((a, b) => videoSort(b['views'], a['views']));
                    const uniqueAddresses = getUnique(sorted, '_id')
                    setVods(uniqueAddresses)
                    setQueryAfter(queryAfter + 20)
                    setIsLoading(false)
                })
                .catch(error => console.log(JSON.stringify(error)));
        })
        // getVods(params)
        //     .then(data => {
        //         let res = data;
        //         let allVods = [...vods, ...res['vods']]
        //         const sorted = allVods.sort((a, b) => videoSort(b['views'], a['views']));
        //         const uniqueAddresses = getUnique(sorted, '_id')
        //         setVods(uniqueAddresses)
        //         setQueryAfter(queryAfter + 20)
        //         setIsLoading(false)
        //     })
        //     .catch(error => console.log(JSON.stringify(error)));
    }

    function getUnique(arr, comp) {

        // store the comparison  values in array
        const unique = arr.map(e => e[comp])

            // store the indexes of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the false indexes & return unique objects
            .filter((e) => arr[e]).map(e => arr[e]);

        return unique;
    }

    return (
        <>
            <div className='container'>
                <StyledDiv>
                    <h1>Most Viewed ??? Twitch Vods</h1>
                    <div style={{flexBasis: '100%', height: 0}}></div>
                    <p>Our ???most viewed??? <Link href='/'><a className='text-white'>Twitch Vods</a></Link> are the clips
                        that have made their mark in our minds and hearts, and will forever be industry favorites! These
                        Vods provide only the most hilarious, engaging, or even helpful commentary along with
                        interesting visuals. You???ll be sure to stop by this section time-after-time to revisit your
                        favorites!</p>
                </StyledDiv>
            </div>
            <ListContent vods={vods} filter={true} title="Most viewed"/>
            {
                isLoading && <Loading/>
            }
            <Head>
                <title>Most viewed</title>
                <meta name="description" content="Most Viewed Twitch Vods Clips Videos Ever"/>
            </Head>
        </>
    )
}

export default MostViewed

export async function getServerSideProps({req, res}) {
    const token = await getAccessToken(req, res)
    const params = {
        offset: 0,
    }
    const data = await getVods(params)
    return {
        props: {
            initialVods: data
        }, // will be passed to the page component as props
    }
}
