import Body from '../_body.component'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'

const MessageComponent = () => {
    const router = useRouter()
    const [data, setData] = useState({})
    const { id } = router?.query
    const { API_PATH } = process.env

    const handleGetMessages = async () => {
        const res = await (await axios?.get(`${API_PATH}/message/getOne/${id}`, {
            headers: {
                "token": '',
                "root": ''
            }
        }))?.data

        setData(res?.result)
    }

    useEffect(() => {
        id && handleGetMessages()
    }, [id])

    return (
        <Body>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <h3>
                            {data?.title}
                        </h3>
                        <div className="d-flex ">
                        </div>
                        <Button
                            className='m-1 btnMessageBuy'
                            variant='success'
                            onClick={() => window.open(`https://api.whatsapp.com/send?phone=${data.tel}&text=Me interesa este curso ${window.location}`, '_blank')}>
                            Consultar por WhatsApp
                        </Button>
                    </div>
                    <div className="col-12">
                        <h4>Detalles</h4>
                        <pre className='wrapping'>
                            <p>
                                {data?.description}
                            </p>
                        </pre>
                    </div>
                </div>
            </div>
        </Body>
    )
}

export default MessageComponent