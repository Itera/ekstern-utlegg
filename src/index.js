/* globals window document */

import 'babel-polyfill'

import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import {createStore, combineReducers, compose} from 'redux'

import {Provider} from 'react-redux'

import {syncHistoryWithStore, routerReducer} from 'react-router-redux'

import persistState, {mergePersistedState} from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
import filter from 'redux-localstorage-filter'

import App from './components/App'
import Home from './components/Home'
import Personalia from './components/Personalia'
import Rows from './components/Rows'
import Report from './components/Report'

import personalia from './reducers/personalia'
import rows from './reducers/rows'

const storage = compose(
    filter(['personalia', 'rows'])
)(adapter(window.localStorage))

const rootReducer = combineReducers({
    personalia,
    rows,
    routing: routerReducer
})

const reducer = compose(
    mergePersistedState()
)(rootReducer)

const createPersistentStore = compose(
    persistState(storage, 'itera-external-expenses')
)(window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore);

const store = createPersistentStore(reducer)

const history = syncHistoryWithStore(browserHistory, store)

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>

                <Route path="/start" component={Personalia}/>
                <Route path="/rows" component={Rows}/>
                <Route path="/done" component={Report}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'))