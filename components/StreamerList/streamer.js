import React from 'react'
import styled from 'styled-components';
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import defaultImg from '../../assets/streamer.png'
import {useRouter} from "next/router";
// import {useHistory} from "react-router-dom";

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
    const router = useRouter()

    const goVods = (user_name) => {
        router.push(`/streamer/${user_name}`)
    }

    return (
        <div className="col-lg-2 col-md-3 col-sm-4 mb-3" onClick={() => goVods(streamer.user_name)}
             style={{cursor: "pointer"}}>
            <div className="p-2">
                <img loading={"lazy"} src={defaultImg} alt={streamer.user_name} className="rounded w-100"/>
            </div>
            <div>
                <StyledH1><AccountCircleRoundedIcon/><span className="ml-1">{streamer.user_name}</span></StyledH1>
                <StyledSmall><HistoryRoundedIcon/><span className="ml-1">{streamer.viewer_count}</span></StyledSmall>
            </div>
        </div>
    )
}

export default Streamer
