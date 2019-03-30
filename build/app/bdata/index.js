"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Bdata controller
needs:
table name
authorization
filter
queryType
fields selected
*/
const connection = require("../services/mysqlController");
//import {connection} from "../services/mysqlController"
class Bdata {
    Bdata() { }
    query(tableName, queryType, select, condition) {
        return new Promise((resolve, reject) => {
            connection.query(`${this.queryBuilder(tableName, queryType, select, condition)}`, (err, results, fields) => {
                if (!err) {
                    console.log(`results:${results}`);
                    return resolve(JSON.stringify(results));
                }
                else {
                    console.log(err);
                    return reject();
                }
            });
        });
    }
    directQuery(query) {
        return new Promise((resolve, reject) => {
            connection.query(query, (err, results, fields) => {
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
    queryBuilder(tableName, queryType, select, condition) {
        let queryString = "";
        switch (queryType) {
            case `Get`:
                queryString = `SELECT ${select} FROM ${tableName} WHERE ${condition}`;
                break;
            case `Update`:
                queryString = `UPDATE ${tableName} SET ${select} = NULL WHERE ${condition}`;
                break;
            case `Delete`:
                queryString = `DELETE FROM ${tableName} WHERE ${condition}`;
                break;
            case `Create`:
                queryString = `INSERT INTO ${tableName} () VALUES()`;
        }
        console.log(queryString);
        return queryString;
    }
    generateFromTableName(name) {
        console.log('start');
        let final = `class ${name} {`;
        return new Promise((resolve, reject) => {
            console.log('start propise');
            this.directQuery(`DESCRIBE User`).then((results) => {
                let objects = JSON.parse(results);
                objects.forEach((element) => {
                    let line = this.elementParser(element);
                    final += line;
                });
                final += this.constructorConstructor(objects);
                this.writeToFile(name, final);
                return resolve(final);
            });
        });
    }
    elementParser(ds) {
        console.log(ds.Type + " element parser");
        let returnString = `${ds.Field}:`;
        if (ds.Type.includes('int' || ds.Type.includes('float'))) {
            returnString += `number;`;
        }
        else if (ds.Type === 'Bit') {
            returnString += `boolean;`;
        }
        else {
            //treat everything else as a string
            returnString += `string;`;
        }
        return returnString;
    }
    constructorConstructor(arr) {
        let constructor = `constructor(`;
        arr.forEach((element, index) => {
            constructor += `${element.Field}:any`;
            if (index != arr.length - 1)
                constructor += `,`;
        });
        constructor += `){`;
        arr.forEach((element, index) => {
            constructor += `this.${element.Field}= ${element.Field};`;
        });
        constructor += `} }`;
        return constructor;
    }
    writeToFile(filename, content) {
        var fs = require("fs");
        console.log(`${filename}: ${content}`);
        fs.appendFile(`${filename}Model.ts`, content, function (err) {
            if (err)
                console.log(err);
            console.log("Successfully Written to File.");
        });
    }
}
exports.Bdata = Bdata;
module.exports = Bdata;
