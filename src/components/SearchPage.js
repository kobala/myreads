import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import Bookshelf from './Bookshelf'
import ProgressBar from './common/ProgressBar'

class SearchPage extends Component{
    state = {
        books: [],
        query: '',
        isLoading: false
    }

    handleSearchQueryUpdate(query) {
        this.setState({ query, isLoading: true })

        let trimmedQuery = query.trim()

        if (trimmedQuery === ''){
            this.setState({ isLoading: false })
            return
        }


        BooksAPI.search(trimmedQuery).then(books => {
            let filteredBooks = Array.isArray(books) ? books : []

            this.setState({ books: filteredBooks, isLoading: false })
        })
    }

    handleBookshelfBookChange = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then(() => shelf !== 'none' ? alert(`${book.title} has been added to your list!`) : null)
            .catch(() => alert('An error occurred! Please try again!'));
    }

    render(){
        return(
            <div className="search-books">
                { this.state.isLoading && <ProgressBar /> }
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className='close-search'
                    >
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={e => this.handleSearchQueryUpdate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { (this.state.query !== '' && this.state.books.length > 0) ?
                            <Bookshelf
                            title="Search Results"
                            debounceTimeout={400}
                            books={this.state.books}
                            handleBookshelfBookChange={this.handleBookshelfBookChange}
                            /> : ( this.state.query !== '' && !this.state.isLoading && this.state.books.length === 0 ) &&
                            <div>No Search Result</div>
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage