import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import crypto from 'crypto';
import verifyMailgunEvent from './utils/verifyMailgunEvent';
import buildResponse from './utils/buildResponse';
import saveEvent from './storage';
import Message from './Message';

const processMailGunEvent = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const eventBody = JSON.parse(event.body || '{}');
    const isValidMailgunEvent = verifyMailgunEvent({
      signingKey: 'f07b238c23b6b6a47b58b665645677d1-07e2c238-a948e115',
      ...eventBody.signature,
    });

    if (!isValidMailgunEvent) {
      return buildResponse(400, 'INVALID EVENT: Not from MailGun');
    }

    await saveEvent({ id: crypto.randomBytes(20).toString('hex'), ...eventBody });

    const message = new Message({
      Provider: 'Mailgun',
      timestamp: eventBody.signature.timestamp,
      type: eventBody['event-data'].event,
    });
    await message.publish();

    return buildResponse(200, 'Event processed successfully!');
  } catch (error: unknown) {
    return buildResponse(500, error.message);
  }
};

export default processMailGunEvent;
