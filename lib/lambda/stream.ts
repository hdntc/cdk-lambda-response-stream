import { Context, Handler } from "aws-lambda";
import { Writable } from "stream";

declare const awslambda: {
    streamifyResponse: <EventType=any>(streamHandler: ((event: EventType, responseStream: Writable, context: Context) => Promise<void>)) => Handler
}

export const handler: Handler = awslambda.streamifyResponse(async (event, responseStream, context) => {
    for(let i=0;i<10;i++) {
        responseStream.write(`hello ${i} `);
        await new Promise(x => setTimeout(x, 500));
    }
    responseStream.end();
});