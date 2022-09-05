import { SNS } from 'aws-sdk';
import publishMessage from './publisher';
import { messageBodyI } from './@types/index';

class Message {
  constructor(private body: messageBodyI) {
    this.body = body;
  }

  public publish(): Promise<SNS.PublishResponse> {
    return publishMessage(this.body);
  }
}

export default Message;
