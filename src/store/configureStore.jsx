import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../epics'

// 前端測試用 state
const preloadedState = {
    heros: [
        {id: 1, name: 'Fetching...', image: 'http://lorempixel.com/g/200/200/abstract'}
    ],
    profiles: {
        items: {
            1: { id: 1, "str": 1, "int": 1, "agi": 1, "luk": 1 }
        }
    }
}

// 使用 redux-observable
const epicMiddleware = createEpicMiddleware(rootEpic);

// 啟用 Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        // preloadedState,
        composeEnhancers(
            applyMiddleware(epicMiddleware)
        )
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
