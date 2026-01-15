## Prisma-blog 프로젝트 구조

prisma-blog/
├── prisma/
│   └── schema.prisma       # Prisma 스키마
├── env/
│   ├── .env.example        # 환경 변수 템플릿
│   ├── .env.development    # 개발 환경 변수
│   └── .env.production     # 프로덕션 환경 변수
├── generated/
│   └── prisma/             # 생성된 Prisma Client (자동 생성)
├── src/                    # 실행 코드
│   ├── config/
│   │   └── config.js       # 환경 변수 검증 설정
│   ├── db/
│   │   └── prisma.js       # Prisma Client + Adapter 설정
│   └── server.js           # Express 서버
├── prisma.config.js        # Prisma 설정
├── .prettierrc             # Prettier 설정
├── eslint.config.js        # ESLint 설정
├── .gitignore              # Git 제외 파일
├── package.json
└── node_modules/
