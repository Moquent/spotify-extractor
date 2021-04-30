# Spotify Extractor

Spotify Extractor helps you use the Spotify Developers API with ease. It requires only 3 parameters to get you going!

## Installation

Use the NPM package manager to install spotify-extractor

```bash
npm install spotify-extractor
```

## Usage

Code:
```javascript
const SpotifyExtractor = require("spotify-extractor");
const Spotify = new SpotifyExtractor();

// you would have to login to Spotify with this method to use the other
// methods like findTracks, without errors.
await Spotify.initializeAPI(ClientID, ClientSecret, RedirectURI);

await Spotify.findTracks(SpotifyURL);
```

## Example
Searching For A Playlist:
```javascript
await Spotify.findTracks("https://open.spotify.com/playlist/37i9dQZEVXbMDoHDwVN2tF");
```
Result:
```json
{
  body: {
    href: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?offset=0&limit=100',
    items: [
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object]
    ],
    limit: 100,
    next: null,
    offset: 0,
    previous: null,
    total: 50
  },
  headers: {},
  statusCode: 200
}
```
Searching For A Track:
```javascript
await Spotify.findTracks("https://open.spotify.com/track/3Ofmpyhv5UAQ70mENzB277");
```

Result:
```json
{
  body: {
    album: {
      album_type: 'single',
      artists: [Array],
      available_markets: [Array],
      external_urls: [Object],
      href: 'https://api.spotify.com/v1/albums/7vus4Q8r5DS2Dl1JClxEsA',
      id: '7vus4Q8r5DS2Dl1JClxEsA',
      images: [Array],
      name: 'Astronaut In The Ocean',
      release_date: '2021-01-06',
      release_date_precision: 'day',
      total_tracks: 1,
      type: 'album',
      uri: 'spotify:album:7vus4Q8r5DS2Dl1JClxEsA'
    },
    artists: [ [Object] ],
    available_markets: [],
    disc_number: 1,
    duration_ms: 132780,
    explicit: false,
    external_ids: { isrc: 'USAT22100017' },
    external_urls: {
      spotify: 'https://open.spotify.com/track/3Ofmpyhv5UAQ70mENzB277'
    },
    href: 'https://api.spotify.com/v1/tracks/3Ofmpyhv5UAQ70mENzB277',
    id: '3Ofmpyhv5UAQ70mENzB277',
    is_local: false,
    name: 'Astronaut In The Ocean',
    popularity: 97,
    preview_url: '',
    track_number: 1,
    type: 'track',
    uri: 'spotify:track:3Ofmpyhv5UAQ70mENzB277'
  },
  headers: {},
  statusCode: 200
}
```
## Using the API yourself
The property "spotifyApi" holds many methods for managing your Spotify account, searching and finding tracks, etc.
```javascript
await Spotify.spotifyApi
```

## Contributing
To contribute into this package, pull requests can be done at https://github.com/Moquent/spotify-extractor

## License
[ISC](https://choosealicense.com/licenses/isc/)
