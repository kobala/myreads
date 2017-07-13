import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import BookLists from './components/BookLists'
import SearchPage from './components/SearchPage'
import PageNotFound from './components/PageNotFound'
import BooksAPI from './utils/BooksAPI'
import './styles/App.css'

class BooksApp extends Component {
    state = {
        books : {
            currentlyReading: [],
            wantToRead: [],
            read: []
        }
    }

    handleBookshelfBookChange = (bookToUpdate, shelf) => {
        let books = this.state.books;

        books[bookToUpdate.shelf] = books[bookToUpdate.shelf].filter((book) => book.id !== bookToUpdate.id );

        bookToUpdate.shelf = shelf;

        books[shelf].push(bookToUpdate);

        this.setState( { books } );

        BooksAPI.update(bookToUpdate, shelf);
    }

    render() {
    return (
        <div className="app">
            <Switch>
                <Route exact path="/" render={
                    () => (<BookLists onShelfChange={this.update_shelf}
                                      handleBookshelfBookChange={this.handleBookshelfBookChange}
                        />
                    )} />
                <Route path="/search" component={SearchPage}/>
                <Route  component={PageNotFound} />
            </Switch>
        </div>
    )
    }
}

export default BooksApp
