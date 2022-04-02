import React, { useState, useEffect } from 'react'
import { Link, Box, Image, HStack, AspectRatio } from '@chakra-ui/react'
import axios from 'axios'

const Song = ({ title, url, artist, image, tabsUrl}) => {

  const [ lyrics, setLyrics ] = useState(null)

  const showLyrics = async (url) => {
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
        }).catch(err => console.log(err))
  }

  useEffect(() => {
    if (lyrics) {
      const newWindow = window.open("", "", "width=500, height=700, top=100, left=100")
      newWindow.document.body.innerHTML = `<h2><u>${title} (${artist})</u></h2>` + lyrics
      newWindow.document.title = `Lyrics for ${title} (${artist})`
    }
  }, [lyrics, title, artist])

  return (
    <Box 
      mt={2} 
      color='gray.400' 
      fontSize={['sm', 'md', 'lg', 'xl', '1xl', '2xl']} 
      fontWeight='bold'
      fontFamily='heading'
    >
      <HStack>
        <AspectRatio ratio={1} w={['20px', '30px', '40px', '50px']}>
          <Image src={image} borderRadius='5px'/>
        </AspectRatio>
        <Link onClick={() => showLyrics(url)}>{title} ({artist})</Link>
        <Link href={tabsUrl} isExternal>[Tabs]</Link>
      </HStack>
      
    </Box>
  )
}

export default Song
