import Joi from 'joi';

export const UserEmail = () =>
  Joi.string().email().required().messages({
    'any.required': '이메일을 입력하세요',
    'string.empty': '이메일을 입력하세요.',
    'string.base': '이메일 형식에 맞지 않습니다.',
    'string.email': '이메일 형식에 맞지 않습니다.',
  });
