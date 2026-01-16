# 21.관계형 데이터베이스를 활용한 자바스크립트 서버 만들기

## 1. 관계형 데이터베이스 기본기 ⭐⭐⭐

- 1-1. 등장배경 ✅
- 1-2. PostgreSQL 18버전 설치하기 ✅
- 1-3. DBeaver 설치하기 ✅
- 1-4. Primary Key와 Foreign Key ⭐⭐⭐ ✅
- 1-5. 기본적인 psql 및 SQL 사용해보기 ⭐⭐⭐ ✅
- 1-5. #실습 기본적인 SQL 사용해보기 ✅
- 1-6. 데이터 모델링과 ER 모델 ⭐⭐⭐ ✅
- 1-7. 요구사항으로부터 ER 모델링 하기 ⭐⭐⭐ ✅
- 1-8. ER 모델링: 카디널리티 ⭐⭐⭐⭐⭐
- 1-8. #연습문제 ER 모델링: 카디널리티 & Mermaid 사용해보기
- 1-9. ER 모델에서 데이터베이스 테이블로 ⭐⭐⭐
- 1-10. #연습문제 실전 상황! 모델링을 해보자

## 2. Prisma 배워보기

- 2-0. 전체 코드 ✅
- 2-1. Prisma 프로젝트 시작하기 ✅
- 2-2. Prisma 스키마: 모델과 관계 정의 ⭐⭐⭐ ✅
- 2-3. 시딩(Seeding): 테스트 데이터 자동 생성하기 ➡️
- 2-4. Prisma Client로 CRUD 구현하기 ⭐⭐⭐
- 2-5. 심화: 효율적인 관계 쿼리 (N+1 문제 해결)
- 2-6. 고급 쿼리: 필터링, 정렬, 페이징네이션 ⭐⭐⭐
- 2-7. (심화) 트랜잭션(Transactions) 처리 ⭐⭐⭐

- 2-8. 인증 기능 구현 (유틸리티와 미들웨어) ⭐⭐⭐⭐⭐
- 2-9. 에러 핸들링과 유효성 검사
- 2-10. #실습 코드 리팩토링: 커스텀 에러와 검증 개선
- 2-11. Production을 위한 Prisma ⭐⭐⭐

---

## Prisma-blog 프로젝트 구조

```text
prisma-blog/
├── prisma/
│   └── schema.prisma       # Prisma 스키마
├── env/
│   ├── .env.example
│   ├── .env.development
│   └── .env.production
├── generated/
│   └── prisma/             # 생성된 Prisma Client (자동 생성)
├── src/                    # 실행 코드
│   ├── config/
│   │   └── config.js       # 환경 변수 검증 설정
│   ├── db/
│   │   └── prisma.js       # Prisma Client + Adapter 설정
│   └── server.js           # Express 서버
├── prisma.config.js        # Prisma 설정 파일
├── jsconfig.json           # VSCode와 같은 에디터가 JS 프로젝트를 이해하도록 도와주는 설정 파일
├── .prettierrc
├── eslint.config.js
├── .gitignore
├── package.json
└── node_modules/
```