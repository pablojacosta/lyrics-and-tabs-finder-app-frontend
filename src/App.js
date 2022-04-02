import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Flex, VStack, Heading } from '@chakra-ui/react'
import SearchInput from './components/SearchInput'
import SearchButton from './components/SearchButton'
import SongsList from './components/SongsList'

const App = () => {

  const [ input, setInput ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ returnedSongs, setReturnedSongs ] = useState([])

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const api_key = process.env.REACT_APP_API_KEY

  const options = {
    method: 'GET',
    url: 'https://genius.p.rapidapi.com/search',
    params: {q: `${newSearch}`},
    headers: {
      'x-rapidapi-host': 'genius.p.rapidapi.com',
      'x-rapidapi-key': api_key
    }
  }

  useEffect((() => {
    axios
      .request(options)
      .then(response => {
        setReturnedSongs(response.data.response.hits.map(hit => hit.result))
      }
      ).catch(error => {
      console.error(error)
    })
  }), [newSearch])

  const getData = () => {
    setNewSearch(input)
    setInput('')
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setNewSearch(input)
      setInput('')
    }
  }

  return(
    <Box 
      bg='black'
      backgroundSize='cover'
      h='100vh' 
      w='100%' 
      overflow='hidden'
    >
      <Flex 
        flexDir='row' 
        justifyContent='center' 
        alignItems='center' 
        h={50}
      >
        <Heading 
          size='2xl' 
          p={5} 
          alignContent='center' 
          mt={10}
          textColor='gray.600'
        >
          Lyrics & Tabs Finder
        </Heading>
      </Flex>
      <Flex 
        flexDir='row' 
        justifyContent='center' 
        alignItems='top' 
        h='full' 
        mt={10}
      >
        <VStack>
          <Flex 
            flexFlow='row wrap'
            gap={['10px', '30px']}
            justifyContent='center'
          >
            <SearchInput 
              input={input}
              handleInputChange={handleInputChange}
              onKeyDown={onKeyDown}
            />
            <SearchButton 
              getData={getData}
            />
          </Flex>
          <SongsList 
           returnedSongs={returnedSongs}
          />
        </VStack>
      </Flex>
    </Box>
  )
}

export default App
