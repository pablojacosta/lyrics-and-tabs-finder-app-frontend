import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Flex, VStack, Heading } from '@chakra-ui/react'
import SearchInput from './components/SearchInput'
import SearchButton from './components/SearchButton'
import SongsList from './components/SongsList'
import * as ReactBootStrap from 'react-bootstrap'



const App = () => {

  const api_key = process.env.REACT_APP_API_KEY

  const [ update, setUpdate ] = useState(false)
  const [ input, setInput ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ returnedSongs, setReturnedSongs ] = useState([])
  const [ lyrics, setLyrics ] = useState(null)
  const [ selectedArtist, setSelectedArtist ] = useState('')
  const [ selectedTitle, setSelectedTitle ] = useState('')
  const [ loading, setLoading ] = useState(false)

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const options = {
    method: 'GET',
    url: 'https://genius.p.rapidapi.com/search',
    params: {q: `${newSearch}`},
    headers: {
      'x-rapidapi-host': 'genius.p.rapidapi.com',
      'x-rapidapi-key': api_key
    }
  }
  
  useEffect(() => {
    document.title = 'Lyrics and Tabs Finder'
  }, [])

  useEffect(() => {
    let didCancel = false

    if (!didCancel) {
      axios
      .request(options)
      .then(response => {
        setReturnedSongs(response.data.response.hits.map(hit => hit.result))
      }, setLoading(true)
      ).catch(error => {
        console.error(error)
      })
    }

    return () => {
      didCancel = true
      setLoading(false)
    }
  }, [update])

  useEffect(() => {
    setLoading(true)
    setUpdate((prevState) => !prevState)
  }, [newSearch])

  useEffect(() => {
    setLoading(false)
  }, [returnedSongs])

  const getData = () => {
    setLyrics(null)
    setUpdate((prevState) => !prevState)
    setNewSearch(input)
    setInput('')
    document.title = `Results for ${input}`
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setLyrics(null)
      setUpdate((prevState) => !prevState) 
      setNewSearch(input)
      setInput('')
      document.title = `Results for ${input}`
    }
  }

  /* Lyrics */

  const getLyrics = (url, title, artist) => {
    setSelectedArtist(artist)
    setSelectedTitle(title)

    const options = {
      method: 'GET',
      url: '/lyrics',
      responseType: 'text',
      params: {passedUrl:url }
    }
    
    axios
      .request(options)
      .then(response => {
        setLyrics(response.data)
      }, setLoading(true)
      ).catch(err => console.log(err))
  }

  useEffect(() => {
    setLoading(false)

    return () => {
      setLoading(false)
    }
  }, [lyrics])

  return(
    <Box 
      bg='black'
      backgroundSize='cover'
      h='100vh' 
      w='100%' 
      overflow='auto'
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
          {loading 
            ? 
              <Box>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <ReactBootStrap.Spinner animation="border" variant="light"/>
              </Box>
            :
            <SongsList 
            returnedSongs={returnedSongs}
            getLyrics={getLyrics}
            selectedArtist={selectedArtist}
            selectedTitle={selectedTitle}
            lyrics={lyrics}
            loading={loading}
          />
          }
        </VStack>
      </Flex>
    </Box>
  )
}

export default App

