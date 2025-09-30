// app.js
const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const PORT = 3000;

// ====== 数据库连接 ======
const dbPath = path.join(__dirname, "mysite.db");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("数据库连接失败:", err.message);
    } else {
        console.log("数据库已连接");
    }
});

// ====== 视图引擎设置 ======
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ====== 中间件 ======
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
    })
);

// ====== 路由 ======
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

// ====== 启动服务器 ======
app.listen(PORT, () => {
    console.log(`服务器已启动: http://localhost:${PORT}`);
});
