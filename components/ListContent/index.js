import React from 'react'
import Game from '../Vod/filterVod'
import Vod from '../Vod/streamerVod'
import GameList from '../Game'
import Streamer from '../StreamerList/searchStreamer'
import LatestVod from '../Vod/latestVod'
import {SkeleLatestLoading, SkeleVodLoading} from '../../global/skleton';
import Head from "next/head";
import AdSense from "react-adsense";

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
