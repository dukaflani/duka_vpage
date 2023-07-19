// Next Imports
import { useRouter } from 'next/router';
import Head from "next/head"

// MUI Imports
import { Box, Card, CardContent, Container, Link, Paper, Stack, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// Project imports
import Copyright from '@/components/reusableComponents/Copyright';

const NotFound = () => {
    const router = useRouter()
    const theme = useTheme()


  return (
    <>
    <Head>
        <title>Page Not Found! | Dukaflani</title>
        <meta name="description" content="Oops... Page not found" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Paper sx={{minHeight: '100vh'}}>
        <Container maxWidth="md">
        <Stack sx={{minHeight: '100vh', paddingTop: 2 }} spacing={3}>
                <Link 
                onClick={(e) => {
                    e.preventDefault()
                    router.push({ pathname: '/' })
                }}
                title='Dukaflani Home'>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', cursor: 'pointer'}}>
                    <img style={{height: 30}} src='/branding/dukaflani-logo-blue-medium.png' alt='logo'/>
                </Box>
                </Link>
                <Box >
                    <Card variant='outlined' square>
                        <CardContent>
                            <Stack spacing={2}>
                                <Typography variant='h6'>Oops...</Typography>
                                <Typography variant='h1'>
                                    404
                                </Typography>
                                <Typography variant='body1'>
                                    Page not found!
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
                <Box>
                    <Copyright/>
                </Box>
        </Stack>
        </Container>
    </Paper>
</>
  )
}

export default NotFound