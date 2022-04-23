import { Case } from './B-integration.interface';

interface TestCase extends Case {
  body: {
    email: string;
    nickname: string;
    password: string;
  };
}

export const SignupCases: TestCase[] = [
  {
    description: '이메일 주소를 입력하지 않으면 400 상태 메시지를 반환한다.',
    body: {
      email: '',
      nickname: '',
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
      nickname: '',
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
      nickname: '',
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
      nickname: '',
      password: '',
    },
    statusCode: 400,
    message: '이메일 형식에 맞지 않습니다.',
  },
  {
    description: '닉네임을 입력하지 않는 경우 400 상태 메시지를 반환한다.',
    body: {
      email: 'developer@magazine.com',
      nickname: '',
      password: '',
    },
    statusCode: 400,
    message: '닉네임을 입력하세요.',
  },
  {
    description: '닉네임이 3자리 미만이면 400 상태 메시지를 반환한다.',
    body: {
      email: 'developer@magazine.com',
      nickname: 'de',
      password: '',
    },
    statusCode: 400,
    message: '닉네임은 3~20자로 입력하세요.',
  },
  {
    description: '닉네임이 20자리 초과이면 400 상태 메시지를 반환한다.',
    body: {
      email: 'developer@magazine.com',
      nickname: 'nodejsbackenddeveloper',
      password: '',
    },
    statusCode: 400,
    message: '닉네임은 3~20자로 입력하세요.',
  },
  {
    description: '비밀번호를 입력하지 않으면 400 상태 메시지를 반환한다.',
    body: {
      email: 'developer@magazine.com',
      nickname: 'developer',
      password: '',
    },
    statusCode: 400,
    message: '비밀번호를 입력하세요.',
  },
  {
    description: '비밀번호가 4자리 미만이면 400 상태 메시지를 반환한다.',
    body: {
      email: 'developer@magazine.com',
      nickname: 'developer',
      password: 'dev',
    },
    statusCode: 400,
    message: '비밀번호는 4~20자로 입력하세요.',
  },
  {
    description: '비밀번호가 20자리 초과이면 400 상태 메시지를 반환한다.',
    body: {
      email: 'developer@magazine.com',
      nickname: 'developer',
      password: 'mynameischoewynodejsbackenddeveloper',
    },
    statusCode: 400,
    message: '비밀번호는 4~20자로 입력하세요.',
  },
  {
    description:
      '비밀번호에 닉네임이 포함되어 있으면 400 상태 메시지를 반환한다.',
    body: {
      email: 'developer@magazine.com',
      nickname: 'developer',
      password: 'backenddeveloper',
    },
    statusCode: 400,
    message: '비밀번호에 닉네임이 포함되어 있습니다.',
  },
  {
    description: '회원가입을 정상적으로 처리한다.',
    body: {
      email: 'developer@magazine.com',
      nickname: 'developer',
      password: 'backend',
    },
    statusCode: 201,
  },
  {
    description: '이메일이 중복되는 경우 409 상태 메시지를 반환한다.',
    body: {
      email: 'developer@magazine.com',
      nickname: 'developer',
      password: 'backend',
    },
    statusCode: 409,
    message: '이미 존재하는 계정입니다.',
  },
  {
    description: '회원가입을 정상적으로 처리한다.',
    body: {
      email: 'backend@magazine.com',
      nickname: 'backend',
      password: 'developer',
    },
    statusCode: 201,
  },
];
