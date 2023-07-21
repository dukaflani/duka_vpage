// React Imports
import { useEffect, useMemo } from "react"

// MUI Imports
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material"

// NPM Imports
import { useCookies } from "react-cookie"
import { useDispatch, useSelector } from "react-redux"

// Project Imports
import { setDarkMode, setLightMode } from "@/redux/features/theme/themeSlice"



const MyThemeProvider = ({ children }) => {
    const dispatch = useDispatch()
    const [cookie, setCookie] = useCookies(["Mode"])
    const is_darkMode = useSelector((state) => state.theme.isDarkMode)
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')


   
   useEffect(() => {
     if (cookie.LightMode == "dark") {
        dispatch(setDarkMode("dark"))
     } else {
        dispatch(setLightMode("light"))
     }
   }, [cookie.LightMode])
   
   const darkTheme = useMemo(() => createTheme({
     palette: {
      //  mode: is_darkMode === "dark" || prefersDarkMode === true ? "dark" : is_darkMode === "light" && prefersDarkMode === true ? "light" : "light"
      mode: "dark"
     }
   }), [is_darkMode, prefersDarkMode])


  return (
    <ThemeProvider theme={darkTheme}>
        { children }
    </ThemeProvider>
  )
}

export default MyThemeProvider