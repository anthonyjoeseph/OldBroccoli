import BookRequest from '../../BookRequest';
import BroccoliRequest, { requestType } from '../../../BroccoliRequest';
import ImmutableData from '../../../../Immutables/ImmutableData';

export default class PageImageRequest extends BroccoliRequest{
  create(requestType, body){
    return new PageImageRequest(requestType, body);
  }
  constructor(requestType, resourceBody, dbBody){
    super(requestType, resourceBody);
    this.resourceBody = resourceBody;
    this.dbBody = dbBody;
  }
  buildURI(){
      return "bookMaker/pages/image/";
  }
  buildKey(){
    return "books/" + this.body.bookID +
      "/pages/" + this.body.pageID + "/" +
      "pageImage" + this.body.postfix;
  }
  makeGetRequest(){
    this.body = this.resourceBody;
    return this.makeResourceRequest();
  }
  handleGetResponse(books, src){
    var oldPage = books.pageObjectForBookAndPageID(this.body.bookID, this.body.pageID);
    var newPage = oldPage;
    newPage.src = src;
    return books;
  }
  makeAddRequest(){
    this.body = this.resourceBody;
    return this.makeResourceRequest()
    .then(function(){
      this.body = this.dbBody;
      return this.makeDBRequest();
    }.bind(this));
  }
  handleAddResponse(books, response){
    //get the new aspect ratio
    let newBookRequest = new BookRequest(requestType.get);
    return ImmutableData.newDataWithRequest(books, newBookRequest)
    .then(function(){
      let newRequest = new PageImageRequest(requestType.get, this.resourceBody);
      return ImmutableData.newDataWithRequest(books, newRequest);
    }.bind(this));
  }
  makeDeleteRequest(){
    return this.makeResourceRequest();
  }
}
