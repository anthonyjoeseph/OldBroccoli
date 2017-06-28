import 'whatwg-fetch';
import 'aws-sdk/dist/aws-sdk';
import ImmutableData from '../Immutables/ImmutableData';
import Config from 'react-native-config';

const AWS = window.AWS;

let apiUri = Config.API_URL;
let resourceBucket = Config.RESOURCE_BUCKET;

let region = Config.APP_REGION;
let identityPoolId = Config.IDENTITY_POOL_ID;
let userPoolId = Config.USER_POOL_ID;

export function updateJwt(jwtToken){
  AWS.config.region = region;
  let loginKey = 'cognito-idp.' + region + '.amazonaws.com/' + userPoolId;
  let loginObj = {};
  loginObj[loginKey] = jwtToken;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId,
    Logins: loginObj
  });
}

export const httpMethods = {
  get: 'GET',
  post: 'POST',
  delete: 'DELETE'
}

export const requestType = {
  get: 0,
  add: 1,
  edit: 2,
  delete: 3
}

export default class BroccoliRequest{
  constructor(requestType, body){
    this.requestType = requestType;
    this.headers = {
      "content-type": "application/json"
    }
    if(body){
      this.body = body;
    }
  }

  create(requestType, body){
    return new BroccoliRequest(requestType, body);
  }

  buildURI(){
    throw Error("abstract method buildURI not overriden");
  }

  buildURIWithRequestType(){
    var addOn;
    switch(this.requestType){
      case requestType.add:
        addOn = "add"
        break;
      case requestType.edit:
        addOn = "edit"
        break;
      default:
        addOn = "";
        break;
    }
    return this.buildURI() + addOn;
  }

  httpMethod(){
    switch(this.requestType){
      case requestType.get:
        return this.getHttpMethod();
      case requestType.add:
        return httpMethods.post;
      case requestType.edit:
        return httpMethods.post;
      case requestType.delete:
        return httpMethods.delete;
      default:
        throw Error("must define httpmethod to call httpmethod()");
    }
  }

  getHttpMethod(){
    return httpMethods.get;
  }

  headers(){
    throw Error("abstract method headers not overriden");
  }

  buildKey(){
    throw Error("abstract method buildURI not overriden");
  }

  makeRequest(){
    switch(this.requestType){
      case requestType.get:
        return this.makeGetRequest();
      case requestType.add:
        return this.makeAddRequest();
      case requestType.edit:
        return this.makeEditRequest();
      case requestType.delete:
        return this.makeDeleteRequest();
      default:
        throw Error("must have request type to make request");
    }
  }

  makeGetRequest(){
    throw Error("abstract method makeGetRequest not overriden");
  }
  makeAddRequest(){
    throw Error("abstract method makeAddRequest not overriden");
  }
  makeEditRequest(){
    throw Error("abstract method makeEditRequest not overriden");
  }
  makeDeleteRequest(){
    throw Error("abstract method makeDeleteRequest not overriden");
  }


  handleResponse(oldData, response){
    switch(this.requestType){
      case requestType.get:
        return this.handleGetResponse(oldData, response);
      case requestType.add:
        return this.handleAddResponse(oldData, response);
      case requestType.edit:
        return this.handleEditResponse(oldData, response);
      case requestType.delete:
        return this.handleDeleteResponse(oldData, response);
      default:
        throw Error("must have request type to handle response");
    }
  }

  handleGetResponse(oldData, response){
    throw Error("abstract method handleGetResponse not overriden");
  }
  handleAddResponse(oldData, response){
    let newRequest = this.create(requestType.get, this.body);
    return ImmutableData.newDataWithRequest(oldData, newRequest);
  }
  handleEditResponse(oldData, response){
    let newRequest = this.create(requestType.get, this.body);
    return ImmutableData.newDataWithRequest(oldData, newRequest);
  }
  handleDeleteResponse(oldData, response){
    let newRequest = this.create(requestType.get, this.body);
    return ImmutableData.newDataWithRequest(oldData, newRequest);
  }

  makeDBRequest(){
    let uri = this.buildURIWithRequestType();
    if(this.httpMethod() === httpMethods.get){
      return fetch(
        apiUri + uri,
        {
          protocol: "http",
          method: this.httpMethod(),
          headers: this.headers
        }
      );
    }else{
      return fetch(
        apiUri + uri,
        {
          protocol: "http",
          method: this.httpMethod(),
          headers: this.headers,
          body: JSON.stringify(this.body)
        }
      );
    }
  }
  makeResourceRequest(){
    let key = this.buildKey();
    var s3 = new AWS.S3();
    var broccoliResourceBucketName = resourceBucket;
    return new Promise(function(resolve, reject){
      let promiseCallback = (err, data) => {
        if(err){
          reject(err);
        }else{
          resolve(data);
        }
      };
      let params = {
        Bucket: broccoliResourceBucketName,
        Key: key
      };
      if(this.requestType === requestType.add){
        s3.upload(
          {
            ...params,
            Body: this.body.file
          },
          promiseCallback
        );
      }else if(this.requestType === requestType.delete){
        s3.deleteObject(
          params,
          promiseCallback
        );
      }else{
        s3.getSignedUrl(
          'getObject',
          params,
          promiseCallback
        );
      }
    }.bind(this));
  }
}
