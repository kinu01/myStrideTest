import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import config from '../constants/config';

AWS.config.region = config.region;

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: config.aws_cognito_identity_pool_id,
});

const lambda = new AWS.Lambda({
  apiVersion: '2015-03-31',
  secretAccessKey: config.keys.secretAccessKey,
  accessKeyId: config.keys.accessKeyId,
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
