import React from 'react'
import Streamer from './streamer'
import {SkeleStreamLoading} from '../../global/skleton';
import styled from 'styled-components';

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #9146ff;
    color: #fff;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    padding: 10px 14px;
    font-size: 1.2rem;
    border-radius: 5px;
    margin: 10px 0px;
    text-align: center;
    flex-wrap: wrap;
`;

const StreamerList = (props) => {
    const {streamers} = props

    return (
        <div className="container">
            <StyledDiv>
                <h1>Twitch Streamers</h1>
                <div style={{flexBasis: '100%', height: 0}}></div>
                <h2>Best Streaming Service</h2>
            </StyledDiv>
            <div className="mt-3">
                <div className="row">
                    {
                        streamers && streamers.length > 0 ? streamers.map((streamer, i) => (
                                <Streamer streamer={streamer} key={i}/>
                            )) :
                            [...Array(20)].map((item, i) => (
                                <SkeleStreamLoading key={i}/>
                            ))

                    }
                </div>
            </div>
        </div>
    )
}

export default StreamerList