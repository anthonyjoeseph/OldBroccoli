import BookRequest from '../BookRequest';
import ImmutableData from '../../../Immutables/ImmutableData';
import PageImageRequest from './PageImageRequest/PageImageRequest';
import BroccoliRequest, { requestType } from '../../BroccoliRequest';

export default class PageRequest extends BroccoliRequest{
  create(requestType, body){
    return new PageRequest(requestType, body);
  }
  buildURI(){
      return "bookMaker/pages/";
  }
  buildKey(){
    return "books/" + this.body.bookID + "/pages/" + this.body.pageID + "/";
  }
  makeAddRequest(){
    return this.makeDBRequest();
  }
  handleAddResponse(books, response){
    let newRequest = new BookRequest(requestType.get, this.body);
    return ImmutableData.newDataWithRequest(books, newRequest);
  }
  makeDeleteRequest(){
    return this.makeDBRequest();
  }
  handleDeleteResponse(books, response){
    let newRequest = new PageImageRequest(requestType.delete, this.body);
    return ImmutableData.newDataWithRequest(books, newRequest)
    .then((books) => {
      let book = books.bookObjectForID(this.body.bookID);
      book.pages = book.pages.filter((p) => {
        return p.pageNumber !== (book.pages.length - 1)
      });
      return books;
    });
  }
}
