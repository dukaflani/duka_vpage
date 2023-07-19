// React Imports
import { useState, useEffect } from 'react'

// NextJS Imports
import { useRouter } from 'next/router';
import Image from "next/legacy/image";

// Tanstack/React Query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// NPM Imports
import { useDispatch, useSelector } from 'react-redux';

// MUI Imports
import { Box, Card, CardActionArea, CardContent, CardMedia, Divider, 
  Link, Stack, Tooltip, Typography, colors, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Icons
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';

// Project Imports
import { addView } from '@/axios/axios';
import { pageHasChanged, setRegularPageView } from '@/redux/features/navigation/navigationSlice';




export const TabAlbumTrackCard = ({ albumTrackHovered, i, albumTrack }) => {
  const currentLoggedInUser = useSelector((state) => state.auth.userInfo)
  const userCountry = useSelector((state) => state.auth.country)
  const userIpAddress = useSelector((state) => state.auth.ip_address)
  const is_darkMode = useSelector((state) => state.theme.isDarkMode)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [user_country, setUser_country] = useState(null)
  const [user_ip, setUser_ip] = useState(null)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    setUser_country(userCountry)
    setUser_ip(userIpAddress)
  }, [userCountry, userIpAddress])


  const newView = {
    video: albumTrack?.video,
    video_profile: Number(albumTrack?.video_profile),
    ip_address: user_ip,
    country: user_country,
    referral_url: "https://dukaflani.com",
  }

  const queryClient = useQueryClient()
  const { mutate } = useMutation(addView, { 
    onSuccess: () => {
      queryClient.invalidateQueries(["videos-list"])
      queryClient.invalidateQueries(["current-video", albumTrack.youtube_id])
    }
   })

  const handleVideoClick = () => {
    dispatch(pageHasChanged(true))
    dispatch(setRegularPageView())
    router.push({pathname: '/watch', query: {v: albumTrack.youtube_id}})
    mutate(newView)
  }


 
  return (
    <Card variant='outlined' square sx={{marginTop: 1}} elevation={albumTrackHovered == i ? 1 : albumTrackHovered == null ? 0 : 0}>
      <CardActionArea>
        <CardContent>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Stack sx={{width: '100%'}}>
              <Typography className="line-clamp-1 line-clamp" variant='subtitle2'>{albumTrack?.title}</Typography>
              <Divider/>
              <Typography className="line-clamp-1 line-clamp" variant='caption'>{albumTrack?.featuring ? `ft. ${albumTrack?.featuring}` : "Solo Project"}</Typography>
            </Stack>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 1}} >
              {albumTrack?.video && albumTrack?.video != 1 ? <Tooltip title='Play' placement="top" ><PlayCircleIcon onClick={handleVideoClick} sx={{color: is_darkMode === "dark" || prefersDarkMode === true ? colors.grey[100] : is_darkMode === "light" && prefersDarkMode === true ? colors.grey[800] : colors.grey[800]}} /></Tooltip> : <PlayCircleIcon sx={{color: is_darkMode === "dark" || prefersDarkMode === true ? colors.grey[900] : is_darkMode === "light" && prefersDarkMode === true ? colors.grey[100] : colors.grey[100]}} />}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}


const TabAlbumCard = ({ album, data, albumTracks, loadingAlbum, loadingTracks }) => {
  const is_darkMode = useSelector((state) => state.theme.isDarkMode)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useTheme()
  const [albumHovered, setAlbumHovered] = useState(false)

  const handleMouseIn = () => {
    setAlbumHovered(true)
  }

  const handleMouseOut = () => {
    setAlbumHovered(false)
  }


  const [albumTrackHovered, setAlbumTrackHovered] = useState(null)

  const handleMouseIn2 = (idx) => {
    setAlbumTrackHovered(idx)
  }

  const handleMouseOut2 = () => {
    setAlbumTrackHovered(null)
  }


  return (
    <Box>
        <Stack spacing={2}>
            <Box>
                <Stack>
                    <Typography variant="subtitle2">MUSIC COLLECTION</Typography>
                    {album?.id == 1 ? <Typography variant="caption">No album found</Typography>
                     : 
                     <Typography variant="caption">{`Explore more from ${album?.title} the ${album?.album_type} by ${data?.stage_name}`}</Typography>}
                     {loadingAlbum && <Typography variant="caption">Loading music collection...</Typography>}
                </Stack>
            </Box>
            {album?.id != 1 && <Card elevation={0} square>
              <CardContent>
                  <Stack spacing={1}>
                    <Link href={album?.link} underline="none" target="_blank" rel="noopener">
                      <Card variant='outlined' square elevation={albumHovered ? 5 : 1} onMouseEnter={handleMouseIn} onMouseLeave={handleMouseOut}>
                      <CardActionArea>
                          {/* <CardMedia
                            sx={{ height: 300 }}
                            image={album?.cover}
                            title={album?.title}
                          /> */}
                          <Box 
                            sx={{ backgroundColor: colors.grey[200], width: '100%', position: "relative", cursor:'pointer'}}
                            >
                            <Image 
                                src={album?.cover}
                                layout='responsive'
                                alt={album?.title}
                                width='100%'
                                height={100}
                                />
                        </Box>
                        <CardContent>
                          <Stack>
                            <Stack spacing={0.5} direction='row'>
                                <Typography variant='subtitle2'>{data?.stage_name}</Typography>
                                {data?.verified && <CheckCircleIcon sx={{ fontSize: 15, color: is_darkMode === "dark" || prefersDarkMode === true ? colors.grey[100] : is_darkMode === "light" && prefersDarkMode === true ? colors.grey[800] : colors.grey[800] }} />}                   
                            </Stack>
                            <Typography variant='body2'>{album?.title}</Typography>
                            <Typography variant='body2'>{albumTracks?.length} {albumTracks?.length == 1 ? "Track" : "Tracks"}</Typography>
                            <Stack sx={{cursor: 'pointer'}} direction='row' spacing={1}>
                              <Typography sx={{color: albumHovered && '#1976d2'}} variant='body2'>{`${album?.option_type} ${album?.link_title}`}</Typography>
                              <OpenInNewOutlinedIcon fontSize='small' sx={{color: albumHovered && '#1976d2'}} />
                            </Stack>
                          </Stack>
                        </CardContent>
                        </CardActionArea>
                      </Card>
                      </Link>
                      <Box>
                        <Stack direction="row" spacing={1} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <KeyboardDoubleArrowDownOutlinedIcon/>
                          <Typography variant='button'>{`${album?.album_type} Track List`}</Typography>
                        </Stack>
                      </Box>
                      <Box>
                          {albumTracks?.map((albumTrack, i) => (
                              <Box onMouseEnter={() => handleMouseIn2(i)} onMouseLeave={handleMouseOut2} key={i}>
                                  <TabAlbumTrackCard albumTrack={albumTrack} albumTrackHovered={albumTrackHovered} i={i} />
                              </Box>
                          ))}
                      </Box>
                  </Stack>
              </CardContent>
            </Card>}
        </Stack>
    </Box>
  )
}

export default TabAlbumCard