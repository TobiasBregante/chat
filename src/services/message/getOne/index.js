import DB from '@/src/utils/connectDB'
import MessageSchema from '@/src/models/messages'
import Request from "@/src/middlewares/request"

const FindOneMessage = async (req, res) => {
    
    if(!Request('get', req)) { // checking request method and if is available
        res.json({ // response in error case if request method is not available
            status: 404,
            message: 'Not found request method'
        })
    } else {
        await DB() // connecting database
        
        const id = req?.query?.id

        MessageSchema.findOne({key: id}, (err, result) => {
            err ? res.json({ // response in error case if message has been not found
                status: 500,
                message: 'Message has been not found'
            })  
            : res.json({
                status: 200,
                result: result
            })
        })
    }
}

export default FindOneMessage