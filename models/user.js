const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {type: Schema.Types.String, unique: true, required: true},
    password: {type: Schema.Types.String, required: true},
    isAdmin: {type: Schema.Types.Boolean},
    isMember: {type: Schema.Types.Boolean},
})

module.exports = model("User", UserSchema);