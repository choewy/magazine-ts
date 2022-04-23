import { Request, Response } from 'express';
import { UserPipe } from '../src/modules/users/users.pipe';
import { TestCase } from '../__case__/users.email.valid.case';

const mockRequest = (body: Object): Request => {
  const req = {
    body: body,
  };
  return req as Request;
};

const mockResponse = (): Response => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  } as unknown;
  return res as Response;
};

const RunTest = (testCase: TestCase) => {
  const { description, body, statusCode, message } = testCase;
  return it(description, async () => {
    const res = mockResponse();
    const req = mockRequest(body);
    const next = jest.fn();
    await UserPipe.Email(req, res, next);
    statusCode && expect(res.status).toBeCalledWith(statusCode);
    statusCode && expect(res.send).toBeCalledWith({ message });
    !statusCode && expect(next).toBeCalled();
  });
};

describe('이메일 적합성 검사', () => {
  TestCase.forEach((testCase) => {
    RunTest(testCase);
  });
});
