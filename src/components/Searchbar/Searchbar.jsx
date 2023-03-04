import React, {useState} from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { styled, alpha } from '@mui/material/styles';
import Mysearch from '../../styles/mysearch';
import './Searchbar.scss'

export default function Searchbar({searchRecipe}) {

    const [searchRecipeInput, setSearchRecipeInput] = useState('')

    const handlerSearch = (e) => {
        setSearchRecipeInput(e.target.value)
        searchRecipe(searchRecipeInput)
    }

  return (
    <div className='searchbar'>
       <Mysearch
       placeholder='Szukaj'
       value={searchRecipeInput}
       onChange={handlerSearch}
       />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  )
}
