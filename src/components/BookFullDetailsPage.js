import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from '../utils/BooksAPI'
import { Link } from 'react-router-dom'
import '../styles/BookDetails.css'

class BookFullDetailsPage extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        handleBookshelfBookChange: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired,
        bookId: PropTypes.string.isRequired
    }

    state = {
        book: {}
    }

    componentDidMount(){
        this.getBook(this.props.bookId)
    }

    getBook = (bookId) => {
        let book = this.props.books.find(book => book.id === bookId)

        if(book !== undefined){
            this.setState({ book })
        }else{
            BooksAPI.get(bookId).then(book => {
                this.setState({ book })
            }).catch(() => this.setState({ book: null }))
        }
    }

    render(){
        const { book } = this.state
        
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>{(book !== null && book.title) || 'loading...'}</h1>
                </div>
                <a href="" onClick={this.props.goBack} className='close-search'>
                    Close
                </a>
                {book !== null && Object.keys(book).length !== 0 ?
                    <div className="book-details">
                        <div className="book-cover"
                             style={{backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : null})`}}>
                        </div>
                        <div className="book-description">
                            <h3>{book.title}</h3>
                            <h4>by {book.authors ? book.authors.join(',') : null}</h4>
                            <h5>Categories: {book.categories ? book.categories.map(category => category.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())).join() : 'None'}</h5>
                            {book.pageCount &&
                                <h5>Page Count: {book.pageCount}</h5>
                            }
                            {book.previewLink &&
                                <a href={book.previewLink} target="_blank">Preview</a>
                            }
                            <br/>
                            <select onChange={(e) => this.props.handleBookshelfBookChange(book, e.target.value)} value={book.shelf}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                            <br/>
                            <p> {book.description}</p>
                        </div>
                    </div>
                    : book === null &&
                        <div>
                            <h3>404 book not found</h3>
                            <p>You can also <Link to="/search">search MyReads</Link> or <Link to="/">browse from the homepage </Link> to find the information you need</p>
                        </div>
                }
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

export default BookFullDetailsPage

