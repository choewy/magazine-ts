import { Request, Response } from 'express';
import { UserPipe } from '../src/modules/users/users.pipe';
import { TestCase } from '../__case__/A-unit-03.users.password.valid1.case';

const mockRequest = (body: Object): Request => {
  const req = { body };
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
    await UserPipe.Password(req, res, next);
    statusCode && expect(res.status).toBeCalledWith(statusCode);
    statusCode && expect(res.send).toBeCalledWith({ message });
    !statusCode && expect(next).toBeCalled();
  });
};

describe('비밀번호 적합성 검사(1)', () => {
  TestCase.forEach((testCase) => {
    RunTest(testCase);
  });
});
