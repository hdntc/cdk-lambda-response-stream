import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejslambda from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import path = require('path');
import { CfnOutput, Duration } from 'aws-cdk-lib';
import { CfnUrl, FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';

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

        const fnUrl = streamLambda.addFunctionUrl({ authType: FunctionUrlAuthType.NONE });
        const cfnFnUrl = fnUrl.node.defaultChild as CfnUrl;

        cfnFnUrl.addOverride("Properties.InvokeMode", "RESPONSE_STREAM");
        
        new CfnOutput(this, "fnUrl", {
            value: fnUrl.url
        });
    }
}