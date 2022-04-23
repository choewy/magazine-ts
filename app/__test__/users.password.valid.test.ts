import { Request, Response } from 'express';
import { UserPipe } from '../src/modules/users/users.pipe';
import { TestCase } from '../__case__/users.password.valid.case';

const mockResponse = (): Response => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  } as unknown;
  return res as Response;
};

const mockRequest = (password: string): Request => {
  const req = { body: { password } };
  return req as Request;
};

const RunTest = (testCase: TestCase) => {
  const { description, password, statusCode } = testCase;
  return it(description, async () => {
    const res = mockResponse();
    const req = mockRequest(password);
    const next = jest.fn();
    await UserPipe.Password(req, res, next);
    statusCode && expect(res.status).toBeCalledWith(statusCode);
    !statusCode && expect(next).toBeCalled();
  });
};

describe('비밀번호 적합성 검사(1)', () => {
  TestCase.forEach((testCase) => {
    RunTest(testCase);
  });
});
