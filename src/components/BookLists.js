import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from '../utils/BooksAPI'
import Select from 'react-select'
import escapeRegExp from 'escape-string-regexp'
import 'react-select/dist/react-select.css'


class BookLists extends Component {
    state = {
        books: [],
        categories: [],
        selectedCategories: [],
        query: ''
    }

    componentDidMount() {
        this.getBooks()
    }

    getBooks = () => {
        BooksAPI.getAll().then(books => {
            let categories = Array.from(new Set(books.map(book => {
                if(book.categories)
                    return book.categories.map(category => category.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()))

                return null
            }).filter(category => category !== null).reduce((prev, curr) => prev.concat(curr)))).map(category => {
                return {value: category, label: category}
            })

            this.setState({
                books,
                categories
            })
        })
    }

    handleBookshelfBookChange = (bookToUpdate, shelf) => {
        let books = this.state.books.map(book => book === bookToUpdate ? Object.assign(book, { shelf }) : book);

        this.setState({ books })

        BooksAPI.update(bookToUpdate, shelf);
    }

    handleQueryUpdate = (query) => {
        this.setState({ query: query.trim() })
    }

    handleBookCategoryChange = (selectedCategories) => {
        selectedCategories = selectedCategories.map(category => category.value)

        if(selectedCategories.length === 0){
            this.setState({
                selectedCategories: []
            })

            return
        }

        this.setState({
            selectedCategories: [...selectedCategories]
        })
    }

    render() {
        let books = this.state.books

        if(this.state.selectedCategories.length > 0)
            books = books.filter(book => book.categories && book.categories
                .map(category => category.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()))
                .some(category => this.state.selectedCategories.indexOf(category) >= 0))

        const { query } = this.state

        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            books = books.filter(book => match.test(book.title) || match.test(book.authors.join()))
        }

        const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading')

        const wantToRead = books.filter((book) => book.shelf === 'wantToRead')

        const read = books.filter((book) => book.shelf === 'read')

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div className="list-books-filter">
                        <div className="wrap">
                            <div className="filter-bar"><span className="text">Filter: </span>
                                <Select
                                    options={this.state.categories}
                                    value={this.state.selectedCategories}
                                    searchable={true}
                                    multi={true}
                                    className="filter-select"
                                    placeholder="Category"
                                    onChange={this.handleBookCategoryChange}
                                />
                                <input
                                    className="search-input"
                                    placeholder="Search by title or author"
                                    onChange={(e) => this.handleQueryUpdate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Bookshelf
                            title="Currently Reading"
                            books={currentlyReading}
                            handleBookshelfBookChange={this.handleBookshelfBookChange}
                        />

                        <Bookshelf
                            title="Want To Read"
                            books={wantToRead}
                            handleBookshelfBookChange={this.handleBookshelfBookChange}
                        />

                        <Bookshelf
                            title="Read"
                            books={read}
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