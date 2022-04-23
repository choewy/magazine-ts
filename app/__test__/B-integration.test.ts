import request from 'supertest';
import app from '../app';
import db from '../src/modules/app/app.models';
import { TestCases } from '../__case__/B-integration.case';

const SignupCases = [...TestCases.SignupCases];
const SigninCases = [...TestCases.SigninCases];
const AuthCases = [...TestCases.AuthCases];

const cookieTokenParser = (cookies: string[]) => {
  return cookies[0].split(';')[0].split('token=')[1];
};

describe('사용자 회원가입 테스트', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  const url = '/api/users/signup';
  SignupCases.forEach(async (testCase) => {
    const { description, statusCode, body, message } = testCase;
    it(description, async () => {
      const res = await request(app).post(url).send(body);
      expect(res.statusCode).toEqual(statusCode);
      if (statusCode !== 201) {
        expect(JSON.parse(res.text)['message']).toEqual(message);
      }
    });
  });
});

const NewAuthCases: any = [];

describe('사용자 로그인 테스트', () => {
  afterAll(() => {
    console.log('로그인 테스트 후');
  });

  console.log('로그인 테스트 진행');
  const url = '/api/users/signin';
  SigninCases.forEach((testCase) => {
    const { description, statusCode, body, message } = testCase;
    it(description, async () => {
      const res = await request(app).post(url).send(body);
      expect(res.statusCode).toEqual(statusCode);

      if (statusCode === 200) {
        const token = cookieTokenParser(res.header['set-cookie']);
        const authorization = `Bearer ${token}`;
        const AuthCase = {
          description: '인증을 정상적으로 처리한다.',
          header: { authorization },
          statusCode: 200,
        };
        NewAuthCases.push(AuthCase);
      } else {
        expect(JSON.parse(res.text)['message']).toEqual(message);
      }
    });
  });
});

describe('사용자 인증 테스트', () => {
  beforeAll(async () => {
    console.log('인증 테스트 전 준비');
  });

  console.log('인증 테스트 진행');
  console.log(NewAuthCases);
  const url = '/api/users/auth';
  AuthCases.concat(NewAuthCases).forEach((testCase) => {
    const { description, statusCode, header, message } = testCase;
    test(description, async () => {
      const res = await request(app)
        .get(url)
        .set('Authorization', header.authorization);
      expect(res.statusCode).toEqual(statusCode);

      if (statusCode === 200) {
        console.log('PostCreateCase, PostUpdateCase, PostDelete에 header 등록');
      } else {
        console.log(res.text);
        expect(JSON.parse(res.text)['message']).toEqual(message);
      }
    });
  });
});
