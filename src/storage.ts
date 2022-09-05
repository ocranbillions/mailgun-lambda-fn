import AWS from 'aws-sdk';
import { eventBodyI } from './@types';

AWS.config.update({ region: 'us-west-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'mailgunEventsTable';

const saveEvent = async (eventBody: eventBodyI): Promise<string | Error> => {
  const params = {
    TableName: dynamodbTableName,
    Item: eventBody,
  };

  return dynamodb
    .put(params)
    .promise()
    .then(() => {
      console.log('Event has been saved succfully');
      return 'Success';
    })
    .catch(error => {
      console.log('SAVE_EVENT_ERROR:', error.message);
      throw new Error(error.message);
    });
};

export default saveEvent;
