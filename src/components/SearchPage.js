import React, { Component } from 'react'
import * as BooksAPI from '../utils/BooksAPI'
import Bookshelf from './Bookshelf'
import ProgressBar from './common/ProgressBar'

class SearchPage extends Component{
    state = {
        shelfBooks: [],
        books: [],
        query: '',
        isLoading: false,
        prevPage: ''
    }

    componentWillMount() {
        BooksAPI.getAll().then(shelfBooks => this.setState({ shelfBooks }))
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
            .then(() => {
                let { shelfBooks } = this.state

                shelfBooks = shelfBooks.map((shelfBook) => {
                    if(shelfBook.id === book.id)
                        shelfBook.shelf = shelf

                    return shelfBook
                })

                this.setState({ shelfBooks })
            })
            .catch(() => alert('An error occurred! Please try again!'))
    }

    render(){
        const { books, query, isLoading } = this.state

        books.map(book => {
            const bookShelfBook = this.state.shelfBooks.find(shelfBook => shelfBook.id === book.id)

            if(bookShelfBook)
                book.shelf = bookShelfBook.shelf

            return book
        })

        return(
            <div className="search-books">
                { isLoading && <ProgressBar /> }
                <div className="search-books-bar">
                    <a href="" onClick={this.props.history.goBack} className='close-search'>
                        Close
                    </a>

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
                        { (query !== '' && books.length > 0) ?
                            <Bookshelf
                                title="Search Results"
                                debounceTimeout={400}
                                books={books}
                                handleBookshelfBookChange={this.handleBookshelfBookChange}
                            /> : ( query !== '' && !isLoading && books.length === 0 ) &&
                            <div>No Search Result</div>
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage