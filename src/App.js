import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import BookList from './BookStore/BookList';
import SearchBooks from './BookStore/SearchBooks';
import './App.css'

class BooksApp extends React.Component {
  state = {
    books : [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  shelves = [
    {key: 'currentlyReading' , name: 'Currently Reading'},
    {key: 'wantToRead', name: 'Want to Read'},
    {key: 'read', name: 'Read'}
  ]

 ChangeShelf = (book, shelf) => {
   BooksAPI.update(book, shelf).then(books => {
     //if the book is a new book, add it to a shelf
     if(book.shelf === 'none' && shelf !== 'none' ) {
       this.setState(state => {
        const newBooks = this.state.books.concat(book)
        return{books: newBooks}
       })
     }

     const updatedBooks = this.state.books.map(c => {
       //if the book is already in the state, change the shelf
       if(c.id === book.id) {
         c.shelf = shelf
       }
       return c;
     });

     this.setState({
       books: updatedBooks
     });

     //if 'none' shelf is chosen, then remove that book from the state
     if(shelf === 'none') {
       this.setState(state => {
         const newBooks = state.books.filter(deleteBook => deleteBook.id !== book.id);
         return {books: newBooks}
       })
     }
   });  
 }


  render() {
    const { books } = this.state;
    return (
      <div className="app">
          <Route path ='/search'
          render={() => (
            <SearchBooks books={books} onChangeShelf ={this.ChangeShelf} />
          )}
          />

          <Route exact path ='/'
          render={() => (
            <BookList books={books} shelves={this.shelves} onChangeShelf={this.ChangeShelf} />
          )}
          />
          </div>
    
    )
  }
}

export default BooksApp
