import BroccoliRequest, { requestType, httpMethods } from '../../../BroccoliRequest';
import ImmutableData from '../../../../Immutables/ImmutableData';

export default class TextRequest extends BroccoliRequest{
  create(requestType, body){
    return new TextRequest(requestType, body);
  }
  getHttpMethod(){
    return httpMethods.post;
  }
  buildURI(){
    return "bookMaker/pages/text/";
  }
  makeGetRequest(){
    return this.makeDBRequest();
  }
  handleGetResponse(books, response){
    return response.text()
    .then(text => {
      var oldPage = books.pageObjectForBookAndPageID(this.body.bookID, this.body.pageID);
      var newPage = oldPage;
  		if (text.charAt(0) === '"' && text.charAt(text.length -1) === '"')
  		{
  		    newPage.text = text.substr(1,text.length -2);
  		}else{
  			newPage.text = text;
  		}
      return books;
    });
  }
  makeAddRequest(){
    return this.makeDBRequest();
  }
  handleAddResponse(books, response){
    let newRequest = new TextRequest(requestType.get, this.body);
    return ImmutableData.newDataWithRequest(books, newRequest);
  }
  makeEditRequest(){
    return this.makeDBRequest();
  }
}
