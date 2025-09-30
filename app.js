const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

// 设置视图引擎
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "your_secret_key", // 可以换成环境变量 process.env.SESSION_SECRET
    resave: false,
    saveUninitialized: false,
  })
);

// 静态资源
app.use(express.static(path.join(__dirname, "public")));

// 路由
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// 错误处理（防止 502）
app.use((req, res, next) => {
  res.status(404).send("页面未找到 (404)");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("服务器内部错误 (500)");
});

// 监听 Railway 提供的端口
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
