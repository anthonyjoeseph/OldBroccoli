import BroccoliRequest, {httpMethods} from '../BroccoliRequest';
import ImmutableData from '../../Immutables/ImmutableData';
import merge from 'deepmerge';

export default class TableRequest extends BroccoliRequest{
  create(requestType, body){
    return new TableRequest(requestType, body);
  }
  getHttpMethod(){
    return httpMethods.get;
  }
  buildURI(){
    return "bookMaker/tables/"
  }
  makeGetRequest(){
    return this.makeDBRequest();
  }
  handleGetResponse(tables, response){
    return response.json()
    .then(json => {
      var mergedData = merge(tables.jsonObjects, json);
      return new ImmutableData(mergedData);
    });
  }
}
