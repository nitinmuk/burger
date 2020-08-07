const { getConnection } = require("./connection.js");

const orm = {
    selectWhatWhere: ({ whatToSelect, table, colName, colValue }) => {
        let queryString = "";
        let queryParamter = [];
        queryString += whatToSelect ? `SELECT ?? FROM ??` : `SELECT * FROM ??`;
        if (whatToSelect) {
            queryParamter.push(whatToSelect);
        }
        queryParamter.push(table);
        if (colName && colValue) {
            queryString += `WHERE ?? = ?`;
            queryParamter.push(colName);
            queryParamter.push(colValue);
        }
        return createDataPromise(queryString, queryParamter);
    },
    insertOne: ({ table, cols, vals }) => {
        let queryString = `INSERT INTO ${table}`;
        queryString += ` (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)}) `;
        console.log(queryString);
        return createDataPromise(queryString, vals);
    },
    updateOne: ({ table, ColValsObj, whereObj }) => {
        let queryString = `UPDATE ?? SET ${objToSql(ColValsObj)} WHERE ${objToSql(whereObj).replace(",", " AND ")}`;
        const queryParamter = [];
        queryParamter.push(table);
        console.log(queryString);
        return createDataPromise(queryString, queryParamter);
    }
}

const objToSql = (object) => {
    const array = [];
    // loop through the keys and push the key/value as a string in the array
    for (const key in object) {
        let value = object[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(object, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            array.push(key + "=" + value);
        }
    }
    // translate array of strings to a single comma-separated string
    return array.toString();
}

const printQuestionMarks = (count) => {
    const array = [];
    for (let i = 0; i < count; i++) {
        array.push("?");
    }
    return array.toString();
}

const createDataPromise = (query, queryParamter) => {
    return new Promise((resolve, reject) => {
        getConnection()
            .then((connection) => {
                connection.query(query, queryParamter, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                    connection.release();
                });
            })
            .catch(error => console.log(error));
    });
}

module.exports = orm;