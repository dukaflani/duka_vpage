// React Imports
import { useEffect, useState } from "react"

// NextJS Imports
import Image from "next/legacy/image";

// NPM Imports
import { useSelector } from "react-redux";

// Tanstack Query
import { useMutation } from "@tanstack/react-query";

// MUI Imports
import { Box, Typography, Stack, CardContent, Card, CardActionArea, Link, colors } from "@mui/material"

// Project Imports
import { addDefaultStreamingLinkView, addStreamingLinkView } from "@/axios/axios";

// Icons
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';



export const StreamingLinksCard = ({ cardHovered, i, streamingLink, data }) => {
  const userCountry = useSelector((state) => state.auth.country)
  const userIpAddress = useSelector((state) => state.auth.ip_address)
  const [user_country, setUser_country] = useState(null)
  const [user_ip, setUser_ip] = useState(null)

  useEffect(() => {
    setUser_country(userCountry)
    setUser_ip(userIpAddress)
  }, [userCountry, userIpAddress])


  const newStreamingLinkView = {
    streaming_object: streamingLink?.id,
    streaming_object_profile: data?.customuserprofile,
    ip_address: user_ip,
    country: user_country,
    object_title: streamingLink?.streaming_service,
    referral_url: "https://dukaflani.com",
  }

  const { mutate: addNewStreamingLinkView } = useMutation(addStreamingLinkView, {
    onSuccess: (data, _variables, _context) => {
      // console.log("streaming view success:", data)
    },
    onError: (error, _variables, _context) => {
      // console.log("streaming view error:", error)
    },
  })


  const handleStreamingLinkClick = () => {
    addNewStreamingLinkView(newStreamingLinkView)
  }


  return (
    <Link href={streamingLink?.link} underline="none" target="_blank" rel="noopener">
      <Card onClick={handleStreamingLinkClick} variant="outlined" sx={{width: '100%', marginTop: 1, cursor: 'pointer'}} elevation={cardHovered == i ? 5 : cardHovered == null ? 0 : 0}>
        <CardActionArea>
        <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
          <Box 
              sx={{ backgroundColor: colors.grey[200], width: 260,  position: "relative", cursor:'pointer'}}
              >
              <Image 
                  src={streamingLink?.logo}
                  layout='responsive'
                  alt={streamingLink?.streaming_service.replace('_', ' ')}
                  width={260}
                  height={170}
                  />
          </Box>
          <CardContent sx={{width: '100%'}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
              <Box>
                <Stack>
                  <Typography className="line-clamp-1 line-clamp" variant="subtitle2">{streamingLink?.streaming_service.replace('_', ' ')}</Typography>
                  <Typography sx={{width: {xs:140, sm:200, md:70, lg:110}, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} variant="caption">{streamingLink?.link ? streamingLink?.link : 'no link found'}</Typography>
                </Stack>
              </Box>
              <Box>
                <OpenInNewOutlinedIcon fontSize='small' />
              </Box>
            </Box>
          </CardContent>
        </Box>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export const StreamingLinksDefaultCard = ({ defaultCardHovered, youtubeID, data }) => {
  const userCountry = useSelector((state) => state.auth.country)
  const userIpAddress = useSelector((state) => state.auth.ip_address)
  const [user_country, setUser_country] = useState(null)
  const [user_ip, setUser_ip] = useState(null)

  useEffect(() => {
    setUser_country(userCountry)
    setUser_ip(userIpAddress)
  }, [userCountry, userIpAddress])


  const newStreamingLinkView = {
    streaming_object_profile: data?.customuserprofile,
    ip_address: user_ip,
    country: user_country,
    object_title: 'YouTube',
    referral_url: "https://dukaflani.com",
  }

  const { mutate: addNewDefaultStreamingLinkView } = useMutation(addDefaultStreamingLinkView, {
    onSuccess: (data, _variables, _context) => {
      // console.log("default streaming view success:", data)
    },
    onError: (error, _variables, _context) => {
      // console.log("default streaming view error:", error)
    },
  })


  const handleDefaultStreamingLinkClick = () => {
    addNewDefaultStreamingLinkView(newStreamingLinkView)
  }


  return (
    <Link href={`https://www.youtube.com/watch?v=${youtubeID}`} underline="none" target="_blank" rel="noopener">
      <Card onClick={handleDefaultStreamingLinkClick} variant="outlined" sx={{width: '100%', marginTop: 1, cursor: 'pointer'}} elevation={defaultCardHovered == "a" ? 5 : defaultCardHovered == null ? 0 : 0}>
        <CardActionArea>
        <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
          <Box 
              sx={{ backgroundColor: colors.grey[200], width: 260,  position: "relative", cursor:'pointer'}}
              >
              <Image 
                  src="https://dukaflani-user-uploads.s3.amazonaws.com/default/YouTube.png"
                  layout='responsive'
                  alt="YouTube"
                  width={260}
                  height={170}
                  />
          </Box>
          <CardContent sx={{width: '100%',}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
              <Box>
                <Stack>
                  <Typography className="line-clamp-1 line-clamp" variant="subtitle2">YouTube</Typography>
                  <Typography sx={{width: {xs:140, sm:200, md:70, lg:110}, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} variant="caption">{`https://www.youtube.com/watch?v=${youtubeID}`}</Typography>
                </Stack>
              </Box>
              <Box>
                <OpenInNewOutlinedIcon fontSize='small' />
              </Box>
            </Box>
          </CardContent>
        </Box>
        </CardActionArea>
      </Card>
    </Link>
  )
}



const TabStreamingLinks = ({ streamingLinks, data, youtubeID, loadingLinks }) => {
  const [cardHovered, setCardHovered] = useState(null)
  const [defaultCardHovered, setDefaultCardHovered] = useState(null)

  const handleMouseIn = (idx) => {
    setCardHovered(idx)
  }

  const handleMouseOut = () => {
    setCardHovered(null)
  }

  const handleMouseInDefaultCard = () => {
    setDefaultCardHovered("a")
  }

  const handleMouseOutDefaultCard = () => {
    setDefaultCardHovered(null)
  }


  return (
    <Box>
        <Stack spacing={2}>
            <Box>
                <Stack>
                    <Typography variant="subtitle2">STREAMING LINKS</Typography>
                    <Typography variant="caption">{`Click on the links below to stream or download ${data?.song_title} by ${data?.stage_name}`}</Typography>
                </Stack>
            </Box>
            {loadingLinks ? (<Typography variant="caption">Loading streaming & download links...</Typography>) : (<Box>
              {data && <Box
                onMouseEnter={handleMouseInDefaultCard}
                onMouseLeave={handleMouseOutDefaultCard}
              >
                <StreamingLinksDefaultCard defaultCardHovered={defaultCardHovered} youtubeID={youtubeID} i={"a"} data={data} />
              </Box>}
                {streamingLinks?.map((streamingLink, i) => (
                    <Box 
                        key={i}
                        onMouseEnter={() => handleMouseIn(i)}
                        onMouseLeave={handleMouseOut}
                        >
                        <StreamingLinksCard streamingLink={streamingLink} cardHovered={cardHovered} i={i} data={data} />
                    </Box>
                ))}
            </Box>)}
        </Stack>
    </Box>
  )
}

export default TabStreamingLinks