import React, { useEffect } from "react"
import { Box, Link } from '@chakra-ui/react'

const ChosenSong = ({ selectedTitle, selectedArtist, lyrics }) => {

    const createMarkup = () => {
        return {__html: `<h2><u>${selectedTitle} (${selectedArtist})</u></h2><br>` + lyrics + '<br><br>'}
    }

    useEffect(() => {
        document.title = `${selectedArtist}'s ${selectedTitle} Lyrics`
    }, [lyrics])

    return (
        <>
            <br></br>
            <Link 
                href={`http://www.songsterr.com/a/wa/bestMatchForQueryString?s={${selectedTitle}}&a={${selectedArtist}}`}
                isExternal
                mt={2} 
                color='gray.400' 
                fontSize={['sm', 'md', 'lg', 'xl', '1xl', '2xl']} 
                fontWeight='bold'
                fontFamily='heading'
            >
                --- Tabs for {selectedArtist}'s {selectedTitle} ---
            </Link>
            <br></br>
            <Box 
                mt={2} 
                color='gray.400' 
                fontSize={['sm', 'md', 'lg', 'xl', '1xl', '2xl']} 
                fontWeight='bold'
                fontFamily='heading'
                textAlign='center'
            >
                 <div dangerouslySetInnerHTML={createMarkup()}/>
            </Box>
        </>
    )
}

export default ChosenSong