import crypto from 'crypto';
import { mailgunEventVerificationI } from '@src/@types';

const verifyMailgunEvent = (data: mailgunEventVerificationI): boolean => {
  try {
    const { signingKey, timestamp, token, signature } = data;
    const encodedToken = crypto.createHmac('sha256', signingKey).update(timestamp.concat(token)).digest('hex');

    return encodedToken === signature;
  } catch (error) {
    return false;
  }
};

export default verifyMailgunEvent;
