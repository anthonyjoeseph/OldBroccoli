const AWSCognito = require('amazon-cognito-identity-js');

let userPoolId = process.env.REACT_APP_USER_POOL_ID;
let clientId = process.env.REACT_APP_CLIENT_ID;

function signUserIn(username, password){
  return new Promise((resolve, reject) => {
    var authenticationData = {
      Username : username,
      Password : password,
    };
    var authenticationDetails = new AWSCognito.AuthenticationDetails(authenticationData);
    var poolData = {
      UserPoolId : userPoolId,
      ClientId : clientId
    };
    var userPool = new AWSCognito.CognitoUserPool(poolData);
    var userData = {
      Username : username,
      Pool : userPool
    };
    var cognitoUser = new AWSCognito.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        resolve(result.getIdToken().getJwtToken());
      },
      onFailure: function(err) {
        reject(err)
      },
      newPasswordRequired: function(userAttributes, requiredAttributes) {
        cognitoUser.completeNewPasswordChallenge(password, null, this);
      }
    });
  });
};

export { signUserIn };
