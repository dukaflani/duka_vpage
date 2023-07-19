// React Imports
import { useEffect, useState } from "react";

// Nextjs Imports
import { useRouter } from "next/router"
import Image from "next/legacy/image";

// MUI Imports
import { Box, Stack, Typography, Card, CardContent, colors, Button, Link } from "@mui/material"

// Tanstack Query
import { useMutation } from "@tanstack/react-query";

// NPM Imports
import numeral from 'numeral';
import { useDispatch, useSelector } from "react-redux";

// Icons
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { pageHasChanged, setRegularPageView } from "@/redux/features/navigation/navigationSlice";
import { addProductView } from "@/axios/axios";




const TabProductCard = ({ product, data, loadingProduct }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const userCountry = useSelector((state) => state.auth.country)
    const userIpAddress = useSelector((state) => state.auth.ip_address)
    const [user_country, setUser_country] = useState(null)
    const [user_ip, setUser_ip] = useState(null)

    useEffect(() => {
        setUser_country(userCountry)
        setUser_ip(userIpAddress)
    }, [userCountry, userIpAddress])

    const newProductView = {
        product: product?.id,
        product_profile: product?.customuserprofile,
        ip_address: user_ip,
        country: user_country,
        referral_url: "https://dukaflani.com",
    }

    const { mutate: addNewProductView } = useMutation(addProductView, {
        onSuccess: (data, _variables, _context) => {
        //   console.log("product view success:", data)
        },
        onError: (error, _variables, _context) => {
        //   console.log("product view error:", error)
        },
      })

    

    const handleProductClick = () => {
        dispatch(pageHasChanged(true))
        dispatch(setRegularPageView())
        addNewProductView(newProductView)
        // router.push({ pathname: `/shop/${product?.id}`})
    }


  return (
    <Box>
        <Stack spacing={2}>
            <Box>
                <Stack>
                    <Typography variant="subtitle2">PRODUCTS & MERCHANDISE</Typography>
                    <Typography variant="caption">{`Buy products/albums promoted or sold by ${data?.stage_name}`}</Typography>
                </Stack>
            </Box>
            {loadingProduct ? (<Typography variant="caption">Loading product card...</Typography>) : (<Box>
                <Card variant="outlined" onClick={handleProductClick} square>
                        {/* <CardMedia
                            sx={{ height: 320 }}
                            image={product?.image}
                            title={product?.title}
                        /> */}
                        <Box 
                            sx={{ backgroundColor: colors.grey[200], width: '100%', position: "relative", cursor:'pointer'}}
                            >
                            <Image 
                                src={product?.image} 
                                layout='responsive'
                                alt={product?.title}
                                width='100%'
                                height={100}
                                />
                        </Box>
                        {product?.is_sponsored ? <Box sx={{padding:0.5, backgroundColor: colors.blue[100]}}>
                            <Typography sx={{color: colors.blue[800]}} variant="body2">Sponsored</Typography>
                        </Box>
                        :
                        <Box sx={{padding:0.5, backgroundColor: colors.grey[300]}}>
                            <Typography sx={{color: colors.grey[800]}} variant="body2">{product?.status_description}</Typography>
                        </Box>
                        }
                        <CardContent>
                            <Box>
                                <Stack>
                                    <Box sx={{display: 'flex', alignItems: 'start', justifyContent: 'space-between'}}>
                                        <Typography className="line-clamp-2 line-clamp" variant="subtitle1">{product?.title}</Typography>
                                        {/* <Tooltip title='Order on WhatsApp'>
                                            <IconButton>
                                                <WhatsAppOutlined style={{cursor: 'pointer', fontSize: 20}} />
                                            </IconButton>
                                        </Tooltip> */}
                                    </Box>
                                    <Stack>
                                        <Typography variant="h6">{product?.local_currency}{numeral(product?.local_price).format('0,0')}</Typography>
                                    </Stack>
                                    <Stack>
                                        <Typography className="line-clamp-2 line-clamp" variant="body2">{product?.description}</Typography>
                                    </Stack>
                                    <Link href={`https://dukaflani.com/shop/${product?.id}`} sx={{paddingTop: 2, width: '100%'}}>
                                        <Button startIcon={<LocalOfferOutlinedIcon/>} fullWidth size="small" variant="contained">View details</Button>
                                    </Link>
                                </Stack>
                            </Box>
                        </CardContent>
                </Card>
            </Box>)}
        </Stack>
    </Box>
  )
}

export default TabProductCard