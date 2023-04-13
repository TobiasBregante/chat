import { nanoid } from "nanoid"
import mongoose from "mongoose"

const Schema = mongoose.Schema;

const standardString = (required, min, max,) => ({
    type: String,
    trim: true,
    minLength: min,
    maxLength: max,
    required: required ?? false
})

const standardId = (length) => ({
    type: String,
    minLength: 4,
    maxLength: 2048,
    trim: true,
    default: () => nanoid(length)
})

const User = new Schema({
    _id: standardId(10),
    key: String,
})

export default mongoose.models.User || mongoose.model('User', User);

export {
    User
}