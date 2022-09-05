export interface messageBodyI {
  Provider: string;
  timestamp: string;
  type: string;
}

export interface mailgunEventVerificationI {
  signingKey: string;
  timestamp: string;
  token: string;
  signature: string;
}

export interface eventBodyI {
  id: string;
  signature: {
    signingKey: string;
    timestamp: string;
    token: string;
    signature: string;
  };
  'event-data': unknown;
}

export type SNSPublishResponse = {
  ResponseMetadata: { RequestId: string };
  MessageId: string;
};
