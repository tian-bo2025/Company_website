const express = require("express");
const path = require("path");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const bodyParser = require("body-parser");

const app = express();

// 设置视图引擎
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 中间件
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// 会话配置（注意：MemoryStore 仅限开发环境）
app.use(
  session({
    store: new SQLiteStore({ db: "sessions.sqlite" }),
    secret: "yoursecretkey",
    resave: false,
    saveUninitialized: false,
  })
);

// 路由
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// 启动服务
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

module.exports = app;
