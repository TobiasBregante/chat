import FindMessage from "@/src/services/message/get"

const FindMessageService = async (req, res) => {
    
    return FindMessage(req, res)
}

export default FindMessageService