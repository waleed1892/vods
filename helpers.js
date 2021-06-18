// calculation duration
import moment from "dayjs";
const duration = require('dayjs/plugin/duration')
moment.extend(duration)
export const calculationDuration = (duration) => {
    let d = Number(duration);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);

    let hDisplay = h > 0 ? h + "h" : "";
    let mDisplay = m > 0 ? m + "m" : "";
    let sDisplay = s > 0 ? s + "s" : "";
    return hDisplay + mDisplay + sDisplay;
}

// calculation created time
export const calculationTime = (published_at) => {
    if (published_at === null) return 'time ago'
    let __startTime = moment(published_at).format();
    let __endTime = moment(new Date()).format();
    let __duration = moment.duration(moment(__endTime).diff(__startTime));
    let __hours = __duration.asHours();
    let duration = (__hours < 24) ? (__hours < 1 ? `${parseInt(60 * __hours)}m` : `${parseInt(__hours)}h`) : `${parseInt(__hours / 24)}d`
    return `${duration} ago`
}
