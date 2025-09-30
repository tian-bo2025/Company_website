const express = require('express');
const router = express.Router();

// 模拟数据库用户信息（实际可改为 sqlite 查询）
const users = [
    { username: 'admin', role: 'admin', email: 'admin@example.com', phone: '1234567890' },
    { username: 'user1', role: 'user', email: 'user1@example.com', phone: '1111111111' }
];

// 首页
router.get('/', (req, res) => {
    const user = req.session.user;
    res.render('index', { user });
});

// 登录示例
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', express.json(), (req, res) => {
    const { username } = req.body;
    const user = users.find(u => u.username === username);
    if(user){
        req.session.user = user;
        return res.json({ success: true });
    }
    res.json({ success: false, error: '用户不存在' });
});

// 个人中心
router.get('/profile', (req, res) => {
    const user = req.session.user;
    if(!user) return res.redirect('/login');
    res.render('profile', { user });
});

// 管理员设置
router.get('/admin', (req, res) => {
    const user = req.session.user;
    if(!user || user.role !== 'admin'){
        return res.status(403).send('权限不足');
    }
    res.render('admin', { user });
});

module.exports = router;
