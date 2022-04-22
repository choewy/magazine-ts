import request from 'supertest';
import app from '../app';
import { UserSigninDto } from '../src/modules/users/dto/user-signin.dto';
import { UserSigninTestCases } from '../__case__/users.signin.case';

const url = '/api/users/signin';
const testCases = UserSigninTestCases();
const onTest = (statusCode: number, body: UserSigninDto) =>
  async function () {
    const res = await request(app).post(url).send(body);
    expect(res.statusCode).toEqual(statusCode);
  };

describe('사용자 로그인 테스트', () => {
  testCases.forEach((testCase, index) => {
    const { statusCode, body } = testCase;
    test(`#${index + 1}`, onTest(statusCode, body));
  });
});
