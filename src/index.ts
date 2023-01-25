import * as aws from "@pulumi/aws";
import * as apigateway from "@pulumi/aws-apigateway";
import dataSource from "./dataSource";
import Device from "./entities/Device";

// Create a Lambda Function
const handler = new aws.lambda.CallbackFunction("hello-handler", {
  environment: {
    variables: {
      DATABASE_HOST: process.env.DATABASE_HOST || "localhost",
      DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "password",
      DATABASE_PORT: process.env.DATABASE_PORT || "5432",
    },
  },
  callback: async () => {
    try {
      await dataSource.initialize();
    } catch (error) {}
    const deviceRepository = dataSource.getRepository(Device);
    const allDevices = await deviceRepository.find();
    return {
      statusCode: 200,
      body: "Hello, API Gateway!",
    };
  },
});

// Define an endpoint that invokes a lambda to handle requests
const api = new apigateway.RestAPI("api", {
  routes: [
    {
      path: "/",
      method: "GET",
      eventHandler: handler,
    },
  ],
});

export const url = api.url;
