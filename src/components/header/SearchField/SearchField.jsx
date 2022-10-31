import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import routes from '../../../shared/constants/routes';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
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
      width: '30ch',
      '&:focus': {
        width: '50ch',
      },
    },
  },
}));


const SearchField = () => {
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const searchHandler = (e) => {
    if (e.key === 'Enter') {
      console.log('search with: ', value)
      navigate({
        pathname: routes.SEARCH,
        search: `?value=${value}&byTag=false`
      })
      setValue('')
    }
  }
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyDown={searchHandler}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  )
}

export default SearchField