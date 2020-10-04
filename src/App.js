import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import apiKey from './Config';
import PhotoContainer from './components/PhotoContainer';
import SearchForm from "./components/SearchForm";
import Nav from "./components/Nav";

class App extends Component {
    constructor() {
        super();
        this.state = {
            photos: [],
            loading: true
        }
    }

    componentDidMount() {
        this.performSearch();
    }

    performSearch = (query = 'sunsets,waterfalls,rainbows') => {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
            .then(response => {
                this.setState({
                    photos: response.data.photos.photo,
                    loading: false
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error)
            })
    }

    render() {
        console.log(this.state.photos);
    return (
        <BrowserRouter>
            <div className="container">
                <Switch>
                    <SearchForm onSearch={this.performSearch} />
                </Switch>
                <Nav />
                {
                    (this.state.loading)
                        ? <p>Loading pictures...</p>
                        : <PhotoContainer data={ this.state.photos } />
                }
            </div>
        </BrowserRouter>
    );
  }

}

export default App;
