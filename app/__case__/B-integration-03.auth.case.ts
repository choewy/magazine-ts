import { Case } from './B-integration.interface';

interface TestCase extends Case {
  header: {
    authorization: string;
  };
}

export const AuthCases: TestCase[] = [
  {
    description: '토큰이 없는 경우 401 상태 메시지를 반환한다.',
    header: {
      authorization: '',
    },
    statusCode: 401,
    message: '로그인이 필요합니다.',
  },
  {
    description: '토큰 형식이 잘못되었을 경우 401 상태 메시지를 반환한다.',
    header: {
      authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuaWNrbmFtZSI6Iu2FjOyKpO2KuCIsImlhdCI6MTY1MDQ2Mjk0NH0.5DmkDx-xweDvGTNqVk-ObYaR9wXUJr2BY5GN1jatTpA',
    },
    statusCode: 401,
    message: '로그인이 필요합니다.',
  },
  {
    description: '사용자 정보를 찾을 수 없는 경우 404 상태 메시지를 반환한다.',
    header: {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuaWNrbmFtZSI6Iu2FjOyKpO2KuCIsImlhdCI6MTY1MDQ2Mjk0NH0.5DmkDx-xweDvGTNqVk-ObYaR9wXUJr2BY5GN1jatTpA',
    },
    statusCode: 404,
    message: '사용자 정보를 찾을 수 없습니다.',
  },
];
