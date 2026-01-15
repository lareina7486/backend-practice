// Zod: 스키마 선언 및 유효성 검사 라이브러리
// 장점: 환경변수 형식 검증, 타입 안정성 확보

// 환경변수(process.env)를 안전하게 검사해서 앱에서 쓰기 좋은 config 객체로 만들어준다.
// 환경변수는 모두 문자열이다.

// 1. 실행 명령어에서 env 파일 결정
// 2. dotenv가 그 파일을 읽음
// 3. process.env에 값이 들어감
// 4. Zod 스키마로 검증 & 변환
// 5. config 객체 생성
// 6. 이후 코드에서는 config만 사용

import { flattenError, z } from 'zod'; // flattenError은 요즘 이렇게 안쓴다고 함

const envSchema = z.object({
  // 아래 조건 모두 만족해야 객체 생성
  NODE_ENV: z
    .enum(['development', 'production', 'test']) // 3개중에 1개여야 함
    .default('development'),
  PORT: z.coerce // 숫자로 변환 가능하고 조건 만족해야 함
    .number() // coerce: 강제변환
    .min(1000)
    .max(65535)
    .default(5001),
  DATABASE_URL: z.url(), // url 형식이어야 함
});

const parseEnvironment = () => {
  try {
    return envSchema.parse({
      // parse(): JSON 형식의 문자열을 객체로 반환, 실패시 throw Error
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      DATABASE_URL: process.env.DATABASE_URL,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Zod 관련 에러인 경우
      const { fieldErrors } = flattenError(error);  // 복잡한 Error 메세지 간단하게 출력
      console.error('환경 변수 검증 실패:', fieldErrors);
    }
    process.exit(1);
  }
};

export const config = parseEnvironment();

export const isDevelopment = config.NODE_ENV === 'development'; // 세개 중에 하나만 true값
export const isProduction = config.NODE_ENV === 'production';
export const isTest = config.NODE_ENV === 'test';
