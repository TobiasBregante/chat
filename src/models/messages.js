import mongoose from "mongoose"

const Schema = mongoose.Schema;

const standardString = (required, min, max,) => ({
    type: String,
    trim: true,
    minLength: min,
    maxLength: max,
    required: required ?? false
})

const Messages = new Schema({
    _id: String,
    user_number: Number,
    message: standardString(true),
    since_created: {
        type: Date,
        default: new Date()
    },
})

export default mongoose?.models?.Messages || mongoose.model('Messages', Messages)

export {
    Messages
}