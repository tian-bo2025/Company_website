const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');  // 如果您密码是加密存储

// 首页
router.get('/', (req, res) => {
    res.render('index', { user: req.session.user });
});

// 登录页面
router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// 登录提交
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const db = req.db;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.get(sql, [username], (err, row) => {
        if (err) {
            console.error(err);
            return res.render('login', { error: '数据库错误' });
        }
        if (!row) {
            return res.render('login', { error: '用户不存在或密码错误' });
        }

        // 如果密码是加密的，用bcrypt对比
        const match = bcrypt.compareSync(password, row.password);

        if (match) {
            req.session.user = row.username;
            res.redirect('/');
        } else {
            res.render('login', { error: '用户不存在或密码错误' });
        }
    });
});

// 登出
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
