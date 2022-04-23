export const UserSignupTestCases = () => [
  {
    statusCode: 201,
    body: {
      email: 'choewy32@gmail.com',
      nickname: 'choewy',
      password: 'test',
    },
  },
  {
    statusCode: 409,
    body: {
      email: 'choewy32@gmail.com',
      nickname: 'choewy',
      password: 'test',
    },
  },
  {
    statusCode: 400,
    body: {
      email: '',
      nickname: '',
      password: '',
    },
  },
  {
    statusCode: 400,
    body: {
      email: '',
      nickname: 'choewy',
      password: 'test',
    },
  },
  {
    statusCode: 400,
    body: {
      email: 'test@test.com',
      nickname: 'test',
      password: 'test',
    },
  },
  {
    statusCode: 400,
    body: {
      email: 'test@test.com',
      nickname: '',
      password: '',
    },
  },
  {
    statusCode: 400,
    body: {
      email: 'test@test.com',
      nickname: 'test',
      password: '',
    },
  },
];
