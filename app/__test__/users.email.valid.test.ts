import { Request, Response } from 'express';
import { UserPipe } from '../src/modules/users/users.pipe';
import { TestCase } from '../__case__/users.email.valid.case';

const mockResponse = (): Response => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  } as unknown;
  return res as Response;
};

const mockRequest = (email: string): Request => {
  const req = {
    body: { email },
  };
  return req as Request;
};

const RunTest = (testCase: TestCase) => {
  const { description, email, statusCode } = testCase;
  return it(description, async () => {
    const res = mockResponse();
    const req = mockRequest(email);
    const next = jest.fn();
    await UserPipe.Email(req, res, next);
    statusCode && expect(res.status).toBeCalledWith(statusCode);
    !statusCode && expect(next).toBeCalled();
  });
};

describe('이메일 적합성 검사', () => {
  TestCase.forEach((testCase, index) => {
    RunTest(testCase);
  });
});
