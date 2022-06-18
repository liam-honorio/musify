import React, {useState, useEffect} from 'react'
import useAuth from './useAuth'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult'
import Player from './Player'
import Img from './images/img.png'

const spotifyApi = new SpotifyWebApi({
  clientId: '1a213cffe54d4236a5ec14295e6a1b2d'
})

export default function Dashboard({code}) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    
    function chooseTrack(track) {
      setPlayingTrack(track)
      setSearch('')
    }


    useEffect(() =>{
      if(!accessToken) return
      spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
      if (!search) return setSearchResults([])
      if (!accessToken) return
  
      let cancel = false
      spotifyApi.searchTracks(search).then(res => {
        if (cancel) return
        setSearchResults(
          res.body.tracks.items.map(track => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image
                return smallest
              },
              track.album.images[0]
            )
  
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
            }
          })
        )
      })
  
      return () => (cancel = true)
    }, [search, accessToken])

  return (
      <div style={{margin: '0px'}}>
      
      <Container className="d-flex flex-column py-2" style={{ height: "100vh"}}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 70px 20px 70px',
        color: 'white',
        backgroundColor: 'black',
          }}> <a href='#' style={{textDecoration: 'none', color: 'white',}}>Musify</a> <span>Seja Bem vindo</span>
      </header>
      <nav><h4 style={{display: 'flex', justifyContent: 'center'}}>Selecione como deseja filtrar as músicas</h4></nav>
      <form style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <fieldset style={{border: 'none'}}>
            Ao vivo <input type="checkbox" />
        </fieldset>
        <fieldset style={{border: 'none'}}>
            Acustica <input type="checkbox"/>
        </fieldset>
        <fieldset style={{border: 'none'}}>
            Agitada <input type="checkbox"/>
        </fieldset>
        <fieldset style={{border: 'none'}}>
            Instrumental <input type="checkbox"/>
        </fieldset>
        <fieldset style={{border: 'none'}}>
            Apenas voz <input type="checkbox"/>
        </fieldset>
        <fieldset style={{border: 'none'}}>
            Alta <input type="checkbox"/>
        </fieldset>
        <fieldset style={{border: 'none'}}>
            Rápida <input type="checkbox"/>
        </fieldset>
        <fieldset style={{border: 'none'}}>
            Lenta <input type="checkbox"/>
        </fieldset>
        <fieldset style={{border: 'none'}}>
            Dançante <input type="checkbox"/>
        </fieldset>
        

    </form>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <img src={Img} style={{ width: '300px', height: '300px', paddingTop: '50px' }}/>
      <Form.Control
        style={{marginTop: '50px', borderBox:'box-sizing', border: '3px solid black', borderRadius: '8px'}}
        type="search"
        placeholder="Digite um artista/musica"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      </div>
      <div className="flex-grow-1 my-2" style={{ display: 'flex', overflow: 'auto', gap: '20px', margin: '20px 0 20px 0' }}>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        </div>

        <div style={{position: 'absolute', bottom: '0', width: '100%'}}>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </div>
      </Container>
      </div>
  )
}
