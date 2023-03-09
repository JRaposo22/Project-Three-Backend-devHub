const {Schema, model} = require('mongoose');

const hintSchema = new Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    category: {
        type: String,
        require: true,
        trim: true
    },
    createdBy: [{ type: Schema.Types.ObjectId, ref:'User' }]
}, {
    timestamps: true
})

const Hint = model('Hint', hintSchema);
module.exports = Hint;