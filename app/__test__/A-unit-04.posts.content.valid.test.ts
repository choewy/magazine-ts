import { Request, Response } from 'express';
import { PostPipe } from '../src/modules/posts/posts.pipe';
import { TestCase } from '../__case__/A-unit-04.posts.content.valid.case';

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
    await PostPipe.Content(req, res, next);
    statusCode && expect(res.status).toBeCalledWith(statusCode);
    statusCode && expect(res.send).toBeCalledWith({ message });
    !statusCode && expect(next).toBeCalled();
  });
};

describe('게시물 내용 유효성 검사', () => {
  TestCase.forEach((testCase) => {
    RunTest(testCase);
  });
});
