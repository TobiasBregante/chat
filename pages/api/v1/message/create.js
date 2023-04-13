import CreateMessage from "@/src/services/message/create"

import { IncomingForm } from "formidable";

export const config = {
    api: {
        bodyParser: false
    }
};

const CreateMessageService = async (req, res) => {    
    const form = new IncomingForm();

    await form.parse(req, async (err, field, file) => {
        req.body = field
        return await CreateMessage(req, res, file)        
    })
}

export default CreateMessageService