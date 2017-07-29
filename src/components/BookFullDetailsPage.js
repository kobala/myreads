import React, { Component } from 'react';
import * as BooksAPI from '../utils/BooksAPI'
import { Link } from 'react-router-dom';
import '../styles/BookDetails.css'

class BookFullDetailsPage extends Component{
    state = {
        book: {}
    }

    componentDidMount(){
        this.getBook(this.props.bookId)
    }

    getBook = (bookId) => {
        let book = this.props.books.find(book => book.id == bookId)

        if(book !== undefined){
            this.setState({ book })
        }else{
            BooksAPI.get(bookId).then(book => {
                this.setState({ book })
            })
        }
    }

    render(){
        const { book } = this.state
        
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>{book.title || 'loading...'}</h1>
                </div>
                <a href="" onClick={this.props.goBack} className='close-search'>
                    Close
                </a>
                {book.title &&
                    <div className="book-details">
                        <div className="book-cover"
                             style={{backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : null})`}}>
                        </div>
                        <div className="book-description">
                            <h3>{book.title}</h3>
                            <h4>by {book.authors ? book.authors.join(',') : null}</h4>
                            <h5>Categories: {book.categories ? book.categories.map(category => category.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())).join() : 'None'}</h5>
                            <h5>Page Count: {book.pageCount}</h5>
                            {book.previewLink &&
                                <a href={book.previewLink} target="_blank">Preview</a>
                            }
                            <br/>
                            <p> {book.description}</p>
                        </div>
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

export default BookFullDetailsPage;

