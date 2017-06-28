import BroccoliRequest, {httpMethods} from '../BroccoliRequest';
import ImmutableData from '../../Immutables/ImmutableData';
import merge from 'deepmerge';

export default class MusicRequest extends BroccoliRequest{
  constructor(requestType, resourceBody, dbBody){
    super(requestType, resourceBody);
    this.resourceBody = resourceBody;
    this.dbBody = dbBody;
  }
  getHttpMethod(){
    return httpMethods.get;
  }
  buildURI(){
    return "bookMaker/music/"
  }
  buildKey(){
    return "music/" + this.body.name;
  }
  makeGetRequest(){
    return this.makeDBRequest();
  }
  handleGetResponse(music, response){
    return response.json()
    .then(json => {
      var mergedData = merge(music.jsonObjects, json);
      return new ImmutableData(mergedData);
    });
  }
  makeAddRequest(){
    this.body = this.resourceBody;
    return this.makeResourceRequest()
    .then(function(){
      this.body = this.dbBody;
      return this.makeDBRequest()
    }.bind(this));
  }
  makeDeleteRequest(){
    this.body = this.dbBody;
    return this.makeDBRequest()
    .then(function(){
      this.body = this.resourceBody;
      return this.makeResourceRequest()
    }.bind(this));
  }
  handleDeleteResponse(music, response){
    music.jsonObjects = music.jsonObjects.filter(m => m._1 !== this.dbBody.musicID);
    return music;
  }
}
