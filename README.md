# Response streaming Lambda function with CDK
Recently AWS announced [payload response streaming](https://docs.aws.amazon.com/lambda/latest/dg/configuration-response-streaming.html) for Lambda functions. This allows you to overcome the 6MB payload size limit and reduce TTFB among other things. 

This repository provides a basic example of how to get this set up with the CDK. Since there is currently, to my knowledge, no typing for the `awslambda` object, this needs to be declared explicitly. Also, neither the NodejsFunction construct nor the FunctionUrl object currently support changing the InvokeMode (whether to buffer the payload or stream it) so this is done by overriding the underlying CloudFormation.

To try it out, run `cdk deploy` then `curl -N url`.