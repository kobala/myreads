import React, { Component } from 'react'
import * as BooksAPI from '../utils/BooksAPI'
import Bookshelf from './Bookshelf'
import ProgressBar from './common/ProgressBar'

class SearchPage extends Component{
    state = {
        books: [],
        query: '',
        isLoading: false,
        prevPage: ''
    }

    componentDidMount(){
        const url = new URL(location)
        const query = url.searchParams.get('query')

        if(query)
            this.handleSearchQueryUpdate(query)
    }

    handleSearchQueryUpdate = query => {
        this.setState({ query, isLoading: true })

        let trimmedQuery = query.trim()

        this.updateQueryString(query)

        if (trimmedQuery === ''){
            this.setState({ isLoading: false })

            return
        }

        BooksAPI.search(trimmedQuery).then(books => {
            let filteredBooks = Array.isArray(books) ? books : []

            this.setState({ books: filteredBooks, isLoading: false })
        })
    }

    updateQueryString = query => {
        const params = new URLSearchParams(location.search)

        params.set('query', query);

        window.history.replaceState({}, '', `${location.pathname}?${params}`)
    }

    render(){
        const { books, query, isLoading } = this.state

        books.map(book => {
            const bookShelfBook = this.props.books.find(shelfBook => shelfBook.id === book.id)

            book.shelf = bookShelfBook !== undefined ? bookShelfBook.shelf : 'none'

            return book
        })

        return(
            <div className="search-books">
                { isLoading && <ProgressBar /> }
                <div className="search-books-bar">
                    <a href="" onClick={this.props.goBack} className='close-search'>
                        Close
                    </a>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={e => this.handleSearchQueryUpdate(e.target.value)}
                            value={this.state.query}
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
                                handleBookshelfBookChange={this.props.handleBookshelfBookChange}
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