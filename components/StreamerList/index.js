import React from 'react'
import dynamic from "next/dynamic";

const Streamer = dynamic(() => import('./streamer'))
const SkeleStreamLoading = dynamic(() => import('../../global/skleton').then(mod => mod.SkeleStreamLoading));
import styled from 'styled-components';
import AdSense from "react-adsense";

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
                <h1>Streamers – Twitch Vods</h1>
                <div style={{flexBasis: '100%', height: 0}}></div>
                <p>We made picking a Vod an easy decision! You know what you like, and we are here to bring you exactly
                    what you want to watch. Choose the next Twitch Vods you watch by sorting through your favorite
                    streamers. Each stream has their Twitch Name available alongside an image and their follower
                    count!</p>
            </StyledDiv>
            <AdSense.Google
                client='ca-pub-3548998999865028'
                slot='1263329565'
                style={{display: 'block'}}
                layout='in-article'
                format='fluid'
            />
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
