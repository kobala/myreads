import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function BookshelfBook({ book, handleBookshelfBookChange }) {
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <Link to={`book/${book.id}`}> <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail : null})` }}></div></Link>
                    <div className="book-shelf-changer">
                        <select onChange={(e) => handleBookshelfBookChange(book, e.target.value)} value={book.shelf}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.join(', ') : 'unknown'}</div>
                <div className="book-categories">
                    {book.categories ? book.categories.map(category => category.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())).join() : 'None'}
                </div>
            </div>
        </li>
    )
}

BookshelfBook.propTypes = {
    book: PropTypes.object.isRequired,
    handleBookshelfBookChange: PropTypes.func.isRequired
}


export default BookshelfBook