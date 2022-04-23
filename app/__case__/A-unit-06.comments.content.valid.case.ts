export interface TestCase {
  description: string;
  body: { content: string };
  statusCode?: number;
  message?: string;
}

export const TestCase: TestCase[] = [
  {
    description: '댓글 내용을 입력하지 않으면 400 상태 메시지를 반환한다.',
    body: { content: '' },
    statusCode: 400,
    message: '댓글 내용을 입력하세요.',
  },
  {
    description: '댓글 내용이 입력된 상태이면 다음 미들웨어를 실행한다.',
    body: { content: 'welcome!' },
  },
];
