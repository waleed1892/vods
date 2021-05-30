import React from 'react'
import Game from '../../components/Game'
import {SkeleGameListLoading} from '../../global/skleton'
// import {Helmet} from "react-helmet";
import AdSense from "react-adsense";

const Content = (props) => {
    const {games} = props

    return (

        <div className="container">

            <AdSense.Google
                client='ca-pub-3548998999865028'
                slot='8562756152'
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
