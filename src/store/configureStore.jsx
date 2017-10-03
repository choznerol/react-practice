import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';

// 前端測試用 state
const preloadedState = {
    heros: [
        {id: 1, name: 'Default', image: 'http://lorempixel.com/g/200/200/abstract'},
        {id: 2, name: 'Default2', image: 'http://lorempixel.com/g/200/200/animals'}
    ],
    selectedHeroId: 2,
    profiles: {
        isFetching: true,
        items: {
            1: { id: 1, "str": 1, "int": 1, "agi": 1, "luk": 1 },
            2: { id: 2, "str": 2, "int": 2, "agi": 2, "luk": 2 },
        }
    }
}

/* eslint-disable no-underscore-dangle */
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
/* eslint-enable */

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        preloadedState,
        enhancer
    );

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        console.log('Enable Webpack hot module replacement for reducers');
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
