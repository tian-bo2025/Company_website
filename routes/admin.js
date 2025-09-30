// routes/admin.js
const express = require('express');
const router = express.Router();

// 管理员主页
router.get('/', (req, res) => {
    res.render('admin', { title: '管理员设置' });
});

// 1. 人员管理
router.get('/users', (req, res) => {
    res.send('人员管理页面（未来可删除成员）');
});

// 2. 内容审核
router.get('/review', (req, res) => {
    res.send('内容审核页面（未来可审核图片/删除评论）');
});

// 3. 系统日志
router.get('/logs', (req, res) => {
    res.send('系统日志页面（未来显示注册/登录记录）');
});

module.exports = router;
