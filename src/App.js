import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
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
            query: '',
            loading: true,
            sunsets: [],
            waterfalls: [],
            rainbows: []
        }
    }

    componentDidMount() {
        this.performSearchRainbows();
        this.performSearchSunsets();
        this.performSearchWaterFalls();
    }

    performSearch = (query) => {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
            .then(response => {
                this.setState({
                    photos: response.data.photos.photo,
                    query:query,
                    loading: false
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error)
            })
    }

    performSearchSunsets = (query = 'sunsets') => {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
            .then(response => {
                this.setState({
                    sunsets: response.data.photos.photo,
                    loading: false
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error)
            })
    }

    performSearchWaterFalls = (query = 'waterfalls') => {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
            .then(response => {
                this.setState({
                    waterfalls: response.data.photos.photo,
                    loading: false
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error)
            })
    }

    performSearchRainbows = (query = 'rainbows') => {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
            .then(response => {
                this.setState({
                    rainbows: response.data.photos.photo,
                    loading: false
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error)
            })
    }

    render() {
    return (
        <BrowserRouter>
            <div className="container">
                <SearchForm onSearch={ this.performSearch } photos={ this.state.photos} query={this.state.query} />
                <Nav />
                {
                    (this.state.loading)
                        ? <p>Loading pictures...</p>
                        : <Switch>
                            <Route exact path='/' render={
                                () => <Redirect to='/waterfalls' />
                            }/>
                            <Route exact path='/sunsets' render={
                                () => <PhotoContainer
                                    data={ this.state.sunsets }
                                    query='sunsets'
                                />
                            }/>
                            <Route exact path='/waterfalls' render={
                                () => <PhotoContainer
                                    data={ this.state.waterfalls }
                                    query='waterfalls'
                                />
                            }/>
                            <Route exact path='/rainbows' render={
                                () => <PhotoContainer
                                    data={ this.state.rainbows }
                                    query='rainbows'
                                />
                            }/>
                            <Route exact path='/search/:query' render={
                                () => <PhotoContainer
                                    data={ this.state.photos }
                                    query={ this.state.query }
                                    loading={ this.state.loading }
                                />
                            }/>
                        </Switch>
                }
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
