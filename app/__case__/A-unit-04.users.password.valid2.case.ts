export interface TestCase {
  description: string;
  body: {
    nickname: string;
    password: string;
  };
  statusCode?: number;
  message?: string;
}

export const TestCase: TestCase[] = [
  {
    description:
      '비밀번호에 닉네임이 포함되어 있으면 400 상태 메시지를 반환한다.',
    body: { nickname: 'backend', password: 'backenddeveloper' },
    statusCode: 400,
    message: '비밀번호에 닉네임이 포함되어 있습니다.',
  },
  {
    description:
      '비밀번호에 닉네임이 포함되어 있지 않으면 다음 미들웨어를 실행한다.',
    body: { nickname: 'backend', password: 'developer' },
  },
];
