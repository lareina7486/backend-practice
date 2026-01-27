import { HttpError } from './http.error.js';

export class ValidationError extends HttpError {
  constructor(message, code = 'VALIDATION_ERROR') {
    // 부모 클래스인 HttpError에 메시지와 400 상태 코드를 전달합니다.
    super(message, 400); 
    this.name = 'ValidationError';
    this.code = code; // API 응답에 사용할 에러 코드
  }
}