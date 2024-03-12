import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Verbose } from 'src/cli/commands/tests-api.command';
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
    verbose: string,
  ) {
    let path,
      method,
      statusCode,
      responseText,
      responseHeaders,
      responseData,
      requestHeaders,
      requestData;
    if (successRequest == true) {
      path = response.request.path;
      method = response.config.method.toUpperCase();
      statusCode = response.status;
      responseText = response.statusText;
      responseHeaders = response.headers;
      responseData = response.data;
      requestHeaders = response.config.headers;
      requestData = response.config.data;
    } else if (successRequest == false) {
      path = response.response.request.path;
      method = response.response.config.method.toUpperCase();
      statusCode = response.response.status;
      responseText = response.response.statusText;
      responseHeaders = response.response.headers;
      responseData = response.response.data;
      requestHeaders = response.config.headers;
      requestData = response.config.data;
    }

    let level: string;

    expectCode == statusCode ? (level = 'info') : (level = 'error');
    return this.log(
      level,
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
      verbose,
    );
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
    verbose: string,
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

    if (verbose == 'never') {
      return logObj;
    }

    switch (level) {
      case 'info':
        const info = `✓ - [${method}] [TEST ${test_url}] [REQ ${route}] [${statusCode}] [${statusText}] [${requestTime} ms]`;
        this.logger.info(info);
        if (verbose == 'all' || verbose == 'info') {
          this.logger.info(
            `Response Body: ${JSON.stringify(responseBody, null, 2)}`,
          );
        }
        break;
      case 'error':
        const errorString = `✖ - [${method}] [TEST ${test_url}] [REQ ${route}] [${statusCode}] [${statusText}] [${requestTime} ms]`;
        this.logger.error(errorString);
        if (verbose == 'all' || verbose == 'error') {
          this.logger.error(
            `Error Register: ${JSON.stringify(logObj, null, 2)}`,
          );
        }
        break;
    }

    return logObj;
  }
}
