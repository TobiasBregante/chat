import FindOneMessage from "@/src/services/message/getOne"

const FindOneMessageService = async (req, res) => {
    
    return FindOneMessage(req, res)
}

export default FindOneMessageService