import Joi from 'joi';

export class UserValidation {
  public static Email = () =>
    Joi.string().email().required().messages({
      'any.required': '이메일을 입력하세요',
      'string.empty': '이메일을 입력하세요.',
      'string.base': '이메일 형식에 맞지 않습니다.',
      'string.email': '이메일 형식에 맞지 않습니다.',
    });

  public static Nickname = () =>
    Joi.string().min(3).max(10).required().messages({
      'any.required': '닉네임을 입력하세요',
      'string.empty': '닉네임을 입력하세요.',
      'string.min': '닉네임은 3~10자 이내로 입력하세요.',
      'string.max': '닉네임은 3~10자 이내로 입력하세요.',
      'string.base': '닉네임 형식에 맞지 않습니다.',
    });

  public static Password = () =>
    Joi.string().min(4).max(20).required().messages({
      'any.required': '비밀번호를 입력하세요',
      'string.empty': '비밀번호를 입력하세요.',
      'string.min': '비밀번호는 4~20자 이상으로 입력하세요.',
      'string.max': '비밀번호는 4~20자 이상으로 입력하세요.',
      'string.base': '비밀번호 형식에 맞지 않습니다.',
    });
}
