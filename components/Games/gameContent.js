import React from 'react'
import AdSense from "react-adsense";
import dynamic from "next/dynamic";

const SkeleGameListLoading = dynamic(() => import('../../global/skleton').then(mod => mod.SkeleGameListLoading))
const Game = dynamic(() => import('../../components/Game'))
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
            <div className="row mt-3">
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
    )
}


export default Content
