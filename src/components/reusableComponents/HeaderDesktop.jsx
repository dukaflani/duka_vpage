// React imports
import { useEffect, useMemo, useState } from 'react'

// Next Imports
import { useRouter } from 'next/router';

// Mui Imports
import { Box, Tabs, Tab, AppBar, Toolbar, IconButton, Stack, Avatar, 
  InputBase, Tooltip, Link, Drawer, List, ListItem, ListItemButton, Button,
  ListItemIcon, ListItemText, Typography, colors, useMediaQuery, Menu, MenuItem, ListItemAvatar, Container, Divider, Dialog, DialogTitle, DialogContent, CircularProgress } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';

// NPM Import
import { useCookies } from "react-cookie"
import { useDispatch, useSelector } from 'react-redux';

// Icons
import { MenuOutlined, ShoppingCartOutlined, BellOutlined,
   SearchOutlined, HomeFilled, ShopFilled, BarcodeOutlined, HomeOutlined, ShopOutlined, } from '@ant-design/icons'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { Brightness4Sharp, Brightness5Sharp, PersonOffOutlined} from '@mui/icons-material';

// Project Imports
import { addSearchTerm, deleteSearchTerm } from '@/redux/features/search/searchSlice';
import { setDarkMode, setLightMode } from '@/redux/features/theme/themeSlice';
import { countriesChoices } from "@/data/countries"
import AppBarLinearProgress from './AppBarLinearProgress'
import { pageHasChanged } from '@/redux/features/navigation/navigationSlice';
import { logOut, updateGeoLocation } from '@/redux/features/auth/authSlice';




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.10),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.20),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(2),
    width: 'auto',
  },
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const Search2 = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.50),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.60),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(2),
    width: 'auto',
  },
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


function LinkTab(props) {
  return (
    <Tab
      component="a"
      // onClick={(event) => {
      //   event.preventDefault();
      // }}
      {...props}
    />
  );
}



const HeaderDesktop = ({ setIsDarkMode, isDarkMode, value, setValue }) => {
  const searchTerm = useSelector((state) => state.search.searchTerm)
  const userProfile = useSelector((state) => state.auth.profileInfo)
  const userCountry = useSelector((state) => state.auth.country)
  const userIpAddress = useSelector((state) => state.auth.ip_address) 
  const currentLoggedInUser = useSelector((state) => state.auth.userInfo)
  const pageNavigated = useSelector((state) => state.navigation.pageChanged)
  const router = useRouter()
  const pathName = router.pathname
  const { v, search_query, UserCountry, UserIP  } = router.query

  
  const pathnameLength = pathName.split("/")
  const [mySearchTerm, setMySearchTerm] = useState(searchTerm)
  const [showTabs, setShowTabs] = useState(true)
  const adString = 'Get the "Everything Link" for your music with Dukaflani'
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [country_name, setCountry_name] = useState({})
  const [showSearchDialog, setShowSearchDialog] = useState(false)
  
  const dispatch = useDispatch()

  
  useMemo(() => dispatch(updateGeoLocation({
    country: UserCountry,
    ip_address: UserIP,
  })), [UserCountry, UserIP])


  useEffect(() => {
    if (UserCountry?.length > 1) {
      setCountry_name(countriesChoices?.filter((country) => country.code === UserCountry))
    }
  }, [UserCountry])


  const formattedSearchTerm = mySearchTerm?.replace(/%2/g, "+")
  
  const updateSearchTerm = (e) => {
    if (e.key === 'Enter') {
      dispatch(pageHasChanged(true))
      // router.push({pathname: `/results/`, query: { search_query: formattedSearchTerm }})
      setShowSearchDialog(true)
      dispatch(addSearchTerm(mySearchTerm))
    }
  }

  

  useEffect(() => {
    setMySearchTerm(searchTerm)
  }, [searchTerm])
  

  const navItems = [
    {
      icon: <HomeOutlined style={{fontSize: 25}} />, 
      label: 'Home',
      link: '/',
      path: '/_viewport/desktop'
    },
    {
      icon: <ShopOutlined style={{fontSize: 25}} />, 
      label: 'Shop',
      link: '/shop',
      path: '/_viewport/desktop/shop'
    },
    {
      icon: <BarcodeOutlined style={{fontSize: 25}} />, 
      label: 'Events',
      link: '/events',
      path: '/_viewport/desktop/events'
    },
    // {
    //   icon: <LayoutOutlined style={{fontSize: 25}} />,
    //   label: 'Dashboard',
    //   link: '/dashboard',
    //   path: '/_viewport/desktop/dashboard'
    // },
    // {
    //   icon: <UserOutlined style={{fontSize: 25}} />,
    //   label: 'Profile',
    //   link: '/profile',
    //   path: '/_viewport/desktop/profile'
    // },
    // {
    //   icon: <CloudUploadOutlined style={{fontSize: 25}} />,
    //   label: 'Uploads',
    //   link: '/upload',
    //   path: '/_viewport/desktop/upload'
    // },
    // {
    //   icon: <SettingOutlined style={{fontSize: 25}} />,
    //   label: 'Settings',
    //   link: '/settings',
    //   path: '/_viewport/desktop/settings'
    // },
  ]
  

  useEffect(() => {
    if (pathnameLength.length > 3) {
      setShowTabs(false)
    }  
  }, [pathName, pathnameLength.length])
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


   // Dark Mode
   const [cookie, setCookie] = useCookies(["Mode"])
   const is_darkMode = useSelector((state) => state.theme.isDarkMode)
   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
   
   const handleSetDarkMode = () => {
     dispatch(setDarkMode("dark"))
     setCookie("LightMode", "dark", {
       path: "/",
       maxAge: 3600 * 24 * 365, // Expires after 1yr
       sameSite: true,
       domain: process.env.COOKIE_DOMAIN
     })
   }
   const handleSetLightMode = () => { 
     dispatch(setLightMode("light"))
     setCookie("LightMode", "light", {
       path: "/",
       maxAge: 3600 * 24 * 365, // Expires after 1yr
       sameSite: true,
       domain: process.env.COOKIE_DOMAIN
     })
   }


  //  Logout
  const handleLogout = () => {
    dispatch(logOut())
    fetch("api/logout", {
      method: 'POST',
      body: JSON.stringify({ refreshToken: '' }),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
  });
  }


  // Login/Register
  const handleLoginRegister = () => {
    dispatch(pageHasChanged(true))
    router.push({ pathname: '/account/login' })
  }



  // More Icon Menu
  const [anchorEl, setAnchorEl] = useState(null);
    const openNavMenu = Boolean(anchorEl);
    const handleClickNavMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
      setAnchorEl(null);
    };

    const handleNavigateToProfile = () => {
      dispatch(pageHasChanged(true))
      router.push(`/${currentLoggedInUser?.username}`)
    }

    const handleNavigateToProfileSettings = () => {
      dispatch(pageHasChanged(true))
      router.push("/account/profile/settings")
    }
  
const navMenuItems = useMemo(() => [
{
  primaryText: currentLoggedInUser ? currentLoggedInUser?.stage_name : "User not logged in",
  secondaryText: currentLoggedInUser ? currentLoggedInUser?.role : "---",
  icon: currentLoggedInUser ? <Person2OutlinedIcon /> :  <PersonOffOutlined/>,
  onClick: currentLoggedInUser ? handleNavigateToProfile : handleLoginRegister,
  urlLink: currentLoggedInUser ? `https://dukaflani.com/${currentLoggedInUser?.username}` : "https://dukaflani.com/account/login"
},
{
  primaryText: "Appearance",
  secondaryText: is_darkMode === "dark" ? "Light Mode" : "Dark Mode",
  icon: is_darkMode === "dark" ? <Brightness5Sharp/> : <Brightness4Sharp/>,
  onClick: is_darkMode === "dark" ? handleSetLightMode : handleSetDarkMode,
  urlLink: "/"
},
],[currentLoggedInUser, is_darkMode])

const navMenuItems2 = useMemo(() => [
{
  primaryText: "Profile",
  secondaryText: "Settings",
  icon: <SettingsApplicationsOutlinedIcon/>,
  onClick: currentLoggedInUser ? handleNavigateToProfileSettings : handleLoginRegister,
  urlLink: currentLoggedInUser ? "https://dukaflani.com/account/profile/settings" : "https://dukaflani.com/account/login"
},
{
  primaryText: "Country",
  secondaryText: country_name[0]?.label,
  icon: <FlagOutlinedIcon/>,
  onClick: () => router.push("/"),
  urlLink: "/"
},
{
  primaryText: "Dukaflani Accounts",
  secondaryText: currentLoggedInUser ? "Logout" : "Login/Register",
  icon: currentLoggedInUser ? <LogoutOutlinedIcon/> : <LoginOutlinedIcon/>,
  onClick: currentLoggedInUser ? handleLogout : handleLoginRegister,
  urlLink: currentLoggedInUser ? "https://dukaflani.com" : "https://dukaflani.com/account/login"
},
],[currentLoggedInUser, country_name])


// Navigation
useEffect(() => {
  dispatch(pageHasChanged(false))
}, [pathName, v, search_query])



  return (
    <>
        <AppBar color='inherit' elevation={is_darkMode === "dark" || prefersDarkMode === true ? 1 : is_darkMode === "light" && prefersDarkMode === true ? 0 : 0}>
        {pageNavigated && <AppBarLinearProgress  darkMode={is_darkMode}  prefersDarkMode={prefersDarkMode}   />}
          <Toolbar variant="dense">
            <IconButton onClick={() => setDrawerOpen(true)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
                <MenuOutlined style={{ fontSize: 16, color: is_darkMode === "dark" || prefersDarkMode === true ? colors.grey[100] : is_darkMode === "light" && prefersDarkMode === true ? colors.grey[800] : colors.grey[800] }} />
            </IconButton>
            <Link 
              onClick={(e) => {
                e.preventDefault()
                router.push({ pathname: '/' })
              }}
              title='Dukaflani Home'>
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                <img style={{height: 30}} src='/branding/dukaflani-logo-blue-medium.png' alt='logo'/>
              </Box>
            </Link>
            <Box sx={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={showTabs ? {display: 'block'} : {display: 'none'}}>
                <Box sx={{display: { xs: 'none', md: 'block' }}}>
                  <Tabs 
                      value={value} 
                      onChange={handleChange}
                      textColor="primary"
                      indicatorColor="primary" 
                      aria-label="icon label tabs example">
                        <Tooltip title="Links">
                            <LinkTab label="Links" href="https://dukaflani.com" />
                        </Tooltip>
                        <Tooltip title="Products">
                            <LinkTab label="Shop" href="https://dukaflani.com/shop" />
                        </Tooltip>
                        <Tooltip title="Events">
                            <LinkTab label="Events" href="https://dukaflani.com/events" />
                        </Tooltip>
                  </Tabs>
                </Box>
              </Box>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'end', cursor: 'pointer',  paddingRight: 1}}>
              {is_darkMode === "dark" || prefersDarkMode === true ? (
                <Search2 >
                  <SearchIconWrapper>
                    <SearchOutlined style={{ color: colors.grey[800] }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    style={{ color: colors.grey[800] }}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={mySearchTerm}
                    onChange={(e) => setMySearchTerm(e.target.value)}
                    onKeyDown={updateSearchTerm}
                  />
              </Search2>
              ) : is_darkMode === "light" && prefersDarkMode === true ? (
                <Search >
                  <SearchIconWrapper>
                    <SearchOutlined style={{ color: colors.grey[800] }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    style={{ color: colors.grey[800] }}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={mySearchTerm}
                    onChange={(e) => setMySearchTerm(e.target.value)}
                    onKeyDown={updateSearchTerm}
                  />
                </Search>
              ) : (
                <Search >
                  <SearchIconWrapper>
                    <SearchOutlined style={{ color: colors.grey[800] }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    style={{ color: colors.grey[800] }}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={mySearchTerm}
                    onChange={(e) => setMySearchTerm(e.target.value)}
                    onKeyDown={updateSearchTerm}
                  />
                </Search>
              ) }
            </Box>
            <Stack direction="row" spacing={1}>
            <Tooltip title="Notifications">
              <IconButton>
                <BellOutlined />
              </IconButton>
              </Tooltip>
              <Tooltip title="Shopping Cart">
                <IconButton>
                  <ShoppingCartOutlined />
                </IconButton>
              </Tooltip>
              <Avatar src={userProfile?.profile_avatar} alt={`${userProfile?.first_name} ${userProfile?.last_name}`}/>
              <Tooltip title="More Options">
                <IconButton
                   id="basic-button"
                   aria-controls={openNavMenu ? 'basic-menu' : undefined}
                   aria-haspopup="true"
                   aria-expanded={openNavMenu ? 'true' : undefined}
                   onClick={handleClickNavMenu} 
                   >
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
              {/* Video Options Menu */}
              <Menu
                 id="basic-menu"
                 anchorEl={anchorEl}
                 open={openNavMenu}
                 onClose={handleCloseNavMenu}
                 MenuListProps={{
                   'aria-labelledby': 'basic-button',
                 }}
                 PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                 transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                 anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  {navMenuItems?.map((navMenuItem, index) => (
                    <Link color="inherit" underline="none" key={index} href={navMenuItem.urlLink}>
                      <MenuItem  onClick={handleCloseNavMenu}>
                            <ListItem disableGutters>
                              <ListItemAvatar>
                                <Avatar>
                                  {navMenuItem.icon}
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={navMenuItem.primaryText} secondary={navMenuItem.secondaryText} />
                              </ListItem>
                          </MenuItem>
                    </Link>
                      ))}
                      <MenuItem onClick={handleCloseNavMenu}>
                          <Link href='https://hub.dukaflani.com' underline='none' target="_blank" rel="noopener">
                            <ListItem disableGutters>
                                <ListItemAvatar>
                                  <Avatar>
                                    <DashboardOutlinedIcon/>
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Creator's Hub!" secondary="Dashboard" />
                              </ListItem>
                          </Link>
                      </MenuItem>
                      {navMenuItems2?.map((navMenuItem, index) => (
                        <Link color="inherit" underline="none" key={index} href={navMenuItem.urlLink}>
                          <MenuItem onClick={handleCloseNavMenu}>
                              <ListItem key={index} disableGutters>
                                <ListItemAvatar>
                                  <Avatar>
                                    {navMenuItem.icon}
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={navMenuItem.primaryText} secondary={navMenuItem.secondaryText} />
                              </ListItem>
                          </MenuItem>
                        </Link>
                      ))}
                </Menu>

            </Stack>
          </Toolbar>
          <Divider/>
          <Toolbar>
              <Container maxWidth='lg'>
                <div style={{display:'flex', flexDirection:'row', alignItems: 'start', justifyContent: 'center'}}>
                  <div style={{display:'flex', flexDirection:'column',}}>
                      <span style={{marginRight: 10, fontSize: 13, fontWeight: 'bold', lineHeight: 1.1}} className="line-clamp-1 line-clamp">{adString}</span>
                      <div style={{display:'flex', flexDirection:'row', marginTop: -2}}>
                        <span style={{marginRight: 6, fontSize: 12, backgroundColor: 'yellow', paddingLeft: 5, paddingRight: 5, color: colors.grey[800]}}>Ad</span>
                        <span style={{marginRight: 6, fontSize: 12, color: 'GrayText', width: 250, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>Dukaflani Ads</span>
                      </div>
                  </div>
                  <div>
                    <Link href='https://dukaflani.com/links/contact_us'>
                      <Button 
                        startIcon={<InfoOutlinedIcon/>} 
                        size="small"
                        >
                          Learn How
                        </Button>
                    </Link>
                  </div>
                </div>
              </Container>
            </Toolbar>

        </AppBar>

        <Drawer 
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <div style={{minWidth: 250, minHeight: '100%', display: 'flex', flexDirection: 'column'}}>
              <Toolbar variant="dense" sx={{width: '100%'}}>
                <IconButton onClick={() => setDrawerOpen(false)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
                  <MenuOutlined style={{ fontSize: 16, color: is_darkMode === "dark" || prefersDarkMode === true ? colors.grey[100] : is_darkMode === "light" && prefersDarkMode === true ? colors.grey[800] : colors.grey[800] }} />
                </IconButton>
                <Link 
                  onClick={(e) => {
                    e.preventDefault()
                    router.push({ pathname: '/' })
                  }}
                  title='Dukaflani Home'>
                  <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                    <img style={{height: 30}} src='/branding/dukaflani-logo-blue-medium.png' alt='logo'/>
                  </Box>
                </Link>
              </Toolbar>
              <Box sx={{ paddingTop: 1, flexGrow: 1 }}>
                <Box>
                  <nav>
                    <List>
                    {navItems.map((navItem, i) => (
                      <Link key={i} color="inherit" underline="none" href={`https://dukaflani.com${navItem.link}`}>
                        <ListItem disablePadding >
                          <ListItemButton
                            selected={pathName === navItem.path}
                            onClick={() =>{
                              setDrawerOpen(false);
                            }}
                          >
                            <ListItemIcon>
                              {navItem.icon}
                            </ListItemIcon>
                            <ListItemText primary={navItem.label} />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                    ))}
                    </List>
                  </nav>
                </Box>
              </Box>
              <Stack sx={{paddingX: 2}} direction="row" spacing={2}>
                <Link color="inherit" underline="none" href='https://dukaflani.com/links/contact_us'>
                  <Typography 
                    sx={{cursor: 'pointer'}} 
                    onClick={() => setDrawerOpen(false)} 
                    variant='subtitle2'
                    >
                      Contuct us
                    </Typography>
                </Link>
                <Link color="inherit" underline="none" href='https://dukaflani.com/legal/terms_and_conditions'>
                  <Typography 
                    sx={{cursor: 'pointer'}} 
                    onClick={() => setDrawerOpen(false)} 
                    variant='subtitle2'>
                      Terms
                    </Typography>
                </Link>
              </Stack>
              <Box sx={{paddingX: 2}}>
                <Typography variant='caption'>&copy; {new Date().getFullYear()} Jidraff Gathura</Typography>
              </Box>
          </div>
        </Drawer>

        {/* Search main site dialog */}
        <Dialog
            open={showSearchDialog}
            aria-labelledby="alert-dialog-title"    
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Search from main site?..."}
            </DialogTitle>
            <DialogContent onClick={() => setShowSearchDialog(false)}>
                <Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", padding: 5}}>
                  <Stack sx={{display: 'flex', justifyContent: "center", alignItems: "center"}} spacing={2}>
                    <CircularProgress/>
                    <Typography variant='body1'>{`Searching for: ${mySearchTerm}`}</Typography>
                  </Stack>
                </Box>
                <Link color="inherit" underline="none" variant='button' href={`https://www.dukaflani.com/results?search_query=${formattedSearchTerm}`}>
                    <Button variant='outlined' size='small'>
                      Yes, Search from dukaflani.com
                    </Button>
                </Link>
            </DialogContent>
        </Dialog>
    </> 
  )
}

export default HeaderDesktop