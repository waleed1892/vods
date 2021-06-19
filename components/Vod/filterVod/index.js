import React from 'react'
import {StyledP, StyledSmall, StyledSpan, UserSection} from './style'
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

// import defaultImg from '../../../public/defaultImg.jpg'
import Image from "next/image";
import Link from 'next/link'
import {calculationDuration, calculationTime} from "../../../helpers";


const FilterVod = (props) => {
    const {vod, title} = props
    // let history = useHistory()
    // thumb url convert
    const imgUrlConvert = (url) => {
        let string = url.replace('{width}', '260')
        string = string.replace('{height}', '150')
        return (vod.thumbnail_url !== "") ? string : '/defaultImg.jpg'
    }

    return (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
            <Link href={`/video/${vod._id.replace('v', '')}`}>
                <a>
                    <Image loading={"eager"} src={imgUrlConvert(vod['preview'].template)} layout={"responsive"}
                           width={500} height={280}
                           alt={vod.title} className="rounded w-100"/>
                    {title === "Most viewed" && <StyledSpan>{vod.views} views</StyledSpan>}
                </a>
            </Link>
            <div>
                <StyledP>{vod.title}</StyledP>
                <div className="d-flex flex-wrap">
                    <Link href={`/streamer/${vod.channel.name}`}>
                        <a>
                            <UserSection><AccountCircleRoundedIcon/><span
                                className="ml-1">{vod['channel'].name}</span></UserSection>
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

export default FilterVod
