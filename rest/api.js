import axios from 'axios';

// import Cookies from "cookies";
// import moment from "moment";
const client_id = '8p0q2xqpeomj5vnsk6gnwbd6msmyst';
const client_secret = 'lwu2v4k930gp20xarh304p985saj9a';
const axiosInstance = axios.create({
    baseURL: 'https://api.twitch.tv/',
    withCredentials: false,
    headers: {
        'Client-Id': client_id,
    }
})
// axios.defaults.withCredentials = false;
// axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? `https://api.vods.tv` : 'https://api.vods.tv';

// axios.defaults.timeout = 5000;

export const getToken = async () => {
    const params = {
        client_secret,
        client_id,
        grant_type: 'client_credentials',
    }
    return await axios.post(`https://id.twitch.tv/oauth2/token?${Object.keys(params).map(key => key + '=' + params[key]).join('&')}`)
        .then(res => res.data);

    // const params = {
    //     client_secret: 'lwu2v4k930gp20xarh304p985saj9a',
    //     grant_type: 'client_credentials',
    //     client_id: '8p0q2xqpeomj5vnsk6gnwbd6msmyst'
    // }
    // return await axios.post(`/api/getToken`, {params})
    //     .then(data => data.data)
    //     .catch(error => {
    //         throw error.response.data
    //     });
}

export const getAccessToken = async (req, res) => {
    const Cookies = await require('cookies');
    const cookies = Cookies(req, res);
    let token = cookies.get('token');
    if (!token) {
        // const moment = await require('moment')
        const moment = await require('dayjs')
        const data = await getToken();
        cookies.set('token', data.access_token, {
            httpOnly: false,
            expires: moment().add(data.expires_in, "milliseconds").toDate()
        })
        token = data.access_token
    }
    return token
}

export const checkToken = async (params) => {
    return await axios.post(`/api/validatetoken`, {params})
        .then(data => data.data)
        .catch(error => {
            throw error.response.data
        });
}

export const getStreamers = async (params) => {
    return await axiosInstance.get(`https://api.twitch.tv/helix/streams?first=${params.first}&after=${params.after}`, {
        headers: {
            Authorization: `Bearer ${params.auth}`
        }
    }).then(res => res.data)
    // return await axios.post(`/api/getStreamers`, {params})
    //     .then(data => data.data)
    //     .catch(error => {
    //         throw error.response.data
    //     });
}

const getGames = async (params) => {
    const games = await axiosInstance.get(`helix/games/top?first=${params.first}&after=${params.after}`, {
        headers: {
            Authorization: `Bearer ${params.auth}`,
        }
    }).then(res => res.data);
    return games
}

export const getLatest = async (params) => {
    // return axiosInstance.get(`kraken/videos/top?sort=time&period=month&first=3`, {
    //     headers: {
    //         Accept: `application/vnd.twitchtv.v5+json`
    //     }
    // }).then(res => res.data)

    const games = await getGames(params)
    const videos = {
        data: [],
        pagination: games.pagination
    };
    const gamesData = games.data;
    for (let i = 0; i < gamesData.length; i++) {
        // const id = gamesData[i].id;
        const name = gamesData[i].name;
        // const gamesVideos = await axiosInstance.get(`helix/videos?sort=views&period=month&first=3&game_id=${id}`, {
        const gamesVideos = await axiosInstance.get(`kraken/videos/top?sort=views&period=month&limit=3&game=${name}`, {
            headers: {
                Accept: `application/vnd.twitchtv.v5+json`
            }
        }).then(res => res.data)
        if (!gamesVideos.vods.length)
            continue
        videos.data.push({game: gamesData[i], vod: gamesVideos.vods});
    }
    return videos


    // return await axios.post(`/api/getLatest`, {params: {...params, client_id: client_id}})
    //     .then(data => data.data)
    //     .catch(error => {
    //         throw error.response.data
    //     });
}

export const getVods = async (params) => {
    return axios.get(`https://api.twitch.tv/kraken/videos/top?limit=20&offset=${params.offset}`, {
        headers: {
            'Client-Id': client_id,
            Accept: `application/vnd.twitchtv.v5+json`
        }
    }).then(res => res.data)
    // return await axios.post(`/api/getVods`, {params})
    //     .then(data => data.data)
    //     .catch(error => {
    //         throw error.response.data
    //     });
}

export const getStreamerVods = async (params) => {
    return axiosInstance.get(`helix/videos?first=20&user_id=${params.user_id}&after=${params.after}`,
        {
            headers: {
                Authorization: `Bearer ${params.auth}`
            }
        }).then(res => res.data)
    // return await axios.post(`/api/getStreamerVods`, {params})
    //     .then(data => data.data)
    //     .catch(error => {
    //         throw error.response.data
    //     });
}

// get video from video Id
export const getVodbyId = async (params) => {
    return axiosInstance.get(`helix/videos?id=${params.id}`, {
        headers: {
            Authorization: `Bearer ${params.auth}`
        }
    }).then(res => res.data)
    // return await axios.post(`/api/getVodbyId`, {params})
    //     .then(data => data.data)
    //     .catch(error => {
    //         throw error.response.data
    //     });
}

// Get stream from username
export const getStreambyUserName = async (params) => {
    return axiosInstance.get(`helix/users?login=${params.user_name}`, {
        headers: {
            Authorization: `Bearer ${params.auth}`
        }
    }).then(res => res.data)
    // return await axios.post(`/api/getStreambyUserName`, {params})
    //     .then(data => data.data)
    //     .catch(error => {
    //         throw error.response.data
    //     });
}

// Get Game from gamename
export const getGameByGameName = async (params) => {
    return axiosInstance.get(`helix/games?name=${params.game_name}`, {
        headers: {
            Authorization: `Bearer ${params.auth}`
        }
    }).then(res => res.data)
    // return await axios.post(`/api/getGameByGameName`, {params})
    //     .then(data => data.data)
    //     .catch(error => {
    //         throw error.response.data
    //     });
}

// Get Videos from gameId
export const getVideosByGameId = async (params) => {
    return axiosInstance.get(`helix/videos?period=month&sort=views&first=20&game_id=${params.game_id}&after=${params.after}`, {
        headers: {
            Authorization: `Bearer ${params.auth}`
        }
    }).then(res => res.data)
    // return await axios.post(`/api/getVideosByGameId`, {params})
    //     .then(data => data.data)
    //     .catch(error => {
    //         throw error.response.data
    //     });
}

// Get Videos from game name
export const getVideosByGameName = async (params) => {
    return await axiosInstance.get(`kraken/videos/top?limit=${params.limit}&offset=${params.after}&game=${params.game}`, {
        headers: {
            Accept: `application/vnd.twitchtv.v5+json`
        }
    })
        .then(data => data.data)
        .catch(error => {
            throw error.response.data
        });
}

// Get Videos from userId
export const getVideosByUserId = async (params) => {
    const streamers = await getStreamers(params)
    const videos = []
    for (const streamer of streamers.data) {
        const userVideos = await axiosInstance.get(`helix/videos?user_id=${streamer.user_id}&first=10`, {
            headers: {
                Authorization: `Bearer ${params.auth}`
            }
        }).then(res => res.data)

        if (userVideos.data.length)
            videos.push(...userVideos.data)
    }
    return {
        data: videos,
        page: streamers.pagination
    }
    // return await axios.post(`/api/getVideosByUserId`, {params})
    //     .then(data => data.data)
    //     .catch(error => {
    //         throw error.response.data
    //     });
}

// Get Videos from userId
export const getGamesTop = async ({first, after, auth}) => {
    return await axiosInstance.get(`helix/games/top?first=${first}&after=${after}`, {
        headers: {
            Authorization: `Bearer ${auth}`
        }
    })
        .then(data => data.data)
        .catch(error => {
            throw error.response.data
        });
    // return await axios.post(`/api/getGamesTop`, {params})
}

// Get Videos from userId
// export const getVodsByClip = async (params) => {
//     return await axios.post(`/api/getVodsByClip`, {params})
//         .then(data => data.data)
//         .catch(error => {
//             throw error.response.data
//         });
// }

// Get Videos from userId
// export const getTopClips = async (params) => {
//     return await axios.post(`/api/getTopClips`, {params})
//         .then(data => data.data)
//         .catch(error => {
//             throw error.response.data
//         });
// }
