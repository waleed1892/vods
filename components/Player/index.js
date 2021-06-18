import React, {useEffect, useState} from 'react'
import {Helmet} from "react-helmet";
import AdSense from "react-adsense";
import dynamic from "next/dynamic";
import {PlayerSection, StyledSmall, UserSection, VideoPlayer} from './style'
import {getVodbyId} from '../../rest/api'
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {calculationTime} from "../../helpers";

const SkelePlayerLoading = dynamic(() => import('../../global/skleton').then(mod => mod.SkelePlayerLoading))


const Player = () => {
    // let history = useHistory()
    // const { video_id } = useParams();
    const [vod, setVod] = useState({})
    const auth_token = JSON.parse(localStorage.getItem('twitchToken'))['token']

    useEffect(() => {
        if (video_id !== undefined) {
            const params = {
                auth: auth_token,
                id: video_id
            }
            getVodbyId(params)
                .then(data => {
                    setVod(JSON.parse(data)['data'][0])
                })
                .catch(error => console.log(JSON.stringify(error)));
        }
    }, [video_id])

    const goVods = (user_name) => {
        // history.push(`/streamer/${user_name}`)
    }

    return (
        <div className="container">
            <AdSense.Google
                client='ca-pub-3548998999865028'
                slot='8898003939'
                style={{display: 'block'}}
                layout='in-article'
                format='fluid'
            />
            {
                Object.keys(vod).length > 0 ?
                    <PlayerSection>
                        <VideoPlayer>
                            <iframe
                                title={vod.title}
                                src={`https://player.twitch.tv/?video=v${vod.id}&parent=www.vods.tv&parent=vods.tv`}
                                height="100%"
                                width="100%"
                                allowFullScreen={true}>
                            </iframe>
                        </VideoPlayer>
                        <div className="mt-2 mb-2">
                            <h4>{vod.title}</h4>
                        </div>
                        <div className="d-flex">
                            <UserSection onClick={() => goVods(vod.user_name)}><AccountCircleRoundedIcon/><span
                                className="ml-1">{vod.user_name}</span></UserSection>
                            <StyledSmall><HistoryRoundedIcon/><span
                                className="ml-1">{calculationTime(vod.published_at)}</span></StyledSmall>
                            <StyledSmall><AccessTimeIcon/><span className="ml-1">{vod.duration}</span></StyledSmall>
                        </div>
                    </PlayerSection> :
                    <SkelePlayerLoading/>
            }

            <Helmet>
                <title>{vod.user_name}</title>
                <meta name="description" content="All The Streamers Twitch Vods In One Place"
                />
            </Helmet>


        </div>
    )
}

export default Player
