<!--
title: 'A monopoly simulator with a AWS Simple HTTP Endpoint with NodeJS and Serveless Framework'
description: 'This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
-->

# Serverless Framework Node HTTP API on AWS

## Usage

### Deployment

```
$ serverless deploy
```

After deploying, you should see output similar to:

```bash
Deploying monopoly-challenge to stage dev (us-east-1)

✔ Service deployed to stack monopoly-challenge-dev (152s)

endpoint: GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  simulator: monopoly-challenge-dev-simulator (1.9 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [http event docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
```

Which should result in response similar to the following (removed `input` and `proprietys` contents for brevity):

```json
{
  "statusCode": 200,
  "body": {
    "statusCode": 200,
    "body": {
        "result": {
            "winner": {
                "money": 125,
                "name": "CautiousPlayer"
            },
            "metrics": {
                "rounds": 7
            },
            "proprietys": [
                {
                    "value": 154,
                    "rent": 30,
                    "owner": null
                },
                ...
            ]
        },
        "input": ...
    }
}
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function simulator
```

Which should result in response similar to the following:

```json
{
  "statusCode": 200,
  "body": {
    "statusCode": 200,
    "body": {
        "result": {
            "winner": {
                "money": 125,
                "name": "CautiousPlayer"
            },
            "metrics": {
                "rounds": 7
            },
            "proprietys": [
                {
                    "value": 154,
                    "rent": 30,
                    "owner": null
                },
                ...
            ]
        },
        "input": ""
    }
}
}
```


Alternatively, it is also possible to emulate API Gateway and Lambda locally by using `serverless-offline` plugin. In order to do that, execute the following command:

```bash
serverless plugin install -n serverless-offline
```

It will add the `serverless-offline` plugin to `devDependencies` in `package.json` file as well as will add it to `plugins` in `serverless.yml`.

After installation, you can start local emulation with:

```
serverless offline
```

To learn more about the capabilities of `serverless-offline`, please refer to its [GitHub repository](https://github.com/dherault/serverless-offline).
