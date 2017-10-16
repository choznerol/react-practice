import React, { Component } from 'react';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import 'rxjs';
import HeroPage from './components/HeroPage';
import Message from './containers/Message';
import LoadingBar from 'react-redux-loading-bar'
import './styles/index.scss'

const store = configureStore();

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>

                        {/* 頂部進度條 */}
                        <LoadingBar/>

                        {/* 更新成功、失敗提示訊息 */}
                        <Message/>

                        {/*  */}
                        <main className="p-2">
                            <Switch>
                                <Route path="/heros/:id?" component={HeroPage}></Route>

                                {/* Default redirect to /heros */}
                                <Route render={() => (
                                    <Redirect to='/heros/'/>
                                )}></Route>
                            </Switch>
                        </main>

                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
