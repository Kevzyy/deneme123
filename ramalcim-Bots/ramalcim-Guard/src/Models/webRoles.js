const mongoose = require('mongoose');

const Webb = mongoose.Schema({
  guildID: String, 
  userID: String, 
  roles: Array
});
module.exports = mongoose.model("webRoles", Webb);

