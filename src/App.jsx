import React, { Component } from 'react';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import 'rxjs';
import HeroPage from './components/HeroPage';
import './styles/index.scss'

const store = configureStore();

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <main>
                        <Switch>
                            <Route path="/heros" component={HeroPage}></Route>

                            {/* Default redirect to /heros */}
                            <Route render={() => (
                                <Redirect to='/heros'/>
                            )}></Route>
                        </Switch>
                    </main>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
