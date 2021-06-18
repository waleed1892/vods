import React from 'react'
// import defaultImg from '../../../public/streamer.png'
// import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import Image from "next/image";
import Link from 'next/link'

export const StyledP = styled.p`
    color: black;
    font-size: 1.1rem;
    font-weight: bold;
    margin: 5px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    word-break:break-all;
`;

const Game = (props) => {
    const {game} = props

    // thumb url convert
    const imgUrlConvert = (url) => {
        let string = url.replace('{width}', '136')
        string = string.replace('{height}', '190')
        return (game.box_art_url !== "") ? string : '/streamer.png'
    }

    return (
        <Link href={`/games/${game.name}`}>
            <a className="col-sm-3 col-md-3 col-lg-3 mb-3 text-decoration-none">
                <div style={{width: 136, height: 190}}
                     className="d-flex align-items-center justify-content-center position-relative mx-auto">
                    <Image loading={"eager"} src={imgUrlConvert(game.box_art_url)} alt={game.name} layout={"fill"}
                           className="rounded"/>
                </div>
                <StyledP>&nbsp;{game.name}</StyledP>
            </a>
        </Link>
    )
}

export default Game
