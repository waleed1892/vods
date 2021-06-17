import React from 'react'
import dynamic from "next/dynamic";
import Head from "next/head";
import AdSense from "react-adsense";
const Game = dynamic(() => import('../Vod/filterVod'))
const Vod = dynamic(() => import('../Vod/streamerVod'))
const GameList = dynamic(() => import('../Game'))
const Streamer = dynamic(() => import('../StreamerList/searchStreamer'))
const LatestVod = dynamic(() => import('../Vod/latestVod'))
const SkeleLatestLoading = dynamic(() => import('../../global/skleton').then(mod => mod.SkeleLatestLoading))
const SkeleVodLoading = dynamic(() => import('../../global/skleton').then(mod => mod.SkeleVodLoading))


const ListContent = (props) => {
    const {vods, filter, title, type, profile} = props
    const homeTitle = "Twitch Vods Archive - Trending"

    const LatestVideo = () => {
        return (
            <div className="mt-3">
                {
                    vods.length > 0 ?
                        vods.map((vod, i) => (
                            <LatestVod data={vod} key={i}/>
                        )) :
                        <div className="row">
                            {[...Array(12)].map((item, i) => (<SkeleLatestLoading key={i}/>))}
                        </div>
                }
            </div>
        )
    }

    return (
        <div className="container">
            <AdSense.Google
                client='ca-pub-3548998999865028'
                slot='8898003939'
                style={{display: 'block'}}
                layout='in-article'
                format='fluid'
            />
            {
                title === "Twitch Vods Archive - Trending" ?
                    <LatestVideo/> :
                    <div className="mt-3">
                        <div>{profile && type.game && <GameList game={profile}/>}</div>
                        <div>{profile && type.user && <Streamer streamer={profile} title={title}/>}</div>
                        <div className="row">
                            {

                                vods.length > 0 ? vods.map((vod, i) => (
                                        filter ? <Game vod={vod} title={title} key={i}/> :
                                            <Vod vod={vod} title={title} key={i}/>
                                    )) :
                                    [...Array(12)].map((item, i) => (
                                        <SkeleVodLoading key={i}/>
                                    ))
                            }
                            <Head>
                                <title>{title} Twitch Vods Archive</title>
                                <meta name="description" content="All The Streamers Twitch Vods In One Place"
                                />
                            </Head>
                        </div>
                    </div>
            }
        </div>
    )
}
export default ListContent
