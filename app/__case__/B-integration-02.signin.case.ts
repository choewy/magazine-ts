import { Case } from './B-integration.interface';

interface TestCase extends Case {
  body: {
    email: string;
    password: string;
  };
}

export const SigninCases: TestCase[] = [
  {
    description: '이메일 주소를 입력하지 않으면 400 상태 메시지를 반환한다.',
    body: {
      email: '',
      password: '',
    },
    statusCode: 400,
    message: '이메일을 입력하세요.',
  },
  {
    description:
      '이메일의 도메인을 입력하지 않으면 400 상태 메시지를 반환한다.',
    body: {
      email: 'developer',
      password: '',
    },
    statusCode: 400,
    message: '이메일 형식에 맞지 않습니다.',
  },
  {
    description:
      '이메일의 사용자 이름을 입력하지 않으면 400 상태 메시지를 반환한다.',
    body: {
      email: '@magazine.com',
      password: '',
    },
    statusCode: 400,
    message: '이메일 형식에 맞지 않습니다.',
  },
  {
    description:
      '이메일에 허용되지 않은 특수 문자를 포함시키는 경우 400 상태 메시지를 반환한다.',
    body: {
      email: '<#developer*>@magazine.com',
      password: '',
    },
    statusCode: 400,
    message: '이메일 형식에 맞지 않습니다.',
  },
  {
    description: '비밀번호를 입력하지 않으면 400 상태 메시지를 반환한다.',
    body: {
      email: 'developer@magazine.com',
      password: '',
    },
    statusCode: 400,
    message: '비밀번호를 입력하세요.',
  },
  {
    description: '비밀번호가 4자리 미만이면 400 상태 메시지를 반환한다.',
    body: {
      email: 'developer@magazine.com',
      password: 'dev',
    },
    statusCode: 400,
    message: '비밀번호는 4~20자로 입력하세요.',
  },
  {
    description: '비밀번호가 20자리 초과이면 400 상태 메시지를 반환한다.',
    body: {
      email: 'developer@magazine.com',
      password: 'mynameischoewynodejsbackenddeveloper',
    },
    statusCode: 400,
    message: '비밀번호는 4~20자로 입력하세요.',
  },
  {
    description: '등록되지 않은 사용자인 경우 404 상태 메시지를 반환한다.',
    body: {
      email: 'choewy@magazine.com',
      password: 'test',
    },
    statusCode: 404,
    message: '사용자 정보를 찾을 수 없습니다.',
  },
  {
    description: '비밀번호가 틀리면 401 상태 메시지를 반환한다.',
    body: {
      email: 'developer@magazine.com',
      password: 'test',
    },
    statusCode: 401,
    message: '이메일 또는 비밀번호를 확인하세요.',
  },
  {
    description: '로그인을 정상적으로 처리한다.',
    body: {
      email: 'developer@magazine.com',
      password: 'backend',
    },
    statusCode: 200,
  },
  {
    description: '로그인을 정상적으로 처리한다.',
    body: {
      email: 'backend@magazine.com',
      password: 'developer',
    },
    statusCode: 200,
  },
];
