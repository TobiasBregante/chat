import Request from "@/src/middlewares/request"
import DB from '@DB'
import UserScheme from "@/src/models/user"

const GetUser = async (req, res) => {

    if (!Request('get', req)) { // checking request method and if is available
        res.json({ // response in error case if request method is not available
            error: 404,
            message: 'Not found request method'
        })
    } else {
        await DB()

        if (req?.headers['query'] === 'all') {
            req?.headers['query'] !== 'null' ? UserScheme.find({}, { pdw: 0 }, (err, result) => {
                err ? res.json({ // response in error case if user has been not created
                    status: 200,
                    message: 'Users not exist'
                })
                    : res.json(result)
            })
                : res.json({ // response in error case if user has been not created
                    status: 200,
                    message: 'No users found'
                })
        } else {
            req?.headers['query'] !== 'all' && req?.headers['query'] !== 'null' ? UserScheme.findOne(JSON.parse(req?.headers['query']), (err, result) => {
                // console.log(result)
                err ? res.json({ // response in error case if user has been not created
                    status: 200,
                    message: 'User not exist'
                })
                    : res.json({
                        user: {
                            credential: result?.credential,
                            since_created: result?.since_created,
                            username: result?.username,
                            _id: result?.key,
                            business_name: result?.business_name,
                            tax_qualification: result?.tax_qualification,
                            email: result?.email,
                            CUIT: result?.CUIT,
                            tel: result?.tel,
                            personal_info: result?.personal_info
                        }
                    })
            })
                : res.json({ // response in error case if user has been not created
                    status: 200,
                    message: 'User not exist'
                })
        }
    }

}

export default GetUser