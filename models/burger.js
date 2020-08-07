const orm = require("../config/orm.js");

const burger = {
    all: () => {
        return orm.selectWhatWhere({
            table: 'burgers'
        });
    },
    create: (burgerObject) => {
        const cols = [];
        const vals = [];
        for (const key in burgerObject) {
            const value = burgerObject[key];
            cols.push(key);
            vals.push(value);
        }
        return orm.insertOne({
            table: 'burgers',
            cols: cols,
            vals: vals
        });
    },
    update: ({ burger, where }) => {
        return orm.updateOne({
            table: 'burgers',
            ColValsObj: burger,
            whereObj: where
        });
    }
}

module.exports = burger;