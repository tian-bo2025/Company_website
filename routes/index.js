const express = require("express");
const router = express.Router();
const db = require("../db"); // 引入数据库

router.get("/", (req, res) => {
  // 简单测试数据库查询
  db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.send("数据库查询失败");
    } else {
      res.render("index", { tables: rows });
    }
  });
});

module.exports = router;
