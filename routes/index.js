// routes/index.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // ✅ 用 bcryptjs 替代 bcrypt
const db = require('../db'); // 你的数据库连接模块
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// 首页
router.get('/', (req, res) => {
    res.send('欢迎来到杭州宝诗珠宝有限公司网站！');
});

// 注册
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: '用户名和密码不能为空' });
    }

    try {
        const hashedPassword = bcrypt.hashSync(password, 10); // 加密密码
        const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        stmt.run(username, hashedPassword);
        stmt.finalize();
        res.json({ message: '注册成功' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '注册失败' });
    }
});

// 登录
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: '用户名和密码不能为空' });
    }

    try {
        const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
        stmt.get(username, (err, row) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: '登录失败' });
            }
            if (!row) {
                return res.status(400).json({ error: '用户不存在' });
            }

            const match = bcrypt.compareSync(password, row.password); // 验证密码
            if (match) {
                res.json({ message: '登录成功' });
            } else {
                res.status(400).json({ error: '密码错误' });
            }
        });
        stmt.finalize();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '登录失败' });
    }
});

module.exports = router;
