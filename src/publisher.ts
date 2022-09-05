import AWS, { SNS, AWSError } from 'aws-sdk';
import { messageBodyI } from './@types';

AWS.config.update({ region: 'us-west-1' });
const sns = new SNS();

const publishMessage = async (msg: messageBodyI): Promise<SNS.PublishResponse> => {
  const params = {
    Message: JSON.stringify(msg),
    TopicArn: 'arn:aws:sns:us-west-1:673483478294:mailgun-event',
    Subject: 'Your email has a new interaction',
  };

  return new Promise((resolve, reject) => {
    sns.publish(params, (err: AWSError, data: SNS.PublishResponse) => {
      if (err) {
        console.log('SNS_PUBLISH_ERROR:', err.message);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export default publishMessage;
