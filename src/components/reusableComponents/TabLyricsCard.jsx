// MUI Imports
import { Box, Card, CardContent, Divider, Stack, Typography, colors } from "@mui/material"

export const TabLyricsVerseCard = ({ verse }) => {
  return (
    <Box sx={{paddingTop: 2}}>
      <Stack>
        <Typography variant="button">{verse?.type.replace("_", " ")}</Typography>
        {verse?.artist && <Box >
          <Typography sx={{backgroundColor: colors.grey[100], color: colors.grey[700], padding: 0.5}} variant="caption" >{verse?.artist}</Typography>
        </Box>}
        <Typography sx={{whiteSpace: 'pre-line'}} variant="body2">{verse?.body}</Typography>
      </Stack>
    </Box>
  )
}


const TabLyricsCard = ({ data, lyrics, verses, loadingLyrics, loadingLyricVerse }) => {
  return (
    <Box>
        <Stack spacing={2}>
            <Box>
                <Stack>
                    <Typography variant="subtitle2">LYRICS & RHYMES</Typography>
                    <Typography variant="caption">{`Learn the lyrics to ${data?.song_title} by ${data?.stage_name} as written by ${lyrics?.writer}`}</Typography>
                </Stack>
            </Box>
            <Card variant="outlined" square>
              <CardContent>
                <Stack spacing={2}>
                  {loadingLyrics ? (<Typography variant="caption">Loading lyrics...</Typography>) : (<Box>
                    <Stack spacing={0.5}>
                        <Stack>
                          <Stack spacing={-0.5} direction="column">
                            <Typography variant="subtitle2">VOCALS</Typography>
                            <Typography variant="caption">{lyrics?.vocals ? lyrics?.vocals : "---"}</Typography>
                          </Stack>
                        </Stack>
                        <Stack>
                          <Stack spacing={-0.5} direction="column">
                            <Typography variant="subtitle2">AUDIO</Typography>
                            <Typography variant="caption">{lyrics?.audio ? lyrics?.audio : "---"}</Typography>
                          </Stack>
                        </Stack>
                        <Stack>
                          <Stack spacing={-0.5} direction="column">
                            <Typography variant="subtitle2">DIRECTOR</Typography>
                            <Typography variant="caption">{lyrics?.director ? lyrics?.director : "---"}</Typography>
                          </Stack>
                        </Stack>
                        <Stack>
                          <Stack spacing={-0.5} direction="column">
                            <Typography variant="subtitle2">WRITER</Typography>
                            <Typography variant="caption">{lyrics?.writer ? lyrics?.writer : "---"}</Typography>
                          </Stack>
                        </Stack>
                        <Stack>
                          <Stack spacing={-0.5} direction="column">
                            <Typography variant="subtitle2">BACKGROUND VOCALS</Typography>
                            <Typography variant="caption">{lyrics?.bgvs ? lyrics?.bgvs : "---"}</Typography>
                          </Stack>
                        </Stack>
                        <Stack>
                          <Stack spacing={-0.5} direction="column">
                            <Typography variant="subtitle2">INSTRUMENTS</Typography>
                            <Typography variant="caption">{lyrics?.instruments ? lyrics?.instruments : "---"}</Typography>
                          </Stack>
                        </Stack>
                        <Stack>
                          <Stack spacing={-0.5} direction="column">
                            <Typography variant="subtitle2">EXECUTIVE PRODUCER</Typography>
                            <Typography variant="caption">{lyrics?.producer ? lyrics?.producer : "---"}</Typography>
                          </Stack>
                        </Stack>
                    </Stack>
                  </Box>)}
                  <Divider/>
                  {loadingLyricVerse ? (<Typography variant="caption">Loading verses...</Typography>) : (<Box>
                  {verses?.map((verse, i) => (
                          <Box key={i}>
                              <TabLyricsVerseCard verse={verse} />
                          </Box>
                      ))}
                  </Box>)}
                </Stack>
              </CardContent>
            </Card>
        </Stack>
    </Box>
  )
}

export default TabLyricsCard