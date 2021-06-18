import React from 'react'
import {StyledP, StyledSmall, StyledSpan, UserSection} from './style'
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
// import defaultImg from '../../../public/defaultImg.jpg'
// import { useHistory } from "react-router-dom";
import Image from "next/image";
import Link from 'next/link'
import {calculationDuration, calculationTime} from "../../../helpers";


const Vod = (props) => {
    const {vod, title} = props
    // let history = useHistory()=
    // thumb url convert
    const imgUrlConvert = (vod) => {
        let string = ''
        if ('thumbnail_url' in vod) {
            string = vod.thumbnail_url
            string = string.replace('%{width}', '260')
            string = string.replace('%{height}', '150')
            return (vod.thumbnail_url !== "") ? string : '/defaultImg.jpg'
        } else {
            string = vod.preview.template
            string = string.replace('{width}', '260')
            string = string.replace('{height}', '150')
            return (vod.preview.template !== "https://vod-secure.twitch.tv/_404/404_processing_{width}x{height}.png") ? string : '/defaultImg.jpg'
        }
    }

    return (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
            <Link href={`/video/${vod.id || vod._id.replace('v', '')}`}>
                <a>
                    <Image loading={"eager"} src={imgUrlConvert(vod)}
                           layout={"responsive"} width={500} height={280}
                           alt={vod.title} className="rounded w-100"/>
                    {title === "Most viewed" && <StyledSpan>{vod.views} views</StyledSpan>}
                </a>
            </Link>
            <div>
                <StyledP>{vod.title}</StyledP>
                <div className="d-flex flex-wrap">
                    <Link href={`/streamer/${vod.user_name || vod.channel.display_name}`}>
                        <a>
                            <UserSection><AccountCircleRoundedIcon/><span
                                className="ml-1">{vod.user_name || vod.channel.display_name}</span></UserSection>
                        </a>
                    </Link>
                    <StyledSmall><HistoryRoundedIcon/><span className="ml-1">{calculationTime(vod.published_at)}</span></StyledSmall>
                    <StyledSmall><AccessTimeIcon/><span
                        className="ml-1">{vod.duration || calculationDuration(vod.length)}</span></StyledSmall>
                </div>
            </div>
        </div>
    )
}

export default Vod
