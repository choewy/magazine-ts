import request from 'supertest';
import app from '../../app';
import { UserSignupDto } from '../../users/users.dto';
import { UserSignupTestCases } from '../../__case__/__intergration__/users.signup.case';

const url = '/api/users/signup';
const testCases = UserSignupTestCases();
const onTest = (statusCode: number, body: UserSignupDto) =>
  async function () {
    const res = await request(app).post(url).send(body);
    expect(res.statusCode).toEqual(statusCode);
  };

describe('사용자 회원가입 테스트', () => {
  testCases.forEach((testCase, index) => {
    const { statusCode, body } = testCase;
    test(`#${index + 1}`, onTest(statusCode, body));
  });
});
