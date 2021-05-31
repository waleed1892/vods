import React from 'react'
// import defaultImg from '../../public/streamer.png'
import {StyledP} from './style'
import {useRouter} from "next/router";
// import { useHistory } from "react-router-dom";
import Image from "next/image";


const Game = (props) => {
    const {game} = props
    // let history = useHistory()
    const router = useRouter()
    // thumb url convert
    const imgUrlConvert = (url) => {
        let string = url.replace('{width}', '136')
        string = string.replace('{height}', '190')
        return (game.box_art_url !== "") ? string : '/streamer.png'
    }

    const goVods = (name) => {
        router.push(`/games/${name}`)
    }

    return (
        <div className="col-sm-4 col-md-3 col-lg-2 mb-3" style={{cursor: "pointer"}} onClick={() => goVods(game.name)}>
            <div>
                <Image src={imgUrlConvert(game.box_art_url)} layout={"responsive"} width={136} height={190}
                       alt={game.name} className="rounded w-100"/>
            </div>
            <StyledP>&nbsp;{game.name}</StyledP>
        </div>
    )
}

export default Game
