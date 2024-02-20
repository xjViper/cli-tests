import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class Log {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async request(
    response,
    reqTime: number,
    testPath: string,
    testService: string,
    expectCode: number,
    successRequest: boolean,
  ) {
    if (successRequest == true) {
      const path = response.request.path;
      const method = response.config.method.toUpperCase();
      const statusCode = response.status;
      const responseText = response.statusText;
      const responseHeaders = response.headers;
      const responseData = response.data;
      const requestHeaders = response.config.headers;
      const requestData = response.config.data;
      if (expectCode == statusCode) {
        return this.log(
          'info',
          testPath,
          expectCode,
          testService,
          path,
          method,
          statusCode,
          responseText,
          reqTime,
          responseHeaders,
          responseData,
          requestHeaders,
          requestData,
          successRequest,
        );
      }
    } else if (successRequest == false) {
      const path = response.response.request.path;
      const method = response.response.config.method.toUpperCase();
      const statusCode = response.response.status;
      const responseText = response.response.statusText;
      const responseHeaders = response.response.headers;
      const responseData = response.response.data;
      const requestHeaders = response.config.headers;
      const requestData = response.config.data;

      return this.log(
        'error',
        testPath,
        expectCode,
        testService,
        path,
        method,
        statusCode,
        responseText,
        reqTime,
        responseHeaders,
        responseData,
        requestHeaders,
        requestData,
        successRequest,
      );
    }
  }

  log(
    level: string,
    test_url: string,
    expect_code: number,
    type: string,
    route: string,
    method: string,
    statusCode: string,
    statusText: string,
    requestTime: number,
    responseHeaders: object,
    responseBody: object,
    requestHeaders: object,
    requestBody: object,
    success: boolean,
  ) {
    const logObj = {
      type: type,
      businessRule: 'CLI_TESTS',
      context: {
        test: {
          log_level: level.toUpperCase(),
          test_url: test_url,
          expect_code: expect_code,
          method: method,
          test_time: requestTime,
        },
        request: {
          url: route,
          headers: requestHeaders,
          body: requestBody,
        },
        response: {
          statusCode: statusCode,
          statusText: statusText,
          headers: responseHeaders,
          body: responseBody,
        },
        success: success,
      },
    };

    switch (level) {
      case 'info':
        const info = `✓ - [${method}] [TEST ${test_url}] [REQ ${route}] [${statusCode}] [${statusText}] [${requestTime} ms]`;
        this.logger.info(info);
        this.logger.info(
          `Response Body: ${JSON.stringify(responseBody, null, 2)}`,
        );
        break;
      case 'error':
        const errorString = `✖ - [${method}] [TEST ${test_url}] [REQ ${route}] [${statusCode}] [${statusText}] [${requestTime} ms]`;
        this.logger.error(errorString);
        this.logger.error(`Error Register: ${JSON.stringify(logObj, null, 2)}`);
        break;
    }

    return logObj;
  }
}
