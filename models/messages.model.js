const { types } = require('joi')
const mongoose = require('mongoose')

const messagesSchema = mongoose.Schema({
    to: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    from: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    message: {
        type: String
    },

},
{
    timestamps: true
}
)

module.exports = mongoose.model('Message', messagesSchema)