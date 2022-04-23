export interface TestCase {
  description: string;
  password: string;
  statusCode: number | undefined;
}

export const TestCase: TestCase[] = [
  {
    description: '비밀번호를 입력하지 않으면 400 상태 메시지를 반환한다.',
    password: '',
    statusCode: 400,
  },
  {
    description: '비밀번호가 4자리 미만이면 400 상태 메시지를 반환한다.',
    password: 'abc',
    statusCode: 400,
  },
  {
    description: '비밀번호가 20자리 이상이면 400 상태 메시지를 반환한다.',
    password: 'mynameischoewynodejsbackenddeveloper',
    statusCode: 400,
  },
  {
    description: '비밀번호 형식에 맞으면 다음 미들웨어를 실행한다.',
    password: 'backenddeveloper',
    statusCode: undefined,
  },
];
