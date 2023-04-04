import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import CoinListTablex from './CoinListTable'
function CoinList() {
    return (
        <div>
            <Container sx={{ my: 5 }} maxWidth="lg">
                <Box sx={{ width: "80px", margin: "1rem auto" }}>
                    <img className='crypto_img' src={process.env.PUBLIC_URL + '/crypto_img.png'} alt="crypto currency" />
                </Box>
                <Typography sx={{ py: 2 }} align='center' variant="h4" component="h4">Crypto currency list</Typography>
                <CoinListTablex />
            </Container>
        </div>
    )
}

export default CoinList
