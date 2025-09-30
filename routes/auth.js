const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// 连接数据库
const dbPath = path.join(__dirname, "../mysite.db");
const db = new sqlite3.Database(dbPath);

// 登录页面
router.get("/login", (req, res) => {
    res.render("login"); // 对应 views/login.ejs
});

// 登录逻辑（支持 用户名 / 邮箱 / 手机号 登录）
router.post("/login", (req, res) => {
    const { identifier, password } = req.body;
    // identifier 可以是用户名、邮箱或手机号

    db.get(
        `SELECT * FROM users 
         WHERE (username = ? OR email = ? OR phone = ?) 
         AND password = ?`,
        [identifier, identifier, identifier, password],
        (err, row) => {
            if (err) {
                console.error(err.message);
                return res.send("登录失败");
            }
            if (row) {
                req.session.user = row;
                res.redirect("/"); // 登录成功跳转首页
            } else {
                res.send("用户不存在或密码错误");
            }
        }
    );
});

// 注册页面
router.get("/register", (req, res) => {
    res.render("register"); // 对应 views/register.ejs
});

// 注册逻辑（完整字段）
router.post("/register", (req, res) => {
    const { username, email, phone, password } = req.body;
    db.run(
        "INSERT INTO users (username, email, phone, password, role) VALUES (?, ?, ?, ?, 'user')",
        [username, email, phone, password],
        (err) => {
            if (err) {
                console.error(err.message);
                return res.send("注册失败，可能是用户已存在");
            }
            res.redirect("/auth/login");
        }
    );
});

module.exports = router;
