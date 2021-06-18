import React from 'react'
import styled from 'styled-components';
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
// import defaultImg from '../../public/streamer.png'
// import {useHistory} from "react-router-dom";
import Image from "next/image";
import Link from 'next/link'


const StyledH1 = styled.div`
    color: black;
    font-weight: bold;
    display: flex;
    font-size: 1.1rem;
    & span {
        word-break: break-all
    }
`;

const StyledSmall = styled.small`
    color: #6c757d;
    margin-right: 5px;
    display: flex;
    align-items: center;
    svg {
        width: 0.8em;
        height: 0.8em;
    }
`;

const Streamer = (props) => {
    // let history = useHistory()
    const {streamer} = props

    return (
        <Link href={`/streamer/${streamer.user_name}`}>
            <a className="col-lg-2 col-md-3 col-sm-4 mb-3 text-decoration-none">
                <div className="p-2">
                    <Image src='/streamer.png' layout={"responsive"} width={'100%'} height={'auto'} alt={streamer.user_name}
                           className="rounded w-100"/>
                </div>
                <div>
                    <StyledH1><AccountCircleRoundedIcon/><span className="ml-1">{streamer.user_name}</span></StyledH1>
                    <StyledSmall><HistoryRoundedIcon/><span className="ml-1">{streamer.viewer_count}</span></StyledSmall>
                </div>
            </a>
        </Link>
    )
}

export default Streamer
