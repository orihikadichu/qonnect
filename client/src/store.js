import { createBrowserHistory as createHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reducer from './reducer';
import { initialState } from './constants';
import rootSaga from './rootSaga';
import createSagaMiddleware from 'redux-saga';
import logger from "redux-logger";
import ReactGA from 'react-ga';

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createHistory();
ReactGA.initialize('UA-128421111-1');
console.log("-------------",history);
history.listen(({ pathname }) => {
  console.log("GA---------",pathname);
//   ReactGA.set({ page: pathname });
//   ReactGA.pageview(pathname);
});

const routingMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    initialState,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
            routingMiddleware,
            sagaMiddleware,
            logger
        )
    )
);

sagaMiddleware.run(rootSaga, { history });

export { history }
export { store }

export default store;
