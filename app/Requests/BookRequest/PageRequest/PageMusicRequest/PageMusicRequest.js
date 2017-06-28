import BroccoliRequest from '../../../BroccoliRequest';

export default class PageMusicRequest extends BroccoliRequest{
  create(requestType, body){
    return new PageMusicRequest(requestType, body);
  }
  buildURI(){
      return "bookMaker/pages/music/";
  }
  makeEditRequest(){
    return this.makeDBRequest();
  }
}
