import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from '../utils/BooksAPI'


class BookLists extends Component {
    state = {
        books : {
            currentlyReading: [],
            wantToRead: [],
            read: []
        }
    }

    componentDidMount() {
        this.getBooks()
    }

    getBooks = () => {
        BooksAPI.getAll().then(books => {
            let currentlyReading = books.filter((book) => book.shelf === 'currentlyReading')

            let wantToRead = books.filter((book) => book.shelf === 'wantToRead')

            let read = books.filter((book) => book.shelf === 'read')

            this.setState({
                books: {
                    currentlyReading : currentlyReading,
                    wantToRead : wantToRead,
                    read : read
                }
            })
        })
    }

    handleBookshelfBookChange = (bookToUpdate, shelf) => {
        let books = this.state.books;

        books[bookToUpdate.shelf] = books[bookToUpdate.shelf].filter((book) => book.id !== bookToUpdate.id );

        bookToUpdate.shelf = shelf;

        books[shelf].push(bookToUpdate);

        this.setState({ books : books });

        BooksAPI.update(bookToUpdate, shelf);
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf
                            title="Currently Reading"
                            books={this.state.books.currentlyReading}
                            handleBookshelfBookChange={this.handleBookshelfBookChange}
                        />

                        <Bookshelf
                            title="Want To Read"
                            books={this.state.books.wantToRead}
                            handleBookshelfBookChange={this.handleBookshelfBookChange}
                        />

                        <Bookshelf
                            title="Read"
                            books={this.state.books.read}
                            handleBookshelfBookChange={this.handleBookshelfBookChange}
                        />
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to='/search'
                    >
                        Add a book
                    </Link>
                </div>
            </div>
        )
    }
}

export default BookLists