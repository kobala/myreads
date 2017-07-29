import React  from 'react'
import PropTypes from 'prop-types'
import BookshelfBook from './BookshelfBook'

function Bookshelf({ title, books, handleBookshelfBookChange }) {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book, index) =>
                            <BookshelfBook
                                key={index}
                                book={book}
                                handleBookshelfBookChange={handleBookshelfBookChange}
                            />
                        )}
                    </ol>
                </div>
            </div>
        )
}

Bookshelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired
}

export default Bookshelf