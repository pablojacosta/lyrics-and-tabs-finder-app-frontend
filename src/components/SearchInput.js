import React from 'react'
import { Input } from '@chakra-ui/react'

const SearchInput = ({ input, handleInputChange, onKeyDown }) => {
  return (
    <Input
      variant='Unstyled' 
      placeholder='Type Artist, Song and/or Lyric phrase'
      width={300}
      value={input}
      onChange={handleInputChange}
      textColor='black'
      onKeyDown={onKeyDown}
    >
    </Input>
  )
}

export default SearchInput