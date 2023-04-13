import DB from '@/src/utils/connectDB'
import MessageSchema from '@/src/models/messages'
import Request from "@/src/middlewares/request"
import { nanoid } from 'nanoid'

const CreateMessage = async (req, res, files) => {

    if (!Request('post', req)) { // checking request method and if is available
        res.json({ // response in error case if request method is not available
            status: 404,
            message: 'Not found request method'
        })
    } else {
        await DB() // connecting database

        const {
            user_number,
            message,
        } = req.body

        MessageSchema?.collection?.insertOne({
            user_number: user_number,
            message: message,
            key: nanoid(),
            since_created: new Date()
        }, (err, result) => {
            console.log(result, err)
            err ? res.json({ // response in error case if message has been not created
                status: 500,
                message: 'Message has been not created'
            })
            : res.json({
                status: 200,
                created: true
            })
        })
    }
}

export default CreateMessage
