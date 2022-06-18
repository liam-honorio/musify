import React from 'react'
import { authEndpoint, clientId, redirectUri, scopes } from "./config";

//const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=1a213cffe54d4236a5ec14295e6a1b2d&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
const AUTH_URL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=code&show_dialog=true`  

export default function Login() {
  return (
    <body style={{height: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', paddingTop: '250px'}}>
      <h1 style={{}}>Bem vindo ao <span style={{color: '#2271B3'}}>Musify</span></h1>
      <h2>Faça seu login no Spotify</h2>
      <a href={AUTH_URL} style={{color: 'black', 
                                  textDecoration: 'none', 
                                  fontWeight:'bold' ,
                                  width: '200px', 
                                  height: '40px', 
                                  backgroundColor: '#1eb760', 
                                  borderRadius: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                
                                }}>ENTRAR</a>
    </body>
  )
}
