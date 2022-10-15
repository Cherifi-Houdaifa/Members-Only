const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date: {
        type: Schema.Types.Date,
        required: true,
    },
    text: {
        type: Schema.Types.String,
        maxLength: 300,
        required: true,
    },
});

module.exports = model('Message', MessageSchema);
