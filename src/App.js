import React, { Component }  from 'react'
import * as BooksAPI from './utils/BooksAPI'
import { Switch, Route } from 'react-router-dom'
import BookLists from './components/BookLists'
import SearchPage from './components/SearchPage'
import BookFullDetailsPage from './components/BookFullDetailsPage'
import PageNotFound from './components/PageNotFound'
import './styles/App.css'

class BooksApp extends Component{
    state = {
        books: []
    }

    componentDidMount(){
        BooksAPI.getAll().then(books => {
            this.setState({ books })
        })
    }

    handleBookshelfBookChange = (book, shelf) => {
        if (book.shelf !== shelf) {
            BooksAPI.update(book, shelf).then(() => {
                book.shelf = shelf

                this.setState(state => ({
                    books: state.books.filter(b => b.id !== book.id).concat([ book ])
                }))
            })
        }
    }

    render() {
        return (
            <div className="app">
                <Switch>
                    <Route exact path="/"
                           render={() => (<BookLists books={this.state.books}
                                                     handleBookshelfBookChange={this.handleBookshelfBookChange}
                           />)}
                    />
                    <Route exact path="/search"
                           render={({ history }) => (<SearchPage books={this.state.books}
                                                      handleBookshelfBookChange={this.handleBookshelfBookChange}
                                                      goBack={history.goBack}
                           />)}
                    />
                    <Route path="/book/:id"
                           render={({ match, history }) => (<BookFullDetailsPage books={this.state.books}
                                                              bookId={match.params.id}
                                                              goBack={history.goBack}
                           />)}
                    />
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        )
    }
}

export default BooksApp
