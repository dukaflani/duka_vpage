// React Imports
import { useState } from 'react';

// Nextjs Imports
import Head from 'next/head'
import { useRouter } from 'next/router';

//  Mui Imports
import { Box, Container, Paper, Button, colors, Stack, Typography, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// NPM Imports
import { useDispatch } from 'react-redux';


// Components
import MobileNavigationLayout from '@/layout/mobile/MobileNavigationLayout'
import BottomNavMobile from '@/components/reusableComponents/BottomNavMobile';

export default function Home({ setIsDarkMode, isDarkMode, value, setValue }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const adString = 'Get the "Everything Link" for your music with Dukaflani'


  return (
    <>
    <MobileNavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} >
        <Head>
          <title>A Hub For All Things Music | Dukaflani</title>
          <meta name="title" content="A Hub For All Things Music | Dukaflani"/>
          <meta name="description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
          <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>
        </Head>
        <Paper sx={{minHeight: '100vh', paddingTop: 5, paddingBottom: 10}}>
          <Paper elevation={0} sx={{ paddingBottom: 0.4, paddingTop: 1, paddingX: 1.5, position: 'sticky', top: 47, zIndex: 999}}>
            <Container disableGutters maxWidth='lg'>
              <Link color="inherit" underline="none" href='https://dukaflani.com/links/contact_us'>
                  <div style={{display:'flex', flexDirection:'row', alignItems: 'start', justifyContent: 'center'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems: 'start', justifyContent: 'center', }}>
                      <Box sx={{display : {xs: 'none', sm: 'block'}}}>
                        <span style={{marginRight: 10, fontSize: 13, fontWeight: 'bold', lineHeight: 1.1}} >{adString}</span>
                      </Box>
                      <Box sx={{display : {xs: 'block', sm: 'none'}}}>
                        <span style={{marginRight: 10, fontSize: 13, fontWeight: 'bold', lineHeight: 1.1}} >{adString?.length > 44 ? `${adString?.substring(0, 43)}...` : `${adString}`}</span>
                      </Box>
                        <div style={{display:'flex', flexDirection:'row', marginTop: -2,}}>
                          <span style={{marginRight: 3, fontSize: 12, backgroundColor: 'yellow', paddingLeft: 3, paddingRight: 3, color: colors.grey[800]}}>Ad</span>
                          <span style={{ fontSize: 12, color: 'GrayText', width: 250, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>Dukaflani Ads</span>
                        </div>
                    </div>
                  </div>
              </Link>
            </Container>
          </Paper>
          <Stack sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 20}} spacing={2}>
            <Typography variant='h6'>Looking for dukaflani.com?</Typography>
            <Link href='https://dukaflani.com'>
              <Button variant='outlined'>Yes, take me there!</Button>
            </Link>
          </Stack>
           <Box>
            <BottomNavMobile value={value} setValue={setValue}/>
          </Box>
        </Paper>
    </MobileNavigationLayout>
    </>
  )
}
