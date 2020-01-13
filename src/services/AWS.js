import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import config from '../constants/config';

AWS.config.region = 'us-east-1';

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:837500652098', // your identity pool id here
});

const lambda = new AWS.Lambda({
  apiVersion: '2015-03-31',
  secretAccessKey: 'ljEJ7/4ZntmKmCiOcZyHos5BGaqZksXWMvRMJg1+',
  accessKeyId: 'AKIA4F7XNZJBGOMTJK73',
});

const userPool = new CognitoUserPool({
  UserPoolId: config.aws_user_pools_id,
  ClientId: config.aws_user_pools_web_client_id,
});

export {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  userPool,
  AuthenticationDetails,
  lambda,
};
