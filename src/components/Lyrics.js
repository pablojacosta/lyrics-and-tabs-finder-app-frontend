import React from 'react'
import { Box, Text } from '@chakra-ui/react'

const Lyrics = ({ lyrics }) => {
  return(
    <Box>
      <Text>{lyrics}</Text>
    </Box>
  )
}

export default Lyrics
