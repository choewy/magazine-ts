import Joi from 'joi';

export const UserNickname = () =>
  Joi.string().min(3).max(20).required().messages({
    'any.required': '닉네임을 입력하세요.',
    'string.empty': '닉네임을 입력하세요.',
    'string.min': '닉네임은 3~20자로 입력하세요.',
    'string.max': '닉네임은 3~20자로 입력하세요.',
  });
