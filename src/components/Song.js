import React, { useState, useEffect } from 'react'
import { Link, Box, Image, HStack, AspectRatio, Spinner } from '@chakra-ui/react'
import ChosenSong from './ChosenSong'

const Song = ({ title, url, artist, image, tabsUrl, getLyrics, selectedTitle, selectedArtist, lyrics }) => {

  return (
    lyrics
      ?
        <ChosenSong 
          selectedArtist={selectedArtist}
          selectedTitle={selectedTitle}
          lyrics={lyrics}
        />  
      :
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
            <Link onClick={() => getLyrics(url, title, artist)}>{title} ({artist})</Link>
            <Link href={tabsUrl} isExternal>[Tabs]</Link>
          </HStack>
          
        </Box>
  )
}

export default Song