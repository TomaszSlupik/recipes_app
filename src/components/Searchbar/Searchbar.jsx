import React, {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Mysearch from '../../styles/mysearch';
import './Searchbar.scss'

export default function Searchbar(props) {

    const [searchRecipeInput, setSearchRecipeInput] = useState('')

    const handlerSearch = (e) => {
        setSearchRecipeInput(e.target.value)
        props.searchRecipe(searchRecipeInput)
    }


  return (
    <div className='searchbar'>
       <Mysearch
       placeholder='Szukaj'
       value={searchRecipeInput}
       onChange={handlerSearch}
       onKeyDown={props.clikBackspace}
       />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  )
}
