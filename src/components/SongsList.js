import React from 'react'
import { List } from '@chakra-ui/react'
import Song from './Song'

const SongsList = ({ returnedSongs }) => {
  return (
    <List>
      {returnedSongs.map(song =>
        <Song 
          key={song.id}
          title={song.title}
          url={song.url}
          artist={song.primary_artist.name}
          image={song.header_image_thumbnail_url}
          tabsUrl={`http://www.songsterr.com/a/wa/bestMatchForQueryString?s={${song.title}}&a={${song.primary_artist.name}}`}
        />
      )}
      
    </List>
  )
}

export default SongsList
