const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '1a213cffe54d4236a5ec14295e6a1b2d',
        clientSecret: '67621855e92948c29cd8cadbfec78a3f',
        refreshToken,
    })

    spotifyApi.refreshAccessToken().then(
        (data) => {
          res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in
          })
        }).catch((error) => {
            console.log(error)
            res.sendStatus(400)
        })
})



app.post("/login", (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '1a213cffe54d4236a5ec14295e6a1b2d',
        clientSecret: '67621855e92948c29cd8cadbfec78a3f'
    })

    spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      res.sendStatus(400)
    })
})

app.listen(3001)