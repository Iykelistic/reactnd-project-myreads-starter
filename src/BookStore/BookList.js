import React from 'react';
import BookShelf from './BookShelf';
import SearchPage from './SearchPage';

class BookList extends React.Component {
    render() {
        const { books, shelves, onChangeShelf } = this.props;
        //filter books for a particular shelf
        function booksOnShelf(shelf) {
            return books.filter(book => book.shelf === shelf.key)
        }

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map(shelf => (
                            <BookShelf key={shelf.key} shelf={shelf} books={booksOnShelf(shelf)} onChangeShelf={onChangeShelf} />
                        ))}
                    </div>
                </div>
                <SearchPage />
            </div>
        )
    }
}

export default BookList;