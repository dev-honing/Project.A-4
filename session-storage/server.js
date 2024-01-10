// server.js

const express = require('express');
const cors = require('cors'); // cors 미들웨어 추가
const app = express();
const port = 3001;

app.use(cors()); // 모든 요청에 대해 CORS를 허용하는 설정

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 구독 상태를 저장할 변수를 메모리에 저장
let isSubscribed = false;

// /subscribe 엔드포인트에 대한 POST 요청 처리
app.post('/subscribe', (req, res) => {
  try {
    // 구독 상태 토글
    isSubscribed = !isSubscribed;

    // JSON 응답
    res.json({ isSubscribed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});
