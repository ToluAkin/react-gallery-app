import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import apiKey from './Config';
import SearchForm from "./components/SearchForm";
import Nav from "./components/Nav";
import PhotoContainer from './components/PhotoContainer';
import InvalidPage from "./components/InvalidPage";

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
        this.performSearch();
        this.performSearch('rainbows');
        this.performSearch('sunsets');
        this.performSearch('waterfalls');
    }

    performSearch = (query) => {
        this.setState({ loading:true })
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
            .then(response => {
                if (query === 'sunsets' || query === 'waterfalls'|| query ==='rainbows') {
                    this.setState({
                        [query]: response.data.photos.photo,
                        loading: false
                    })
                } else {
                    this.setState({
                        photos: response.data.photos.photo,
                        query,
                        loading: false
                    });
                }
            })
            .catch(error => {
                console.log('Error fetching and parsing data:', error)
            })
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <SearchForm onSearch={ this.performSearch } />
                    <Nav />
                    <Switch>
                        <Route exact path='/' render={
                            () => <Redirect to='/waterfalls' />
                        }/>
                        <Route exact path='/sunsets' render={
                            () => <PhotoContainer
                                data={ this.state.sunsets }
                                loading={ this.state.loading }
                                query='sunsets'
                            />
                        }/>
                        <Route exact path='/waterfalls' render={
                            () => <PhotoContainer
                                data={ this.state.waterfalls }
                                loading={ this.state.loading }
                                query='waterfalls'
                            />
                        }/>
                        <Route exact path='/rainbows' render={
                            () => <PhotoContainer
                                data={ this.state.rainbows }
                                loading={ this.state.loading }
                                query='rainbows'
                            />
                        }/>
                        <Route exact path='/search/:query' render={
                            () => <PhotoContainer
                                data={ this.state.photos }
                                loading={ this.state.loading }
                                query={ this.state.query }
                            />
                        }/>
                        <Route component={ InvalidPage } />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
