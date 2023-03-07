import React, { useState } from 'react'
import PaginationMUI from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import themeColor from '../../theme/themecolor';
import { ThemeProvider } from '@emotion/react';
import './Pagination.scss'
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';

export default function Pagination({totalPost, postPerPage, currentPage, setCurrentPage}) {

    let pages = []

    for (let i = 1; i <= Math.ceil(totalPost/postPerPage); i++) {
        pages.push(i)
    }

// const [page, setPage] = useState()

// const handleChange = (e, p) => {
//     console.log(e, p)
//     setPage(p)
//     setCurrentPage(page)
// }

  return (

    <div className='pagination'>
       
        <div className="pagination__box">
        {/* <ThemeProvider theme={themeColor}>
            <Stack spacing={2}>
                        <PaginationMUI 
                        color='primary'
                        count={Math.ceil(totalPost/postPerPage)}
                        onChange={handleChange}
                        />
            </Stack>
        </ThemeProvider> */}
        <ThemeProvider theme={themeColor}>
        {
            pages.map((el, index) => {
                return (
                    // <Button 
                    // variant="contained"
                    // style={{width: '40px', height: '40px', borderRadius: '50%', boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)'}}
                    // key={index}
                    // onClick={() => setCurrentPage(el)}
                    // >{el}</Button>
                    <Fab 
                    key={index}
                    onClick={() => setCurrentPage(el)}
                    size="small" 
                    style={{margin: '0em 0.3em'}}
                    color={el === currentPage ? 'primary' : ''} 
                    aria-label="add">
                    {el}
                  </Fab>
                )
            })
        }
        </ThemeProvider>
        </div>
    </div>
  )
}
