import React, { Component } from 'react';
import './Main.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    var access_token='BQDlL5GVK7z8ShuBb0GbCLG33ksNEiHLcHcr_b5vFnPtCw-uTlQSkWpQJ11MEFQe-o59dG2h-5KJRZZABIJxnI_6gs56faC0aMLIfc_ypEVkCUeSKLuJ1C7noiKlkk4h93wxI_PxK3SUlNE-QqHxIoGx-NkqJSrNlxU&refresh_token=AQBfo9jKwrKCzsu3t1X6hnFRun7pKXNdCEUd3mwpJQy3P5LoTGIx15bqVmGMh1M__egpRDHYqWnNo1DZC0lK7GUEvwftbYFInvYUmOaHsqI3g5GEtf-Lpauh_ASnop7DSJ8';

    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    };

    fetch(FETCH_URL, myOptions)
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({artist});

      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US`;
      fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const { tracks } = json;
        this.setState({tracks});
      })
    });
  }

  render() {
    return (
      <div className="App">
        <div className="appTitle">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search()
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
            ?
              <div>
                <Profile
                  artist={this.state.artist}
                />
                <Gallery
                  tracks={this.state.tracks}
                />
              </div>
            : <div></div>
        }
      </div>
    )
  }
}

export default App;
