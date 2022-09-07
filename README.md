# Handling MailGun Events with a Lambda Function

## What is this?

> A simple lambda function to process email events received from MailGun via a webhook (eg, email-delivered, email-opened, user-clicks, unsubscribes, etc...). It stores the raw event in a DynamoDB Table and publishes a transformed version to an SNS Topic

## How to use
- Run the build command to generate a new dist folder (or simply use the exising dist folder)
- Change the `AWS Region` in `dist/src/publisher.js` and `dist/src/storage.js` to your preferred region
- Change the TopicArn in the `dist/src/publisher.js` file to your SNS TopicArn
- Change the dynamodbTableName to your DynamoDB Table name
- Update the value of `signingKey` in `dist/src/main.js` to your mailgun signing key - consider using env vars here (I didn't use it on purpose)
- From within the dist folder, zip up the content `zip -r dist.zip .` and upload the zip file to your AWS lambda environment


## Running the dev version
- download and configure aws-cli with your credentials
- npm install the app
- create your sns topic and dynamoDB table as specified in the `How to use` section - You'll also change these values in `serverless.yml` file
- `serverless invoke local -f processMailgunEvent` (to run a local invokation of the lambda)

- Deploy with `serverless deploy -s prod`
