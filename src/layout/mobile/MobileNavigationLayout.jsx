// React Imports
import { useEffect, useState } from 'react'

// NPM Imports
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

// Project Imports
import HeaderMobile from '@/components/reusableComponents/HeaderMobile'
import { getCurrentUser, getRefreshToken, getUserProfile, renewAccessToken } from '@/axios/axios'
import { updateProfileInfo, updateToken, updateUserInfo } from '@/redux/features/auth/authSlice'


const MobileNavigationLayout = ({ children, setIsDarkMode, isDarkMode, value, setValue }) => {
  const dispatch = useDispatch()
  const newToken = useSelector((state) => state.auth.token) 
  const { data: currentUser } = useQuery(['current-user', newToken], (newToken) => getCurrentUser(newToken), {
    onSuccess: (data, _variables, _context) => {
      dispatch(updateUserInfo(data))
    },
    enabled: !!newToken
  })
  
  
  const userID = currentUser?.id 
  const { data: userProfile, isLoading: loadingProfile } = useQuery(["user-profile", userID], (userID) => getUserProfile(userID), {
    onSuccess: (data, _variables, _context) => {
      dispatch(updateProfileInfo(data[0]))
    },
    enabled: !!userID
  })
  
  // Get refresh token
  const [myRefreshToken, setMyRefreshToken] = useState(null)
  const { data: refreshToken } = useQuery(['refresh-token'], getRefreshToken, {
    onSuccess: (data, _variables, _context) => {
      setMyRefreshToken(data)
    }
  })
  
  // Renew access token
  const currentRefreshToken = {
    refresh: myRefreshToken,
  }
  const { data: newAccessToken } = useQuery(['new-access-token', currentRefreshToken],  (currentRefreshToken) => renewAccessToken (currentRefreshToken), {
    onSuccess: (data, _variables, _context) => {
      // dispatch to store
      dispatch(updateToken(data?.access))
    },
    refetchInterval: 270000,
    enabled: !!myRefreshToken
  })
  
  // On Logout
  const deleteToken = useSelector((state) => state.auth.deleteRefreshToken) 

  useEffect(() => {
    if (deleteToken) {
      setMyRefreshToken(null)
    }
    
  }, [deleteToken])
  

  return (
    <>
      <HeaderMobile setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} />
        <>{children}</>
    </>
  )
}

export default MobileNavigationLayout