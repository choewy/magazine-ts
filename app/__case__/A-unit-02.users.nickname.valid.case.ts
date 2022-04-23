export interface TestCase {
  description: string;
  body: { nickname: string };
  statusCode?: number;
  message?: string;
}

export const TestCase: TestCase[] = [
  {
    description: '닉네임을 입력하지 않으면 400 상태 메시지를 반환한다.',
    body: { nickname: '' },
    statusCode: 400,
    message: '닉네임을 입력하세요.',
  },
  {
    description: '닉네임이 3자리 미만이면 400 상태 메시지를 반환한다.',
    body: { nickname: 'de' },
    statusCode: 400,
    message: '닉네임은 3~20자로 입력하세요.',
  },
  {
    description: '닉네임이 20자리 초과이면 400 상태 메시지를 반환한다.',
    body: { nickname: 'nodejsbackenddeveloper' },
    statusCode: 400,
    message: '닉네임은 3~20자로 입력하세요.',
  },
  {
    description: '닉네임 형식에 부합하는 경우 다음 미들웨어를 실행한다.',
    body: { nickname: 'developer' },
  },
];
