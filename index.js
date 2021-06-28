let SpotifyAPI = (function () {
    /**
     * Creates an instance of the wrapper
     * @constructor
     */
    const Constr = function () {
    };
    Constr.prototype = {
        constructor: SpotifyAPI,
    };

    /**
     * Extract tracks from the Spotify URL or URI
     * @param {String} clientID The Client ID of your Spotify Developers App
     * @param {String} clientSecret The Client Secret from your Spotify Developers App
     * @param {String} redirectUri The Redirect URI from your Spotify Developers App
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    Constr.prototype.initializeAPI = async function (clientID, clientSecret, redirectUri) {
        const spotifyApiConfig = {
            clientId: clientID,
            clientSecret: clientSecret,
            redirectUri: redirectUri,
        };

        const express = require("express");
        const app = express();
        const scopes = [
            "ugc-image-upload",
            "user-read-playback-state",
            "user-modify-playback-state",
            "user-read-currently-playing",
            "streaming",
            "app-remote-control",
            "user-read-email",
            "user-read-private",
            "playlist-read-collaborative",
            "playlist-modify-public",
            "playlist-read-private",
            "playlist-modify-private",
            "user-library-modify",
            "user-library-read",
            "user-top-read",
            "user-read-playback-position",
            "user-read-recently-played",
            "user-follow-read",
            "user-follow-modify",
        ];

        const SpotifyWebApi = require("spotify-web-api-node");

        this.spotifyApi = new SpotifyWebApi(spotifyApiConfig);

        app.get("/login", (req, res) => {
            res.redirect(this.spotifyApi.createAuthorizeURL(scopes));
        });
        app.get("/callback", (req, res) => {
            const error = req.query.error;
            const code = req.query.code;

            if (error) {
                console.error("Callback Error:", error);
                res.send(`Callback Error: ${error}`);
                return;
            }

            this.spotifyApi
                .authorizationCodeGrant(code)
                .then((data) => {
                    const access_token = data.body["access_token"];
                    const refresh_token = data.body["refresh_token"];
                    const expires_in = data.body["expires_in"];

                    this.spotifyApi.setAccessToken(access_token);
                    this.spotifyApi.setRefreshToken(refresh_token);

                    res.send("Success! You can  now close the window.");

                    setInterval(async () => {
                        const data = await this.spotifyApi.refreshAccessToken();
                        const access_token = data.body["access_token"];

                        this.spotifyApi.setAccessToken(access_token);
                    }, (expires_in / 2) * 1000);
                })
                .catch((error) => {
                    console.error("Error getting Tokens:", error);
                    res.send(`Error getting Tokens: ${error}`);
                });
        });

        app.listen(8888, () =>
            console.log(
                `Login to Spotify with your redirect URL of the current machine after opening it on the firewall. If you're running it locally use this URL, http://localhost:8888/login`
            )
        );
    };

    /**
     * Extract tracks from the Spotify URL or URI
     * @param {String} SpotifyURL The URI or URL of the Spotify link you want to extract tracks from
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    Constr.prototype.findTracks = async function (SpotifyURL) {
        const spotifyURI = require("spotify-uri");

        let parsedURL;
        try {
            parsedURL = spotifyURI.parse(SpotifyURL);
        } catch (error) {
            return Promise.reject(
                new Error(`${SpotifyURL} couldn't be parsed as a valid URL.`)
            );
        }

        if (!parsedURL.type) {
            return Promise.reject(
                new Error(`${SpotifyURL} couldn't be parsed as a valid Spotify URL.`)
            );
        }

        if (parsedURL.type === "track")
            return await this.spotifyApi.getTrack(parsedURL.id);
        else if (parsedURL.type === "playlist")
            return await this.spotifyApi.getPlaylistTracks(parsedURL.id);
        else if (parsedURL.type === "album")
            return await this.spotifyApi.getAlbumTracks(parsedURL.id);
    };

    return Constr;
})
SpotifyAPI = SpotifyAPI();

module.exports = SpotifyAPI;
