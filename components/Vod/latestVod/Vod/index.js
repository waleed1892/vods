import React from 'react'
import {StyledP, StyledSmall, UserSection} from './style'
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Link from 'next/link'
// import defaultImg from '../../../../public/defaultImg.jpg'
// import { useHistory } from "react-router-dom";
import Image from "next/image";
import {calculationDuration, calculationTime} from "../../../../helpers";

const Vod = (props) => {
    const {vod} = props
    // let history = useHistory()
    // thumb url convert
    const imgUrlConvert = (url) => {
        let string = vod.preview.template
        string = string.replace('{width}', '260')
        string = string.replace('{height}', '150')
        return (vod.preview.template !== "https://vod-secure.twitch.tv/_404/404_processing_{width}x{height}.png") ? string : '/defaultImg.jpg'
        // let string = url.replace('%{width}', '500')
        // string = string.replace('%{height}', '280')
        // return (vod.thumbnail_url !== "") ? string : '/defaultImg.jpg'
    }

    return (
        <div className="col-sm-3 col-md-3 col-lg-3 mb-3">
            <Link href={`/video/${vod._id.replace('v', '')}`}>
                <a>
                    <Image loading={"eager"} src={imgUrlConvert(vod.preview.template)} layout={"responsive"} width={500}
                           height={280}
                           alt={vod.title}
                           className="rounded w-100"/>
                </a>
            </Link>
            <div>
                <StyledP>{vod.title}</StyledP>
                <div className="d-flex flex-wrap">
                    <Link href={`/streamer/${vod.channel.display_name}`}>
                        <a>
                            <UserSection><AccountCircleRoundedIcon/><span
                                className="ml-1">{vod.channel.display_name}</span></UserSection>
                        </a>
                    </Link>
                    <StyledSmall><HistoryRoundedIcon/><span className="ml-1">{calculationTime(vod.published_at)}</span></StyledSmall>
                    <StyledSmall><AccessTimeIcon/><span
                        className="ml-1">{calculationDuration(vod.length)}</span></StyledSmall>
                </div>
            </div>
        </div>
    )
}

export default Vod
