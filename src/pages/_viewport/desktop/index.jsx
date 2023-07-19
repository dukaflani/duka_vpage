// Nextjs Imports
import Head from 'next/head'

//  Mui Imports
import { Box, Button, Link, Paper, Stack, Typography } from '@mui/material'


// Components
import NavigationLayout from '@/layout/desktop/NavigationLayout'
import BottomNavDesktop from '@/components/reusableComponents/BottomNavDesktop';

export default function Home({ setIsDarkMode, isDarkMode, value, setValue }) {
  return (
    <>
     <Paper>
      <NavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} >
        <Head>
          <title>A Hub For All Things Music | Dukaflani</title>
          <meta name="title" content="A Hub For All Things Music | Dukaflani"/>
          <meta name="description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
          <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>

          
          <meta property="og:type" content="website"/>
          <meta property="og:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
          <meta property="og:title" content="A Hub For All Things Music | Dukaflani"/>
          <meta property="og:description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
          <meta property="og:image" content="https://dukaflani-user-uploads.s3.ap-south-1.amazonaws.com/branding/dukaflani-social-media-cover-potrait.png"/>

          
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
          <meta property="twitter:title" content="A Hub For All Things Music | Dukaflani"/>
          <meta property="twitter:description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
          <meta property="twitter:image" content="https://dukaflani-user-uploads.s3.ap-south-1.amazonaws.com/branding/dukaflani-social-media-cover-potrait.png"/>
        </Head>
        <Box sx={{minHeight: '100vh', paddingTop: 15, paddingBottom: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Stack sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} spacing={2}>
            <Typography variant='h6'>Looking for dukaflani.com?</Typography>
            <Link href='https://dukaflani.com'>
              <Button variant='outlined'>Yes, take me there!</Button>
            </Link>
          </Stack>
          <Box sx={{display: { xs: 'block', md: 'none' }}}>
            <BottomNavDesktop value={value} setValue={setValue}/>
          </Box>
        </Box>
      </NavigationLayout>
     </Paper>
    </>
  )
}
