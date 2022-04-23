import Joi from 'joi';

export const UserPassword = () =>
  Joi.string().min(4).max(20).required().messages({
    'any.required': '비밀번호를 입력하세요.',
    'string.empty': '비밀번호를 입력하세요.',
    'string.min': '비밀번호는 4~20자로 입력하세요.',
    'string.max': '비밀번호는 4~20자로 입력하세요.',
  });
