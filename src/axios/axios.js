// Axios Import
import axios from 'axios'


export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

export const api2 = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NEXT_URL
})



export const getVideosPage = async ( pageParam = 1, options = {} ) => {
    const response = await api.get(`/store/videos/?page=${pageParam}`, options)
    return response.data.results
}


export const getCurrentVideo = async ( videoDetails ) => {
    console.log("axios video details query:", videoDetails)
    const slug = videoDetails?.queryKey[1]?.slug
    const video_username = videoDetails?.queryKey[1]?.username
    const response = await api.get(`/store/videos/?slug=${slug}&video_username=${video_username}`)
    return response.data.results[0]
}


export const getCurrentVideoUserProfile = async (user_id) => {
    const currentVideoUserID = user_id?.queryKey[1]
    const response = await api.get(`/store/user-profile/?user=${currentVideoUserID}`)
    return response.data[0]
}


export const getCurrentVideoStreamingLinks = async (links_id) => {
    const currentVideoStreamingLinks = links_id?.queryKey[1]
    const response = await api.get(`/store/streaming-link/?streaming_links=${currentVideoStreamingLinks}`)
    return response.data
}


export const getCurrentVideoProduct = async (product_id) => {
    const currentVideoProduct = product_id?.queryKey[1]
    const response = await api.get(`/store/products/${currentVideoProduct}/`)
    return response.data
}


export const getCurrentVideoLyrics = async (lyrics_id) => {
    const currentVideoLyrics = lyrics_id?.queryKey[1]
    const response = await api.get(`/store/lyrics/${currentVideoLyrics}/`)
    return response.data
}


export const getCurrentVideoLyricsVerses = async (lyrics_id) => {
    const currentVideoLyricsID = lyrics_id?.queryKey[1]
    const response = await api.get(`/store/lyrics-verse/?lyrics=${currentVideoLyricsID}`)
    return response.data
}


export const getCurrentVideoSkizaTuneList = async (skiza_id) => {
    const currentVideoSkizaID = skiza_id?.queryKey[1]
    const response = await api.get(`/store/skiza-tune/?skiza_tune=${currentVideoSkizaID}`)
    return response.data
}


export const getCurrentVideoAlbum = async (album_id) => {
    const currentVideoAlbumID = album_id?.queryKey[1]
    const response = await api.get(`/store/album/${currentVideoAlbumID}/`)
    return response.data
}


export const getCurrentVideoAlbumTracks = async (album_id) => {
    const currentVideoAlbumID = album_id?.queryKey[1]
    const response = await api.get(`/store/album-track/?album=${currentVideoAlbumID}`)
    return response.data
}


export const getCurrentVideoEvents = async (user_id) => {
    const currentVideoUserID = user_id?.queryKey[1]
    const response = await api.get(`/store/events/?user=${currentVideoUserID}`)
    return response.data
}


export const getCurrentVideoMediaTours = async (user_id) => {
    const currentVideoUserID = user_id?.queryKey[1]
    const response = await api.get(`/store/media-tour/?user=${currentVideoUserID}`)
    return response.data
}


export const getCurrentEvent = async ( event_id ) => {
    const eventID = event_id?.queryKey[1]
    const response = await api.get(`/store/events/${eventID}/`)
    return response.data
}


export const addView = async ({ip_address, country, ...newView}) => {
    const response = await api.post(`/store/views/?country=${country}&IP=${ip_address}`, newView)
    return response.data
}

export const addStreamingLinkView = async ({ip_address, country, ...newStreamingLinkView}) => {
    const response = await api.post(`/store/streaming-views/?country=${country}&IP=${ip_address}`, newStreamingLinkView)
    return response.data
}

export const addDefaultStreamingLinkView = async ({ip_address, country, ...newStreamingLinkView}) => {
    const response = await api.post(`/store/default-streaming-views/?country=${country}&IP=${ip_address}`, newStreamingLinkView)
    return response.data
}

export const addProductView = async ({ip_address, country, ...newProductView}) => {
    const response = await api.post(`/store/product-views/?country=${country}&IP=${ip_address}`, newProductView)
    return response.data
}

export const addEventView = async ({ip_address, country, ...newEventView}) => {
    const response = await api.post(`/store/event-views/?country=${country}&IP=${ip_address}`, newEventView)
    return response.data
}


export const getUpsellProducts = async (user_id) => {
    const userID = user_id?.queryKey[1]
    const response = await api.get(`/store/products/?user=${userID}`)
    return response.data
}


export const getUpsellEvents = async (user_id) => {
    const userID = user_id?.queryKey[1]
    const response = await api.get(`/store/events/?user=${userID}`)
    return response.data
}


export const getProductByCategory = async (category) => {
    const productCategory = category?.queryKey[1]
    const response = await api.get(`/store/products/?user=&product_category=${productCategory}`)
    return response.data
}


export const getFeaturedEvents = async () => {
    const response = await api.get(`/store/events/?is_featured=true`)
    return response.data
}


export const getEventByCategory = async (category) => {
    const eventCategory = category?.queryKey[1]
    const response = await api.get(`/store/events/?event_category=${eventCategory}`)
    return response.data
}


export const registerAccount = async ( newAccount ) => {
    await api.post(`/auth/users/`, newAccount)
}


export const loginUser = async (loginInfo) => {
    const response = await api.post(`/auth/jwt/create`, loginInfo)
    return response.data
}

export const getRefreshToken = async () => {
    const response = await api2.get(`/api/hello`)
    return response.data.token
}

export const renewAccessToken = async (currentRefreshToken) => {
    const refreshToken = currentRefreshToken?.queryKey[1]
    const response = await api.post(`/auth/jwt/refresh/`, refreshToken)
    return response.data
}


export const getCurrentUser = async ( token ) => {
    const accessToken = token?.queryKey[1]
    const response = await api.get(`/auth/users/me/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken 
        }
    })
    return response.data
}


export const getUserProfile = async ( userID ) => {
    const currentUserId = userID?.queryKey[1]
    const response = await api.get(`/store/user-profile/?user=${currentUserId}`)
    return response.data
}


export const updateProfile = async ({ id, accessToken, ...profileInfo }) => {
    const user_id = id
    const acccess_token = accessToken
    const profile_info = profileInfo
    const response = await api.patch(`/store/user-profile/${user_id}/` , profile_info, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: acccess_token
        }
    })
    return response.data
}

export const searchPageProfileLink = async (searchParams) => {
    const searchTerm = searchParams?.queryKey[1]
    const response = await api.get(`/store/user-profile/?search=${searchTerm}`)
    return response.data[0]
}

export const searchVideos = async ( searchParams ) => {
    const searchTerm = searchParams?.queryKey[1]
    const response = await api.get(`/store/video-results-no-pagination/?search=${searchTerm}&limit=20`)
    return response.data.results
}


export const searchProducts = async ( searchParams ) => {
    const searchTerm = searchParams?.queryKey[1]
    const response = await api.get(`/store/products-results-offset/?search=${searchTerm}&limit=20`)
    return response.data.results
}


export const searchEvents = async ( searchParams ) => {
    const searchTerm = searchParams?.queryKey[1]
    const response = await api.get(`/store/events-results-offset/?search=${searchTerm}&limit=20`)
    return response.data.results
}

export const profilePage = async (profileUsername) => {
    const profile_username = profileUsername?.queryKey[1]
    const response = await api.get(`/store/user-profile/?username=${profile_username}`)
    return response.data[0]
}

export const profileVideos = async ( userID ) => {
    const user_id = userID?.queryKey[1]
    const response = await api.get(`/store/video-results-no-pagination/?user=${user_id}&limit=20`)
    return response.data.results
}

export const profileProducts = async ( userID ) => {
    const user_id = userID?.queryKey[1]
    const response = await api.get(`/store/products-results-offset/?user=${user_id}&limit=20`)
    return response.data.results
}

export const profileEvents = async ( userID ) => {
    const user_id = userID?.queryKey[1]
    const response = await api.get(`/store/events-results-offset/?user=${user_id}&limit=20`)
    return response.data.results
}

export const profileMediaTours = async (userID) => {
    const user_id = userID?.queryKey[1]
    const response = await api.get(`/store/media-tour-offset/?user=${user_id}&limit=20`)
    return response.data.results
}