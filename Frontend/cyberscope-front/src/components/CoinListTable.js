import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider, Typography } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
function CoinListTable() {

    //store pagination state in your own state
    const [pagination, setPagination] = useState({
        pageIndex: 1,
        pageSize: 25,
    });
    const [listData, setListData] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const navigate = useNavigate();
    async function handleListFetch() {
        try {

        setIsloading(true);
        const response = await axios.post('https://crypto-proxy-api.onrender.com/', {pagination:pagination});
        const data = response.data;
        setListData(data)
        setIsloading(false);
        } catch (error) {
            console.log(error.response.data);
        }
       
    }

    useEffect(() => {
        handleListFetch()
    }, [pagination.pageIndex, pagination.pageSize])



    const theme = createTheme({
        palette: {
            mode: "dark",
        },
        components: {
            MuiToolbar: {
                styleOverrides: {
                    gutters: {
                        borderRadius: "5px",
                    }
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: "10px"
                    }
                }
            },
            MuiTablePagination: {
                styleOverrides: {
                    root: {
                        border: "none"
                    }
                }
            }

        }
    })



    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
            maxSize: 100,
        },
        {
            accessorKey: 'symbol',
            header: 'Symbol',
            maxSize: 100,
            Cell: ({ row }) => (
                <Box sx={{ width: "1.2rem", display: "flex", alignItems: "center" }}>
                    <img className='coin-symbol-icon' src={`${row.original.image}`} alt='coin icon' />
                    <Typography sx={{ marginBottom: 0, marginLeft: 1 }} variant="caption" gutterBottom>{row.original.symbol}</Typography>
                </Box>
            ),
        },
        {
            accessorKey: 'current_price',
            header: 'Current price $',
            maxSize: 120,
        },
        {
            accessorKey: 'high_24h',
            header: 'High 24H $',
            maxSize: 120,
        },
        {
            accessorKey: 'low_24h',
            header: 'Low 24H $',
            maxSize: 120,
        },
        {
            accessorKey: 'market_cap_change_percentage_24h',
            header: '% Price change 24H',
            maxSize: 120,
        }
    ]


    return (
        <ThemeProvider theme={theme}>
            <MaterialReactTable
                columns={columns}
                data={listData}
                enableDensityToggle={false}
                enablePagination={true}
                initialState={{ density: 'compact' }}
                state={{ isLoading: isLoading, pagination }}
                manualPagination
                rowCount={10961} // Provided static coin count to avoid extra request to get array of 10000 items to add lazyloading
                onPaginationChange={setPagination}
                muiTableBodyRowProps={({ row }) => ({
                    'data-coin-id': row.original.id,
                    onClick: (event) => {
                        event.stopPropagation()
                        navigate(`/details/${event.currentTarget.dataset.coinId}`)
                    }
                })}
            />
        </ThemeProvider>
    );

}

export default CoinListTable;