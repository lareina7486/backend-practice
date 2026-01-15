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