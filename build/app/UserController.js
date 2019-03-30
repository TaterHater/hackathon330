"use strict";
const bdata = require("./bdata/index");
const connection = require("./services/mysqlController");
class UserController extends bdata {
    UserController() {
    }
    createUser(username, passwordHash, salt) {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO User (Username,Email,PasswordHash,Salt) VALUES(
                  ?,?,?,?
              )`, [username, username, passwordHash, salt], (err, results, fields) => {
                if (!err) {
                    console.log(`results:${JSON.stringify(results)}`);
                    return resolve(JSON.stringify(results));
                }
                else {
                    console.log(err);
                    return reject();
                }
            });
        });
    }
}
module.exports = UserController;
