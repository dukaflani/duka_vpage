// MUI Imports
import { Box, Card, CardContent, Divider, Grid, Stack, Typography, colors } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export const TabSkizaTuneCard = ({ skizaTune }) => {
  const theme = useTheme()


  return (
    <Box sx={{paddingBottom: 1, paddingTop: 3}}>
      <Stack>
        <Box>
          <Typography sx={{color: 'whitesmoke', backgroundColor: colors.grey[800]}} variant='button'>{skizaTune?.country ? skizaTune?.country : "---"}</Typography>
        </Box>
        <Grid container>
          <Grid xs={4} item>
            <Typography variant='subtitle2' >Carrier</Typography>
          </Grid>
          <Grid xs={8} item>
            <Typography variant='body2' >{skizaTune?.carrier ? skizaTune?.carrier : "---"}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={4} item>
            <Typography variant='subtitle2' >Skiza Code</Typography>
          </Grid>
          <Grid xs={8} item>
            <Typography variant='body2' >{skizaTune?.code ? skizaTune?.code : "---"}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={4} item>
            <Typography variant='subtitle2' >SMS</Typography>
          </Grid>
          <Grid xs={8} item>
            <Typography variant='body2' >{skizaTune?.sms ? skizaTune?.sms : "---"}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={4} item>
            <Typography variant='subtitle2' >USSD</Typography>
          </Grid>
          <Grid xs={8} item>
            <Typography variant='body2' >{skizaTune?.ussd ? skizaTune?.ussd : "---"}</Typography>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  )
}


const TabSkizaCards = ({ skiza, data, loadingSkiza }) => {

  const lastSkizaCard = skiza?.length - 1


  return (
    <Box>
        <Stack spacing={2}>
            <Box>
                <Stack>
                    <Typography variant="subtitle2">RINGBACK TUNES</Typography>
                    <Typography variant="caption">{`Follow the instructions below to set ${data?.song_title} as your ringback tune`}</Typography>
                </Stack>
            </Box>
            {loadingSkiza ? (<Typography variant="caption">Loading skiza tunes...</Typography>) : (<Card variant='outlined' square>
              {skiza?.length == 0 && <CardContent>
                <Typography variant="body2">No Skiza Tunes Found</Typography>
                </CardContent>}

              {skiza?.length > 0 && <CardContent>
                {skiza?.map((skizaTune, i) => (
                    <Box key={i}>
                        <TabSkizaTuneCard skizaTune={skizaTune} />
                        <Divider sx={{display: i == lastSkizaCard ? 'none' : 'block'}}/>
                    </Box>
                ))}
              </CardContent>}
            </Card>)}
        </Stack>
    </Box>
  )
}

export default TabSkizaCards