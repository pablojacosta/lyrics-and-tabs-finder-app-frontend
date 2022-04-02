import React from 'react'
import { Button } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';

const SearchButton = ({ getData }) => {
  return (
    <Button
    leftIcon={<SearchIcon />}
      onClick={getData}
      colorScheme='teal' 
      border='1px'
    >
      Search!
    </Button>
  )
}

export default SearchButton