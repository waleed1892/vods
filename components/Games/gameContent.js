import React from 'react'
import {PageTitleSection} from './style'
import Game from '../../components/Game'
import {SkeleGameListLoading} from '../../global/skleton'
// import {Helmet} from "react-helmet";
import Head from "next/head";
import {StyledDiv} from "../ListContent/style";
import AdSense from "react-adsense";

const Content = (props) => {
    const {games} = props

    return (

        <div className="container">
            <PageTitleSection>
                <h1>Trending Twitch Vods By Games</h1>
                <div style={{flexBasis: '100%', height: 0}}></div>
                <h2>Best Streaming Service</h2>
            </PageTitleSection>
            <AdSense.Google
                client='ca-pub-3548998999865028'
                slot='79915789369'
                style={{display: 'block'}}
                layout='in-article'
                format='fluid'
            />
            <div className="mt-3">
            </div>

            <div className="mt-3">
                <div className="row">
                    {

                        games.length > 0 ? games.map((game, i) => (
                                <Game game={game} key={i}/>
                            )) :
                            [...Array(12)].map((item, i) => (
                                <SkeleGameListLoading key={i}/>
                            ))

                    }
                </div>
            </div>
        </div>
    )
}


export default Content
