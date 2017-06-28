import BroccoliRequest from '../../../BroccoliRequest';

export default class TouchableImageRequest extends BroccoliRequest{
  create(requestType, body){
    return new TouchableImageRequest(requestType, body);
  }
  buildKey(){
      return "bookMaker/pages/touchableImages/";
  }
  /*makeGetRequest(){
    return this.makeResourceRequest();
  }
  handleGetResponse(books, src){
    var oldPage = books.pageObjectForBookAndPageID(this.body.bookID, this.body.pageID);
    var newPage = oldPage;
    newPage.src = src;
    return books;
  }
  makeAddRequest(){
    return this.makeResourceRequest();
  }
  handleAddResponse(books, response){
    return new PageImageRequest(responseType.get).makeRequest();
  }
  makeDeleteRequest(){
    return this.makeResourceRequest();
  }
  handleDeleteResponse(books, response){
    return new PageImageRequest(responseType.get).makeRequest();
  }*/
}
