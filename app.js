const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const sqlite3 = require("sqlite3").verbose();

const app = express();

// ====== 数据库连接 ======
const dbPath = path.join(__dirname, "mysite.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("数据库连接失败:", err.message);
  } else {
    console.log("成功连接到 SQLite 数据库");
    console.log("数据库已连接：", dbPath);
  }
});

// ====== 中间件配置 ======
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: "your_secret_key", // 建议替换成更安全的随机字符串
    resave: false,
    saveUninitialized: true,
  })
);

// 静态文件目录
app.use(express.static(path.join(__dirname, "public")));

// 设置视图引擎
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ====== 路由 ======
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// ====== 主页测试 ======
app.get("/health", (req, res) => {
  res.send("Server is running fine!");
});

// ====== 端口设置 ======
const PORT = process.env.PORT || 8080; // Railway 会自动传入 PORT
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

module.exports = app;
