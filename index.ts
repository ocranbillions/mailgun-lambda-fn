import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import processMailGunEvent from './src/main';

export const handler: APIGatewayProxyHandler = (event: APIGatewayProxyEvent) => processMailGunEvent(event);
