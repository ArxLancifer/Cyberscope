import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';




function CoinDetails() {
    const { coinId } = useParams();
    const [coinDetails, setCoinDetails] = useState({});


    useEffect(() => {
        handleGetCoinDetails();
    }, [])

    async function handleGetCoinDetails() {
        try {
            const response = await axios.get(`http://localhost:5000/coins/${coinId}`);
            const coinData = response.data;
            setCoinDetails(coinData)
        } catch (error) {
            console.log(error)
        }
    }

    const cardBoxStyles = {
        color: '#fff',
        bgcolor: '#313131',
        border: 2,
        borderColor: '#616161',
        borderRadius: 1,
        boxShadow: "2px 2px 2px 3px rgba(0, 0, 0, 0.15)",
        width: "50%",
        padding: "0.2rem",
        mx: "auto"
    }

    return (
        <div>
            <Container>
                <Box sx={{ width: "80px", margin: "1rem auto" }}>
                    <img className='crypto_img' src={process.env.PUBLIC_URL + '/crypto_img.png'} alt="crypto currency" />
                </Box>
                <Typography sx={{ py: 2 }} align='center' variant="h4" component="h4">Coin details</Typography>
                <Grid container spacing={1} sx={cardBoxStyles} >
                    <Grid item xs={4}>
                        <img className='detail-coin-img' src={coinDetails.image} alt='current coin' />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align='center' variant="h6">{coinDetails.name} Details</Typography>
                        <Typography variant="caption" display="block" >Name: {coinDetails.name}</Typography>
                        <Divider />
                        <Typography variant="caption" display="block" >Current price: {coinDetails.current_price} $</Typography>
                        <Divider />
                        <Typography variant="caption" display="block" >Highest price in 24h: {coinDetails.high_price_24h} $</Typography>
                        <Divider />
                        <Typography variant="caption" display="block" >Lowest price in 24h: {coinDetails.low_price_24h} $</Typography>
                        <Divider />
                        <Typography className='description-links' variant="caption" display="block" dangerouslySetInnerHTML={{__html:"Description:" + coinDetails.description}} ></Typography>
                        <Divider />
                        <Typography variant="subtitle1" display="block" >Price history:</Typography>
                        <Box>
                            <Typography variant="caption" display="block"><i>Last 24 hours: </i>
                                <span>{coinDetails.price_change_24h}</span></Typography>
                            <Typography variant="caption" display="block"><i>Last 7 days: </i> {coinDetails.price_change_7d}</Typography>
                            <Typography variant="caption" display="block"><i>Last 14 days: </i> {coinDetails.price_change_14d}</Typography>
                            <Typography variant="caption" display="block"><i>Last 30 days: </i> {coinDetails.price_change_30d}</Typography>
                            <Typography variant="caption" display="block"><i>Last year: </i> {coinDetails.price_change_1y}</Typography>
                        </Box>
                        <Divider />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default CoinDetails
