import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () =>
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div>
            <h3>404 page not found</h3>
            <p>We are sorry but the page you are looking for does not exist.</p>
            <p>You can also <Link to="/search">search MyReads</Link> or <Link to="/">browse from the homepage </Link> to find the information you need</p>
        </div>
    </div>

export default PageNotFound