// server.js 사용
// app.use('/studies', studiesRouter);

// ## 패스워드 해시

// import { hashPassword } from '../utils/password.crypto.js';
// const { password } = req.body;
// const hashedPassword = await hashPassword(password);

// ## 패스워드 검증

// import { comparePassword } from '../utils/password.crypto.js';
// const { password } = req.body;
// const isValid = await comparePassword(password, study.password);

// import express from 'express';
// 서버.js를 임포트 해야하지 않나?
import { prisma } from '../prisma/prisma.client.js';

const router = express.Router();

const SALT_ROUNDS = 10;
const BACKGROUND_TYPES = [
  'green',
  'yellow',
  'blue',
  'pink',
  'alvaro',
  'mikey',
  'andrew',
  'chris',
];

// POST /studies
router.post('/', async (req, res) => {
  try {
    const {
      nickname,
      title,
      introduction,
      background,
      password,
    } = req.body;

    // 필수값 검증 (400)
    if (!nickname || !title || !password) {
      return res.status(400).json({
        code: 'STUDY_001',
        message: '필수 입력값이 누락되었습니다.',
      });
    }

    // 비밀번호 해시
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // 스터디 생성
    const study = await prisma.study.create({
      data: {
        nickname,
        title,
        introduction,
        background: background ?? 'green',
        password: hashedPassword,
      },
      select: {
        id: true,
        nickname: true,
        title: true,
        introduction: true,
        background: true,
        totalPoint: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // 응답
    return res.status(201).json(study);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      message: '서버 오류',
    });
  }
});

export default router;
