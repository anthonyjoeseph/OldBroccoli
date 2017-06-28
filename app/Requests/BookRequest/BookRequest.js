import BroccoliRequest, {requestType, httpMethods} from '../BroccoliRequest';
import ImmutableData from '../../Immutables/ImmutableData';
import ImmutableBooks from '../../Immutables/ImmutableBooks';
import PageRequest from './PageRequest/PageRequest';
import merge from 'deepmerge';

function arrayDeepMerge(dirtyDestinationArray, sourceArray, options){
  //remove empty books
  var destinationArray = dirtyDestinationArray.filter(
    (b) => b.id !== -1
  );

  // add/merge books they share
  var mergedArray = destinationArray.map(book => {
    var bookID = book.id;
    var matchingSourceBooks = sourceArray.filter((b) => b.id === bookID);
    if(matchingSourceBooks.length > 0){
      var matchingSourceBook = matchingSourceBooks[0];
      return merge(book, matchingSourceBook);
    }
    return book;
  });
  // add books sourceArray has that destinationArray doesn't
  sourceArray.forEach(book => {
    var bookID = book.id;
    if(destinationArray.filter((b) => b.id === bookID).length < 1){
      mergedArray.push(book);
    }
  });
  return mergedArray;
}

function addMissingBookElements(bookObject){
  if(bookObject.pages == null){
    bookObject.pages = [];
  }else{
    bookObject.pages.map(page => {
      page.touchableImages = [];
      return page;
    });
  }
}

export default class BookRequest extends BroccoliRequest{
  constructor(requestType, body, noMerge){
    super(requestType, body);
    if(!noMerge){
      this.noMerge = false;
    }else{
      this.noMerge = noMerge;
    }
  }
  create(requestType, body){
    return new BookRequest(requestType, body);
  }
  getHttpMethod(){
    return httpMethods.get;
  }
  buildURI(){
    return "bookMaker/"
  }
  makeGetRequest(){
    return this.makeDBRequest();
  }
  handleGetResponse(books, response){
    return response.json()
    .then(json => {
      let appData;
      if(this.noMerge){
        appData = json;
      }else{
        appData = merge(books.jsonObjects, json, {arrayMerge: arrayDeepMerge});
      }
      appData.forEach(function(book){
        addMissingBookElements(book);
      });

      return new ImmutableBooks(appData);
    });
  }
  makeAddRequest(){
    return this.makeDBRequest();
  }
  makeEditRequest(){
    return this.makeDBRequest();
  }
  handleEditResponse(books, response){
    let newRequest = new BookRequest(requestType.get, this.body, true);
    return ImmutableData.newDataWithRequest(books, newRequest);
  }
  makeDeleteRequest(){
    return this.makeDBRequest();
  }
  handleDeleteResponse(books, response){
    let deletePagePromises = this.body.pageIDs.map(function(pageID){
      let deleteBody = {
        bookID: this.body.bookID,
        pageID: pageID,
        postfix: this.body.pageImagePostfix
      }
      let newDeletePageRequest = new PageRequest(requestType.delete, deleteBody);
      return ImmutableData.newDataWithRequest(books, newDeletePageRequest);
    }.bind(this));
    return Promise.all(deletePagePromises)
    .then(function(){
      books.jsonObjects = books.jsonObjects.filter(b => b.id !== this.body.bookID);
      return books;
    }.bind(this))
  }
}
