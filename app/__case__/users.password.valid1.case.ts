export interface TestCase {
  description: string;
  body: { password: string };
  statusCode?: number;
  message?: string;
}

export const TestCase: TestCase[] = [
  {
    description: '비밀번호를 입력하지 않으면 400 상태 메시지를 반환한다.',
    body: { password: '' },
    statusCode: 400,
    message: '비밀번호를 입력하세요.',
  },
  {
    description: '비밀번호가 4자리 미만이면 400 상태 메시지를 반환한다.',
    body: { password: 'abc' },
    statusCode: 400,
    message: '비밀번호는 4~20자로 입력하세요.',
  },
  {
    description: '비밀번호가 20자리 초과이면 400 상태 메시지를 반환한다.',
    body: { password: 'mynameischoewynodejsbackenddeveloper' },
    statusCode: 400,
    message: '비밀번호는 4~20자로 입력하세요.',
  },
  {
    description: '비밀번호 형식에 맞으면 다음 미들웨어를 실행한다.',
    body: { password: 'backenddeveloper' },
  },
];
