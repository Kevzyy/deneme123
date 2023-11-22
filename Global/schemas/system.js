const { Schema, model } = require("mongoose");

const schema = Schema({
	bankilit: Boolean, 
    mutekilit: Boolean, 
});

module.exports = model("system", schema);
