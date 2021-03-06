import React from 'react'
import styled from 'styled-components';
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
// import defaultImg from '../../public/streamer.png'
// import {useRouter} from "next/router";
// import { useHistory } from "react-router-dom";
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
        <div className="col-lg-2 col-md-3 col-sm-4 mb-3">
            <Link href={`/streamer/${streamer.login}`}>
                <a className='text-decoration-none'>
                    <div className="p-2">
                        <Image src='/streamer.png' layout={"responsive"} width={'100%'} height={'auto'} alt={'search'}
                               className="rounded w-100"/>
                    </div>
                    <div>
                        <StyledH1><AccountCircleRoundedIcon/><span className="ml-1">{streamer.login}</span></StyledH1>
                        <StyledSmall><HistoryRoundedIcon/><span
                            className="ml-1">{streamer.view_count}</span></StyledSmall>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default Streamer
