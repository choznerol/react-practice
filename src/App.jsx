import React, { Component } from 'react';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import 'rxjs';
import HomePage from './components/HomePage';
import HeroPage from './components/HeroPage';
import './styles/index.css'

const store = configureStore();

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <main>
                        <Route exact path="/" component={HomePage}></Route>
                        <Route path="/heros" component={HeroPage}></Route>
                    </main>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
