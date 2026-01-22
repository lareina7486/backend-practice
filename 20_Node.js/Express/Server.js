import express from 'express';

const app = express();
const PORT = 3000;

// JSON 파싱 미들웨어
app.use(express.json());

// 기본 HTTP 메서드
app.get('/users', (req, res) => {
  res.json({ users: [] });
});

// postman에서 변경 테스트 하려면 Header -> Content-Type: application/json 확인
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.json({ message: '사용자 생성됨', name, email });
});

app.put('/users/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 업데이트` });
});

app.delete('/users/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 삭제` });
});

// URL 매개변수
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id });
});

// 쿼리 문자열 - /search?q=express&limit=10
app.get('/search', (req, res) => {
  const { q, limit = 10 } = req.query;
  res.json({ query: q, limit: Number(limit) });
});

// 여러 매개변수
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});