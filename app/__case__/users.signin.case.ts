export const UserSigninTestCases = () => [
  {
    statusCode: 200,
    body: {
      email: 'choewy32@gmail.com',
      password: 'test',
    },
  },
  {
    statusCode: 404,
    body: {
      email: 'choewy33@gmail.com',
      password: 'test',
    },
  },
  {
    statusCode: 401,
    body: {
      email: 'choewy32@gmail.com',
      password: 'choewy32',
    },
  },
  {
    statusCode: 400,
    body: {
      email: '',
      password: 'test',
    },
  },
  {
    statusCode: 404,
    body: {
      email: 'test@test.com',
      password: 'test',
    },
  },
  {
    statusCode: 400,
    body: {
      email: 'test@test.com',
      password: '',
    },
  },
];
