import Joi from 'joi';

export const UserPassword = () =>
  Joi.string().min(4).max(20).required().messages({
    'any.required': '비밀번호를 입력하세요',
    'string.empty': '비밀번호를 입력하세요.',
    'string.min': '비밀번호는 4~20자 이상으로 입력하세요.',
    'string.max': '비밀번호는 4~20자 이상으로 입력하세요.',
    'string.base': '비밀번호 형식에 맞지 않습니다.',
  });
