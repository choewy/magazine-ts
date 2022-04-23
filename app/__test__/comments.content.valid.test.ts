import { Request, Response } from 'express';
import { CommentPipe } from '../src/modules/comments/comments.pipe';
import { TestCase } from '../__case__/comments.content.valid.case';

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
    await CommentPipe.Content(req, res, next);
    statusCode && expect(res.status).toBeCalledWith(statusCode);
    statusCode && expect(res.send).toBeCalledWith({ message });
    !statusCode && expect(next).toBeCalled();
  });
};

describe('댓글 내용 유효성 검사', () => {
  TestCase.forEach((testCase) => {
    RunTest(testCase);
  });
});
