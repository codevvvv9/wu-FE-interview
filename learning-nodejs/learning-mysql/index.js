var mysql = require("mysql");

var db_config = {
  host: "192.168.1.8", //本机IP
  user: "root",
  password: "123456",
};

var connection = mysql.createConnection(db_config);

connection.connect();

connection.query(
  "CREATE DATABASE IF NOT EXISTS winder DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_520_ci;",
  function (error, results, fields) {
    if (error) {
      throw error;
    }

    console.log('创建数据库成功', results);
  }
);

connection.query("USE winder") //使用上述创建的表
connection.query(
  "CREATE TABLE IF NOT EXISTS Persons ( PersonID int, LastName varchar(255), FirstName varchar(255), Address varchar(255), City varchar(255) );",
  function (error, results, fields) {
    if (error) {
      throw error;
    }

    console.log('创建表成功', results);
  }
);
connection.end();
