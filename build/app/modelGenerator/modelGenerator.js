"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let mysql = require("mysql2");
let connection = mysql
    .createConnection({
    host: "192.168.0.15",
    port: "3006",
    user: "root",
    password: "raspberry",
    database: "Beecon"
});
class ModelGenerator {
    constructor() { }
    generateFromTableName(name) {
        console.log('start');
        let final = '';
        connection.query(`DESCRIBE ${name}`),
            (err, results, fields) => {
                console.log('query start');
                if (!err) {
                    let objects = JSON.parse(results);
                    console.log(objects);
                    objects.forEach((element) => {
                        let line = this.elementParser(element);
                        console.log(line);
                        final += line;
                    });
                    final += this.constructorConstructor(objects);
                    this.writeToFile('test', final);
                }
                else {
                    console.log(err);
                }
            };
    }
    elementParser(ds) {
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
            constructor += `${element.toLowerCase}:any`;
            if (index != arr.length)
                constructor += `,`;
        });
        constructor += `){`;
        arr.forEach((element, index) => {
            constructor += `this.${element}= ${element.toLowerCase};`;
        });
        constructor += `} }`;
    }
    writeToFile(filename, content) {
        console.log(`${filename}: ${content}`);
    }
}
exports.ModelGenerator = ModelGenerator;
module.exports = new ModelGenerator();
