const { getConnection } = require("./connection.js");

const orm = {
    // based on input objects, returns all or relevant from give table as part of response.
    //it also returns a promise to get relevant data.
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
    // returns a promise about inserting a given record in given table.
    insertOne: ({ table, cols, vals }) => {
        let queryString = `INSERT INTO ${table}`;
        queryString += ` (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)}) `;
        return createDataPromise(queryString, vals);
    },
    // returns a promise about updating a given record for given table based on input object.
    updateOne: ({ table, ColValsObj, whereObj }) => {
        let queryString = `UPDATE ?? SET ${objToSql(ColValsObj)} WHERE ${objToSql(whereObj).replace(",", " AND ")}`;
        const queryParamter = [];
        queryParamter.push(table);
        return createDataPromise(queryString, queryParamter);
    }
}
// converts an object into a string array so that it can be used to create relevant sql.
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

// creates a datapromise for given query and its query paramter.
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