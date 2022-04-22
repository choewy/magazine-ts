import request from 'supertest';
import app from '../app';
import db from '../src/modules/app/app.models';
import { UserSignupDto } from '../src/modules/users/dto/user-signup.dto';
import { UserSignupTestCases } from '../__case__/users.signup.case';

beforeAll(async () => await db.sequelize.sync({ force: true }));

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
