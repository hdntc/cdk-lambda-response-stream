import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CfnOutput, Duration } from 'aws-cdk-lib';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejslambda from "aws-cdk-lib/aws-lambda-nodejs";
import path = require('path');

export class CdkLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const streamLambda = new nodejslambda.NodejsFunction(this, "streamLambda", {
            runtime: lambda.Runtime.NODEJS_16_X,
            handler: "handler",
            description: "Test streaming lambda function",
            entry: path.join(__dirname, "lambda/stream.ts"),
            timeout: Duration.seconds(20)
        });

        const fnUrl = streamLambda.addFunctionUrl({ authType: lambda.FunctionUrlAuthType.NONE });
        const cfnFnUrl = fnUrl.node.defaultChild as lambda.CfnUrl;

        cfnFnUrl.addOverride("Properties.InvokeMode", "RESPONSE_STREAM");
        
        new CfnOutput(this, "fnUrl", {
            value: fnUrl.url
        });
    }
}