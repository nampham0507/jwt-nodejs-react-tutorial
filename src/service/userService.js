import bcrypt from "bcryptjs";
// Get the client
import mysql from "mysql2/promise";
import bluebird from "bluebird";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  const [row, fields] = await connection.execute(
    "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
    [email, hashPass, username]
  );
};

const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [row, fields] = await connection.execute("select * from users");
    return row;
  } catch (error) {
    console.log("check err: ", error);
  }
};

const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  const [row, fields] = await connection.execute(
    "DELETE FROM users WHERE id=?",
    [id]
  );
};

const getUserById = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "SELECT * FROM users WHERE id=?",
      [id]
    );
    return rows;
  } catch (error) {
    console.log("check error: ", error);
  }
};

const updateUserInfo = async (email, username, id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "update users set email = ?, username = ? WHERE id = ?",
      [email, username, id]
    );
    return rows;
  } catch (error) {
    console.log("check error: ", error);
  }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo,
};
