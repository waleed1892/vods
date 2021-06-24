import React, {useState, useEffect} from 'react'
import dynamic from "next/dynamic";
// import {PlayerSection, StyledSmall, UserSection, VideoPlayer} from '../../components/Player/style'
import {getAccessToken, getVodbyId} from '../../rest/api'
// import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
// import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
// import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Head from "next/head";
import AdSense from "react-adsense";
import {calculationTime} from "../../helpers";
import Link from 'next/link'

const PlayerSection = dynamic(() => import('../../components/Player/style').then(mod => mod.PlayerSection))
const StyledSmall = dynamic(() => import('../../components/Player/style').then(mod => mod.StyledSmall))
const UserSection = dynamic(() => import('../../components/Player/style').then(mod => mod.UserSection))
const VideoPlayer = dynamic(() => import('../../components/Player/style').then(mod => mod.VideoPlayer))
const HistoryRoundedIcon = dynamic(() => import('@material-ui/icons/HistoryRounded'))
const AccountCircleRoundedIcon = dynamic(() => import('@material-ui/icons/AccountCircleRounded'))
const AccessTimeIcon = dynamic(() => import('@material-ui/icons/AccessTime'))
const SkelePlayerLoading = dynamic(() => import('../../global/skleton').then(mod => mod.SkelePlayerLoading))
// import {Helmet} from "react-helmet";


const Player = ({video}) => {
    // let history = useHistory()
    // const { video_id } = useParams();
    const [vod, setVod] = useState(video.data[0])
    // const auth_token = JSON.parse(localStorage.getItem('twitchToken'))['token']

    // useEffect(() => {
    //     if (video_id !== undefined) {
    //         const params = {
    //             auth: auth_token,
    //             client_id: client_id,
    //             id: video_id
    //         }
    //         getVodbyId(params)
    //             .then(data => {
    //                 setVod(JSON.parse(data)['data'][0])
    //             })
    //             .catch(error => console.log(JSON.stringify(error)));
    //     }
    // }, [video_id])

    return (
        <div className="container">
            <Head>
                <title>{vod.user_name}</title>
                <meta name="description" content="All The Streamers Twitch Vods In One Place"
                />
            </Head>
            <div className='mt-2'>
                <AdSense.Google
                    client='ca-pub-3548998999865028'
                    slot='4679830398'
                    style={{display: 'block'}}
                    layout='in-article'
                    format='fluid'
                />
            </div>
            {
                Object.keys(vod).length > 0 ?
                    <PlayerSection>
                        <VideoPlayer>
                            <iframe
                                title={vod.title}
                                src={`https://player.twitch.tv/?video=v${vod.id}&parent=https://www.vods.tv`}
                                height="100%"
                                width="100%"
                                allowFullScreen={true}>
                            </iframe>
                        </VideoPlayer>
                        <div className="mt-2 mb-2">
                            <h4>{vod.title}</h4>
                        </div>
                        <div className="d-flex">
                            <Link href={`/streamer/${vod.user_name}`}>
                                <a>
                                    <UserSection><AccountCircleRoundedIcon/><span
                                        className="ml-1">{vod.user_name}</span></UserSection>
                                </a>
                            </Link>
                            <StyledSmall><HistoryRoundedIcon/><span
                                className="ml-1">{calculationTime(vod.published_at)}</span></StyledSmall>
                            <StyledSmall><AccessTimeIcon/><span className="ml-1">{vod.duration}</span></StyledSmall>
                        </div>
                    </PlayerSection> :
                    <SkelePlayerLoading/>
            }
            <div className='mt-2'>
                <AdSense.Google
                    client='ca-pub-3548998999865028'
                    slot='8614727048'
                    style={{display: 'block'}}
                    layout='in-article'
                    format='fluid'
                />
            </div>
        </div>
    )
}

export default Player

export async function getServerSideProps(ctx) {
    const {req, res} = ctx
    const {id} = ctx.params
    const token = await getAccessToken(req, res)
    const params = {
        auth: token,
        id: id
    }
    const data = await getVodbyId(params)
    return {
        props: {
            video: data
        }, // will be passed to the page component as props
    }
}
