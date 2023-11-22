const { Schema, model } = require("mongoose");

const schema = new Schema({
    guildID: String,
    roller: Array
});

module.exports = model("guildPerms", schema);