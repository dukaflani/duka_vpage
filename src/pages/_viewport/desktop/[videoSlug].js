// React Imports
import { useState, useEffect } from 'react';

// Nextjs Imports
import Head from 'next/head'
import Image from "next/legacy/image";
import { useRouter } from 'next/router';

//  Mui Imports
import { Avatar, Box, Card, colors, Container, Divider, Grid, Button, Stack, Typography,
    CardContent, CardActionArea, Tooltip, Tabs, Tab, Paper, Link, Skeleton, useMediaQuery } from '@mui/material'

// TanStack/React-Query
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// NPM Imports
import { useDispatch, useSelector } from 'react-redux';
import numeral from 'numeral';
import Linkify from 'react-linkify';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Icons
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import PhonelinkRingOutlinedIcon from '@mui/icons-material/PhonelinkRingOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CastConnectedOutlinedIcon from '@mui/icons-material/CastConnectedOutlined';
import { RadioOutlined } from '@mui/icons-material';


// Components
import NavigationLayout2 from '@/layout/desktop/NavigationLayout2'
import TabStreamingLinks from '@/components/reusableComponents/TabStreamingLinks';
import TabProductCard from '@/components/reusableComponents/TabProductCard';
import TabLyricsCard from '@/components/reusableComponents/TabLyricsCard';
import TabSkizaCards from '@/components/reusableComponents/TabSkizaCards';
import TabAlbumCard from '@/components/reusableComponents/TabAlbumCard';
import TabEventsCards from '@/components/reusableComponents/TabEventsCards';
import TabMediaTourCard from '@/components/reusableComponents/TabMediaTourCard';

// Project Imports
import adposter from '../../../../public/assets/media/dukaflani-advert-poster.jpg'
import { getCurrentVideo, getCurrentVideoUserProfile, getCurrentVideoStreamingLinks, 
    getCurrentVideoProduct, getCurrentVideoLyrics, getCurrentVideoLyricsVerses,
    getCurrentVideoSkizaTuneList, getCurrentVideoAlbum, getCurrentVideoAlbumTracks,
    getCurrentVideoEvents, getCurrentVideoMediaTours, addView } from '@/axios/axios';
import { pageHasChanged, removeRefferalURL } from '@/redux/features/navigation/navigationSlice';



const CurrentVideo = ({ setIsDarkMode, isDarkMode, value, setValue, ssrVideoDetails, ssrUserSubdomain, ssrVideoSlug }) => {
    // const currentLoggedInUser = useSelector((state) => state.auth.userInfo)
    // const userCountry = useSelector((state) => state.auth.country)
    // const userIpAddress = useSelector((state) => state.auth.ip_address) 
    const referralURL = useSelector((state) => state.navigation.referralURL)
    const isRegularPageView = useSelector((state) => state.navigation.isRegularView)
    // const pageIsReffered = useSelector((state) => state.navigation.referredView)
    const is_darkMode = useSelector((state) => state.theme.isDarkMode)
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const router = useRouter()
    const dispatch = useDispatch()
    const { videoSlug, UserCountry, UserIP, hostURL  } = router.query
    // const pathName = router.pathname
    const [tabPosition, setTabPosition] = useState(0)
    const [showMoreText, setShowMoreText] = useState(false)
    const [linkCopied, setLinkCopied] = useState(false)
    const [shareButtonText, setShareButtonText] = useState('Share')
    const [numberOfLikes, setNumberOfLikes] = useState('') 
    const [numberOfUnlikes, setNumberOfUnlikes] = useState('')  
    const [is_liked, setIs_liked] = useState(false)
    const [is_unliked, setIs_unliked] = useState(false)
    const [user_country, setUser_country] = useState(null)
    const [user_ip, setUser_ip] = useState(null)
    const [referrer_url, setReferrer_url] = useState(null)

    const userSubDomainRaw = hostURL?.split(".")[0]
    const userSubdomain = userSubDomainRaw == "www" ? hostURL?.split(".")[1] : userSubDomainRaw

    
    useEffect(() => {
        if (linkCopied) {
            setShareButtonText('Copied!')
            setTimeout(() => {
                setShareButtonText('Share')
                setLinkCopied(false)
            }, 2000);    
        }
    }, [linkCopied])
    
    useEffect(() => {
        if (referralURL?.split(".")?.includes("dukaflani") || isRegularPageView === true ) {
            setUser_country(UserCountry)
            setUser_ip(UserIP)
            setReferrer_url(null)  
        } else {
            setUser_country(UserCountry)
            setUser_ip(UserIP)
            setReferrer_url(referralURL)
        }
      }, [referralURL, UserCountry, UserIP, isRegularPageView])
    
    
    const handleChange = (event, newValue) => {
        setTabPosition(newValue);
    };
    
    // const videoDetails = {
    //   slug: "goosebumps",
    //   username: "sammyboytest" 
    // }
    const videoDetails = {
      slug: videoSlug, 
      username: userSubdomain
    }
    
    const queryClient = useQueryClient()
    const { data, isLoading: loading_current_video } = useQuery(["current-video", videoDetails], (videoDetails) => getCurrentVideo(videoDetails))
    
    // Referral Views
    const newView = { 
        video: data?.id,
        ip_address: user_ip,
        country: user_country,
        referral_url: referrer_url,
        video_profile: data?.customuserprofile,
      }


  const { mutate: addViewFromReferral } = useMutation(addView, { 
    onSuccess: (data, _variables, _context) => {
      queryClient.invalidateQueries(["videos-list"])
      queryClient.invalidateQueries(["current-video", data.youtube_id])
      setReferrer_url(null)
    },
    onError: (error, _variables, _context) => {
        // console.log("referrer error:", error)
    }
   })

   const handleReferredView = () => {
        addViewFromReferral(newView)
   }
   

   useEffect(() => {
    const addMyReferralView = () => {
        if (referrer_url?.length > 1 && data?.id >= 1 && data?.customuserprofile >= 1 && user_ip?.length > 1 && user_country?.length > 1) {
            handleReferredView()
        }
    };
    addMyReferralView();
   }, [referrer_url, data?.id, data?.customuserprofile, user_ip, user_country])
   
   

    
    const videoProfileUserID = data?.user 
    const { data: profile, isLoading, isFetching } = useQuery(["current-video-profile", videoProfileUserID], (videoProfileUserID) => getCurrentVideoUserProfile(videoProfileUserID), {
        enabled: !!videoProfileUserID
    })
    
    const videoLinksID = data?.links 
    const { data: streamingLinks, isLoading: loadingLinks } = useQuery(["current-video-streaming-links", videoLinksID], (videoLinksID) => getCurrentVideoStreamingLinks(videoLinksID), {
        enabled: !!videoLinksID
    })
    
    const videoProductID = data?.product
    const { data: product, isLoading: loadingProduct } = useQuery(["current-video-product", videoProductID], (videoProductID) => getCurrentVideoProduct(videoProductID), {
        enabled: !!videoProductID
    })
    
    const videoLyricsID = data?.lyrics 
    const { data: lyrics, isLoading: loadingLyrics } = useQuery(["current-video-lyrics", videoLyricsID], (videoLyricsID) => getCurrentVideoLyrics(videoLyricsID), {
        enabled: !!videoLyricsID
    })
    
    const videoLyricsVersesID = data?.lyrics 
    const { data: lyrics_verses, isLoading: loadingLyricVerse } = useQuery(["current-video-lyrics-verses", videoLyricsVersesID], (videoLyricsVersesID) => getCurrentVideoLyricsVerses(videoLyricsVersesID), {
        enabled: !!videoLyricsVersesID
    })
    
    const videoSkizaID = data?.skiza 
    const { data: skiza_list, isLoading: loadingSkiza } = useQuery(["current-video-skiza-list", videoSkizaID], (videoSkizaID) => getCurrentVideoSkizaTuneList(videoSkizaID), {
        enabled: !!videoSkizaID
    })
    
    const videoAlbumID = data?.album 
    const { data: album, isLoading: loadingAlbum } = useQuery(["current-video-album", videoAlbumID], (videoAlbumID) => getCurrentVideoAlbum(videoAlbumID), {
        enabled: !!videoAlbumID
    })
    
    const videoAlbumTracksID = data?.album 
    const { data: albumTracks, isLoading: loadingTracks } = useQuery(["current-video-album-tracks", videoAlbumTracksID], (videoAlbumTracksID) => getCurrentVideoAlbumTracks(videoAlbumTracksID), {
        enabled: !!videoAlbumTracksID
    })
    
    const videoUserID = data?.user 
    const { data: events, isLoading: loadingEvents } = useQuery(["current-video-events", videoUserID], (videoUserID) => getCurrentVideoEvents(videoUserID), {
        enabled: !!videoUserID
    })
    const { data: mediaTours, isLoading: loadingMediaTours } = useQuery(["current-video-media-tours", videoUserID], (videoUserID) => getCurrentVideoMediaTours(videoUserID), {
        enabled: !!videoUserID
    })


    const rawFanBaseCount = profile?.fanbase_count ? profile?.fanbase_count : 0
    let formatedFanBaseCount = ''
    rawFanBaseCount < 1000 || rawFanBaseCount % 10 === 0 ? formatedFanBaseCount = numeral(rawFanBaseCount).format('0a') :  formatedFanBaseCount = numeral(rawFanBaseCount).format('0.0a')

    const rawLikesCount = data?.like_count ? data?.like_count : 0
    let formatedLikesCount = ''
    rawLikesCount < 1000 || rawLikesCount % 10 === 0 ? formatedLikesCount = numeral(rawLikesCount).format('0a') :  formatedLikesCount = numeral(rawLikesCount).format('0.0a')

    const desc = data?.description
    const hashTags = desc?.split(' ')
    const hashTagRegex = /#[a-z0-9_]+/gi 

  return (
    <Paper>
        <NavigationLayout2 setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} >
            <Head>
                <title>{`${ssrVideoDetails?.title} - Dukaflani`}</title>
                <meta name="title" content={`${ssrVideoDetails?.title} - Dukaflani`} />
                <meta name="description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
                <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>

                
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={`https://${ssrUserSubdomain}.duka.to/${ssrVideoSlug}`} />
                <meta property="og:title" content={`${ssrVideoDetails?.title} - Dukaflani`} />
                <meta property="og:description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
                <meta 
                    property="og:image" 
                    // content={`${process.env.NEXT_PUBLIC_NEXT_URL}/api/og?stage_name=${ssrVideoDetails?.stage_name}&fanbase_count=${videoProfile?.fanbase_count}&song_title=${ssrVideoDetails?.song_title}&video_title=${ssrVideoDetails?.title}&avatar=${ssrVideoDetails?.profile_avatar}`} />
                    content={ssrVideoDetails?.thumbnail} 
                    />

                
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content={`https://${ssrUserSubdomain}.duka.to/${ssrVideoSlug}`} />
                <meta property="twitter:title" content={`${ssrVideoDetails?.title} - Dukaflani`} />
                <meta property="twitter:description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
                <meta 
                    property="twitter:image" 
                    // content={`${process.env.NEXT_PUBLIC_NEXT_URL}/api/og?stage_name=${ssrVideoDetails?.stage_name}&fanbase_count=${videoProfile?.fanbase_count}&song_title=${ssrVideoDetails?.song_title}&video_title=${ssrVideoDetails?.title}&avatar=${ssrVideoDetails?.profile_avatar}`} />
                    content={ssrVideoDetails?.thumbnail} 
                    />
            </Head>
            <Box sx={{ minHeight: '100vh', paddingTop: 5}}>
                <Container maxWidth='lg'>
                    <Box>
                        <Grid container sx={{padding: 5}} spacing={3}>
                            <Grid xs={12} md={8} item>
                                <Stack>
                                    {ssrVideoDetails?.youtube_embed_link ? (<Box sx={{position: 'relative', paddingBottom: '56.25%'}}>
                                        {/* <CircularProgress sx={{ position: 'absolute' }} color="inherit" /> */}
                                        <iframe width='100%' height='100%' src={ssrVideoDetails?.youtube_embed_link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                    </Box>) : (<Skeleton animation="wave"  variant="rectangular" sx={{ paddingTop: '56.25%', width: '100%'}} />)}
                                    <Stack>
                                        <Box>
                                            {ssrVideoDetails?.genre_title ? (<Typography sx={{color: '#1976d2'}} variant='button'>{ssrVideoDetails?.genre_title}</Typography>) : (<Skeleton width="10%" />)}
                                            {ssrVideoDetails?.title ? (<Typography variant='h6' component='h1'>{ssrVideoDetails?.title}</Typography>) : (<Skeleton width="70%" />)}
                                        </Box>
                                    </Stack>
                                    <Stack>
                                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', paddingBottom: 1}}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} md={6}>
                                                    <Stack direction='row' spacing={1}>
                                                        {data?.views_count ? (<Typography variant='body2'>{numeral(data?.views_count).format('0,0')} {data?.views_count == 1 ? 'view' : 'views'}</Typography>) : (<Skeleton width="10%" />)}
                                                        <Box sx={{display: {xs: 'none', md: 'block'}}}>&bull;</Box>
                                                        {data?.date ? (<Typography sx={{display: {xs: 'none', md: 'block'}}} variant='body2'>{new Date(data?.date).toDateString()}</Typography>) : (<Skeleton width="15%" />)}
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    {data?.date ? (<Typography sx={{display: {xs: 'block', md: 'none'}}} variant='body2'>{new Date(data?.date).toDateString()}</Typography>) : (<Skeleton width="15%" />)}
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        {formatedLikesCount && <Stack direction='row' spacing={2}>
                                            <Paper variant='outlined'  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', paddingY: 1, paddingX: 1.5, borderRadius: 10, }}>
                                                <Stack spacing={2} direction='row'>
                                                    <Tooltip placement="top" title='I like'>
                                                        <Stack direction='row' spacing={1} sx={{cursor: 'pointer'}}>
                                                            <ThumbUpOutlinedIcon sx={{fontSize: 19}} />
                                                            {formatedLikesCount && <Typography sx={{ fontWeight:'bold' }} variant='body2'>{formatedLikesCount}</Typography>}
                                                        </Stack>
                                                    </Tooltip>
                                                    <Divider orientation="vertical" variant="middle" flexItem />
                                                    <Tooltip placement="top" title="I don't like"><ThumbDownOutlinedIcon sx={{fontSize: 19, cursor: 'pointer'}} /></Tooltip>
                                                </Stack>
                                            </Paper>
                                            <Paper variant='outlined' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', paddingY: 1, paddingX: 1.5, borderRadius: 10, cursor: 'pointer'}}>
                                                <Stack spacing={2} direction='row'>
                                                <CopyToClipboard 
                                                        text={`https://${userSubdomain}.duka.to/${videoSlug}`}
                                                        onCopy={() => setLinkCopied(true)}
                                                >
                                                    <Tooltip placement="top" title='Share'>
                                                            <Stack direction='row' spacing={1}>
                                                                <ShareOutlinedIcon sx={{fontSize: 19}} />
                                                                <Typography sx={{ fontWeight:'bold' }} variant='body2'>{shareButtonText}</Typography>
                                                            </Stack>
                                                    </Tooltip>
                                                </CopyToClipboard>
                                                </Stack>
                                            </Paper>
                                        </Stack>}
                                    </Stack>
                                    {data?.description && <Box sx={{paddingTop: 1, paddingBottom: 2}}>
                                        <Stack direction="column">
                                            <Linkify componentDecorator={(decoratedHref, decoratedText, key) => ( <Link target="blank" underline="none" rel="noopener" sx={{marginBottom: -1, width: 250, display: 'inline-block', overflowX: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}  href={decoratedHref} key={key}> {decoratedText} </Link> )} >
                                                <Typography className={showMoreText ? " " : "line-clamp-1 line-clamp"} gutterBottom variant='body1'>
                                                    {data?.description}
                                                </Typography>
                                            </Linkify>
                                            <Button onClick={() => setShowMoreText(!showMoreText)} size="small">{showMoreText ? "Show Less" : "Show More"}</Button>
                                        </Stack>
                                    </Box>}
                                    {/* <Box sx={{paddingTop: 1, paddingBottom: 2}}>
                                        <Stack direction="column">
                                            <Linkify componentDecorator={(decoratedHref, decoratedText, key) => ( <Link target="blank" underline="none" rel="noopener" sx={{marginBottom: -1, width: 250, display: 'inline-block', overflowX: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}  href={decoratedHref} key={key}> {decoratedText} </Link> )} >
                                                <Typography className={showMoreText ? " " : "line-clamp-1 line-clamp"} gutterBottom variant='body1'>
                                                        {hashTags?.map((hashTag, i) => {
                                                            return hashTag.match(hashTagRegex) ? (
                                                                <Typography key={i}><Typography variant='body1' sx={{color: colors.blue[800]}}>{hashTag}</Typography> {' '}</Typography>
                                                            ) : hashTag + ' '
                                                        })}
                                                </Typography>
                                            </Linkify>
                                            <Button onClick={() => setShowMoreText(!showMoreText)} size="small">{showMoreText ? "Show Less" : "Show More"}</Button>
                                        </Stack>
                                    </Box> */}
                                    <Typography variant='subtitle2'>MORE LINKS:</Typography>
                                    <Divider/>
                                    <Box sx={{paddingX: 1, paddingY: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <Stack spacing={2}>
                                          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                            <Typography variant='subtitle2'>To view a collection of more links to your favourite music,</Typography>
                                            <Typography variant='subtitle2'>go to dukaflani.com</Typography>
                                          </Box>
                                          <Link href='https://dukaflani.com'>
                                            <Button fullWidth variant='contained' size='small'>Ok, Take me there</Button>
                                          </Link>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Grid >
                            <Grid xs={12} md={4} item >
                                    <Card variant='outlined'>
                                        <CardContent>
                                            <Box sx={{ width: '100%'}}>
                                                <Stack spacing={1} direction='row' sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
                                                    <Box>
                                                        {data?.profile_avatar ? (<Link 
                                                            href={`https://dukaflani.com/${data?.username}`} 
                                                            color="inherit" 
                                                            underline='none'
                                                            sx={{cursor: 'pointer'}}
                                                            >
                                                                <Avatar  src={data?.profile_avatar} alt={data?.stage_name} />
                                                            </Link>) : (<Skeleton animation="wave" variant="circular" width={40} height={40} />)}
                                                    </Box>
                                                    <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'start', justifyContent: 'start'}}>
                                                        <Stack spacing={-0.2}>
                                                            <Stack spacing={0.5} direction='row'>
                                                                <Tooltip title={data?.stage_name}>
                                                                    {data?.stage_name ? (<Link 
                                                                        href={`https://dukaflani.com/${data?.username}`} 
                                                                        color="inherit" 
                                                                        underline='none' 
                                                                        sx={{cursor: 'pointer'}}
                                                                        >
                                                                            <Typography className="line-clamp-1 line-clamp" variant='subtitle2'>{data?.stage_name}</Typography>
                                                                        </Link>) : (<Skeleton width="100%" />)}
                                                                </Tooltip>
                                                                {data?.verified && <Tooltip title='Verified'><CheckCircleIcon sx={{ fontSize: 15, color:  colors.grey[100], cursor: 'pointer' }} /></Tooltip>}                   
                                                            </Stack>
                                                            <Typography variant='caption'>{isLoading ? 'Fanbase --' :  `Fanbase ${formatedFanBaseCount}`}</Typography>
                                                        </Stack>
                                                    </Box>
                                                    <Box>
                                                        {
                                                        true ?
                                                            <Button disabled startIcon={<FavoriteBorderOutlinedIcon/>} variant='contained' size='small'>Join</Button>
                                                            :
                                                            <Button disabled startIcon={<FavoriteIcon/>} variant='outlined' size='small'>Leave</Button>
                                                    }
                                                    </Box>        
                                                </Stack>
                                            </Box>
                                        </CardContent>
                                        <CardContent >
                                            <Box>
                                                <Box>
                                                    <Typography gutterBottom sx={{color: 'whitesmoke', backgroundColor: colors.grey[800]}} variant='caption'>SPONSORED</Typography>
                                                </Box>
                                                <Stack spacing={4}>
                                                    <Box>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={5}>
                                                                <Box sx={{position: 'relative', backgroundColor: colors.grey[100]}}>
                                                                <Image 
                                                                    src={adposter} 
                                                                    layout='responsive'
                                                                    alt={`Ad poster by Dukaflani Ads`}
                                                                    height="100%"
                                                                    width="100%"
                                                                    />
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xs={7}>
                                                                <Box sx={{height: '100%', width: '100%', display: 'flex', alignItems: 'end', justifyContent: 'start'}}>
                                                                    <Stack sx={{width: '100%'}}>
                                                                        <Typography className="line-clamp-2 line-clamp" variant='subtitle2'>Get the &quot;Everything Link&quot; for your music with Dukaflani</Typography>
                                                                        <Box sx={{width: '100%', paddingY: 1}}>
                                                                            <Stack spacing={0.5} direction='row' sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                                                                <Typography sx={{fontSize: 12, backgroundColor: 'yellow', color: colors.grey[800]}} className="line-clamp-1 line-clamp" variant='caption'>Ad</Typography>
                                                                                <Typography sx={{fontSize: 12, color: 'GrayText'}} className="line-clamp-1 line-clamp" variant='caption'>Dukaflani Ads</Typography>
                                                                            </Stack>
                                                                        </Box>
                                                                        <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                                            <Link color="inherit" underline='none' href='https://dukaflani.com/links/contact_us'>
                                                                                <Button  
                                                                                startIcon={<InfoOutlinedIcon/>} 
                                                                                fullWidth size="small" 
                                                                                variant='contained'>
                                                                                    Learn More
                                                                                </Button>
                                                                            </Link>
                                                                        </Box>
                                                                    </Stack>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                    <Box>
                                                        <Stack spacing={2}>
                                                            <Box>
                                                                <Tabs
                                                                    variant="scrollable"
                                                                    scrollButtons
                                                                    allowScrollButtonsMobile
                                                                    value={tabPosition}
                                                                    onChange={handleChange}
                                                                >
                                                                    <Tab icon={<CastConnectedOutlinedIcon />} iconPosition='start' label="Stream" />
                                                                    <Tab icon={<ShoppingBasketOutlinedIcon />} iconPosition='start' label="Shop" />
                                                                    <Tab icon={<MicNoneOutlinedIcon />} iconPosition='start' label="Lyrics" />
                                                                    <Tab icon={<PhonelinkRingOutlinedIcon />} iconPosition='start' label="Skiza Tunes" />
                                                                    <Tab icon={<LibraryMusicOutlinedIcon />} iconPosition='start' label="Album" />
                                                                    <Tab icon={<EventAvailableOutlinedIcon />} iconPosition='start' label="Events" />
                                                                    <Tab icon={<RadioOutlined />} iconPosition='start' label="Media" />
                                                                </Tabs>
                                                            </Box>
                                                        <Box>
                                                                {
                                                                    {
                                                                        0: <TabStreamingLinks loadingLinks={loadingLinks} streamingLinks={streamingLinks} data={data} youtubeID={data?.youtube_id} />,
                                                                        1: <TabProductCard loadingProduct={loadingProduct} product={product} data={data} />,
                                                                        2: <TabLyricsCard loadingLyrics={loadingLyrics} loadingLyricVerse={loadingLyricVerse} data={data} lyrics={lyrics} verses={lyrics_verses}  />,
                                                                        3: <TabSkizaCards loadingSkiza={loadingSkiza} data={data} skiza={skiza_list}   />,
                                                                        4: <TabAlbumCard loadingAlbum={loadingAlbum} loadingTracks={loadingTracks}  data={data} album={album} albumTracks={albumTracks}  />,
                                                                        5: <TabEventsCards loadingEvents={loadingEvents}  data={data} events={events} videoUserID={videoUserID} />,
                                                                        6: <TabMediaTourCard loadingMediaTours={loadingMediaTours} data={data} mediaTours={mediaTours} />,
                                                                    }[tabPosition]
                                                                }
                                                            </Box>
                                                        </Stack>
                                                    </Box>
                                                </Stack>
                                            </Box>
                                        </CardContent>
                                        <CardActionArea>
                                            <Box sx={{padding: 1, textAlign: 'center'}}>
                                                {
                                                    {
                                                        0: <Typography variant='caption'>Terms & Conditions Apply</Typography>,
                                                        1: <Typography variant='caption'>{`Sold by ${product?.sold_by}`}</Typography>,
                                                        2: <Typography variant='caption'>&copy; {new Date().getFullYear()} {`${data?.stage_name}. All Rights Reserved`}</Typography>,
                                                        3: <Typography variant='caption'>Terms & Conditions Apply</Typography>,
                                                        4: <Typography variant='caption'>&copy; {new Date().getFullYear()} {`${data?.stage_name}. All Rights Reserved`}</Typography>,
                                                        5: <Typography variant='caption'>Terms & Conditions Apply</Typography>,
                                                        6: <Typography variant='caption'>Terms & Conditions Apply</Typography>,
                                                    }[tabPosition]
                                                }
                                            </Box>
                                        </CardActionArea>
                                    </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </NavigationLayout2>
    </Paper>
  )
}

export default CurrentVideo


export const getServerSideProps = async (cxt) => {
    const { query } = cxt


    const hostRaw = cxt.req.headers.host
    const userSubDomainRaw = hostRaw?.split(".")[0]
    const userSubdomain = userSubDomainRaw == "www" ? hostRaw?.split(".")[1] : userSubDomainRaw

    // `/store/videos/?slug=${query?.videoSlug}&video_username=${userSubdomain}`

    const videosApiCallResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/videos/?slug=${query?.videoSlug}&video_username=${userSubdomain}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
        });

    const videoData = await videosApiCallResponse.json();


    
    return {
        props: {
            ssrVideoDetails: videoData?.results[0],
            ssrUserSubdomain: userSubdomain,
            ssrVideoSlug: query?.videoSlug
        }
    }

}
