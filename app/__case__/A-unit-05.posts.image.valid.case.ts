export interface TestCase {
  description: string;
  file: { filename: string } | null;
  statusCode?: number;
  message?: string;
}

export const TestCase: TestCase[] = [
  {
    description: '이미지 파일을 등록하지 않으면 400 상태 메시지를 반환한다.',
    file: null,
    statusCode: 400,
    message: '게시물의 이미지를 업로드하세요.',
  },
  {
    description: '이미지 파일이 선택된 상태이면 다음 미들웨어를 실행한다.',
    file: { filename: 'image.png' },
  },
];
