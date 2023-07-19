// MUI Imports
import { Avatar, Box, Card, colors, CardContent, CardHeader, 
    Stack, Typography, CardMedia } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// NextJS Imports
import Image from "next/legacy/image";


// Icons
import { RadioOutlined, LiveTvOutlined, YouTube } from '@mui/icons-material';

// Project Imports
import { countriesChoices } from "@/data/countries"



export const MediaTourCard = ({ mediaTour }) => {
    const theme = useTheme()

    return (
        <Box sx={{paddingTop: 2}}>
            <Card variant='outlined' square>
                    <CardHeader
                        avatar={
                        <Avatar sx={{backgroundColor: "#1976d2"}} variant='rounded' >
                            {mediaTour?.station_type === "Radio Station" && <RadioOutlined/>}
                            {mediaTour?.station_type === "TV Station" && <LiveTvOutlined/>}
                            {mediaTour?.station_type === "YouTube Live" && <YouTube/>}
                        </Avatar>
                        }
                        title={mediaTour?.station_name}
                        // subheader={`${type} from ${country}`}
                        subheader={
                            <Stack direction="row" spacing={0.5}>
                                <Typography variant='caption'>{mediaTour?.station_type}</Typography>
                                <Typography sx={{color: colors.grey[800]}} variant='caption'>from</Typography>
                                <Typography variant='caption'>{countriesChoices.filter((country) => country.code === mediaTour?.country)[0]?.label}</Typography> 
                            </Stack>
                        }
                    />
                    {/* <CardMedia
                        sx={{ height: 300 }}
                        image={mediaTour?.poster}
                        title={mediaTour?.title}
                    /> */}
                    <Box 
                        sx={{ backgroundColor: colors.grey[200], width: '100%', position: "relative", cursor:'pointer'}}
                        >
                        <Image 
                            src={mediaTour?.poster}
                            layout='responsive'
                            alt={mediaTour?.title}
                            width='100%'
                            height={100}
                            />
                    </Box>
                    <CardContent>
                        <Stack>
                            <Stack sx={{display: "flex", justifyContent: "start", alignItems: "center"}} direction="row" spacing={1}>
                                <Typography variant="subtitle2">Show:</Typography>
                                <Typography className="line-clamp-1 line-clamp" variant="body2">{mediaTour?.show_title}</Typography>
                            </Stack>
                            <Stack sx={{display: "flex", justifyContent: "start", alignItems: "center"}} direction="row" spacing={1}>
                                <Typography variant="subtitle2">Host:</Typography>
                                <Typography className="line-clamp-1 line-clamp" variant="body2">{mediaTour?.show_host}</Typography>
                            </Stack>
                            <Stack sx={{display: "flex", justifyContent: "start", alignItems: "center"}} direction="row" spacing={1}>
                                <Typography variant="subtitle2">Date:</Typography>
                                <Typography variant="body2">{new Date(mediaTour?.date).toDateString()}</Typography>
                            </Stack>
                            <Stack sx={{display: "flex", justifyContent: "start", alignItems: "center"}} direction="row" spacing={1}>
                                <Typography variant="subtitle2">Time:</Typography>
                                <Typography variant="body2">{`${mediaTour?.from_time} - ${mediaTour?.to_time}`}</Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
            </Card>
        </Box>
    )
  }

const TabMediaTourCard = ({ data, mediaTours, loadingMediaTours }) => {
  return (
    <Box>
        <Stack spacing={2}>
            <Box>
                <Stack>
                    <Typography variant="subtitle2">MEDIA TOUR DATES</Typography>
                    {loadingMediaTours ? (<Typography variant="caption">Loading media tours...</Typography>) : (<Typography variant="caption">{`Follow and learn more about ${data?.stage_name} from interviews on Radio, TV & Online `}</Typography>)}
                </Stack>
            </Box>
            {mediaTours?.length == 0 && <Card>
              <CardContent>
                <Typography variant='body2'>{`${data?.stage_name} has not added any media tour dates yet.`}</Typography>
              </CardContent>
            </Card>}
            {mediaTours?.length > 0  && <Box>
                {mediaTours?.map((mediaTour, i) => (
                    <Box key={i}>
                        <MediaTourCard mediaTour={mediaTour} />
                    </Box>
                ))}
            </Box>}
        </Stack>
    </Box>
  )
}

export default TabMediaTourCard