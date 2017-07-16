import React  from 'react'
import { Switch, Route } from 'react-router-dom'
import BookLists from './components/BookLists'
import SearchPage from './components/SearchPage'
import PageNotFound from './components/PageNotFound'
import './styles/App.css'

function BooksApp(){
    return (
        <div className="app">
            <Switch>
                <Route exact path="/" render={() => (<BookLists />)} />
                <Route path="/search" component={SearchPage} />
                <Route  component={PageNotFound} />
            </Switch>
        </div>
    )
}

export default BooksApp
