import React from 'react'
// import defaultImg from '../../public/streamer.png'
import {StyledP} from './style'
// import {useRouter} from "next/router";
import Link from 'next/link'
// import { useHistory } from "react-router-dom";
import Image from "next/image";


const Game = (props) => {
    const {game} = props
    // let history = useHistory()
    // const router = useRouter()
    // thumb url convert
    const imgUrlConvert = (url) => {
        let string = url.replace('{width}', '100')
        string = string.replace('{height}', '150')
        return (game.box_art_url !== "") ? string : '/streamer.png'
    }

    // const goVods = (name) => {
    //     router.push()
    // }

    return (
        <Link href={`/games/${game.name}`}>
            <a className="col-sm-4 col-md-3 col-lg-2 mb-3 text-decoration-none">
                <Image loading={"eager"} src={imgUrlConvert(game.box_art_url)} layout={"responsive"} width={136} height={190}
                       alt={game.name} className="rounded w-100"/>
                <StyledP>&nbsp;{game.name}</StyledP>
            </a>
        </Link>
    )
}

export default Game
