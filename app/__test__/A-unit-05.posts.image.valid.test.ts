import { Request, Response } from 'express';
import { PostPipe } from '../src/modules/posts/posts.pipe';
import { TestCase } from '../__case__/A-unit-05.posts.image.valid.case';

const mockRequest = (file: Object | null): Request => {
  const req = {
    body: { image_url: '' },
    file,
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
  const { description, file, statusCode, message } = testCase;
  return it(description, async () => {
    const res = mockResponse();
    const req = mockRequest(file);
    const next = jest.fn();
    await PostPipe.Image(req, res, next);
    statusCode && expect(res.status).toBeCalledWith(statusCode);
    statusCode && expect(res.send).toBeCalledWith({ message });
    !statusCode && expect(next).toBeCalled();
  });
};

describe('게시물 이미지 파일 유효성 검사', () => {
  TestCase.forEach((testCase) => {
    RunTest(testCase);
  });
});
