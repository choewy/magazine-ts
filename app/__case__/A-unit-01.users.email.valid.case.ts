export interface TestCase {
  description: string;
  body: { email: string };
  statusCode?: number;
  message?: string;
}

export const TestCase: TestCase[] = [
  {
    description: '이메일 주소를 입력하지 않으면 400 상태 메시지를 반환한다.',
    body: { email: '' },
    statusCode: 400,
    message: '이메일을 입력하세요.',
  },
  {
    description: '도메인을 입력하지 않으면 400 상태 메시지를 반환한다.',
    body: { email: 'backend' },
    statusCode: 400,
    message: '이메일 형식에 맞지 않습니다.',
  },
  {
    description: '사용자 이름을 입력하지 않으면 400 상태 메시지를 반환한다.',
    body: { email: '@test.com' },
    statusCode: 400,
    message: '이메일 형식에 맞지 않습니다.',
  },
  {
    description:
      '허용되지 않은 특수 문자가 포함되어 있는 경우 400 상태 메시지를 반환한다.',
    body: { email: '<#backend*>@magazine.com' },
    statusCode: 400,
    message: '이메일 형식에 맞지 않습니다.',
  },
  {
    description: '이메일 형식에 부합하는 경우 다음 미들웨어를 실행한다.',
    body: { email: 'backend@magazine.com' },
  },
];
