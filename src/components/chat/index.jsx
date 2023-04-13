import axios from "axios"
import { useState, useRef } from "react"
import { useRouter } from 'next/router'
import Body from "../_body.component"
import { Grid, Textarea, Button, Text } from "@nextui-org/react"
import { useEffect } from "react"

const Chat = () => {
    const [form, setForm] = useState({
        since_created: new Date(),
    })
    const textareaRef = useRef(null);
    const router = useRouter()
    const [userNumber, setUserNumber] = useState(1)
    const [loop, setLopp] = useState(false);
    const [allMessages, setAllMessages] = useState([])
    const { user } = router?.query

    const handleGetMessages = async () => {
        const res = await (await axios?.get(`${API_PATH}/message/get`))?.data
        setAllMessages(res?.result)
    }
    
    const loopThrougtOneSecond = () => {
        setInterval(() => handleGetMessages(), 2000)
    }
    
    useEffect(() => {
        loopThrougtOneSecond()
        handleGetMessages()
        .then(() => {
            window.scrollTo(0, document.body.scrollHeight);
        })
        setUserNumber(user)
    }, [user, loop])

    const { API_PATH } = process.env

    const handleForm = key => e => {
        setForm({ ...form, [key]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        window.scrollTo(0, document.body.scrollHeight);
        if(form?.message) {
            let data = new FormData()
    
            data.append("message", form?.message?.trim())
            data.append("user_number", userNumber)
    
            const res = await (await axios.post(`${API_PATH}/message/create`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })).data
    
            if (res?.created) {
                textareaRef.current.value = ''
                setLopp(!loop)
                setForm({})
            } else {
                textareaRef.current.value = ''
                setLopp(!loop)
                setForm({})
            }
        } else {
            textareaRef.current.value = ''
            setForm({})
        }
    }

    return (
        <>
        <Body>
            <article className="row contain">
                <Grid.Container className="chat-container" justify="center" css={{ borderRadius: 20, boxShadow: '0px 0px 10px rgba(0, 0, 0, .1)', pb: '2%' }} auto>
                        {
                            allMessages?.length > 0 ? allMessages?.map((msg, i) => <Grid xs={12}>
                                <Grid className={`${parseInt(msg?.user_number) == parseInt(userNumber) ? 'textBoxChat' : 'textBoxChatResponse'}`} css={{ 
                                    maxWidth: '70%',
                                    minWidth: '35%', 
                                    h: 'auto',  
                                    m: 'auto', 
                                    left: `${parseInt(msg?.user_number) == parseInt(userNumber) ? 'auto' : 0}`,
                                    right: `${parseInt(msg?.user_number) == parseInt(userNumber) ? 0 : 'auto'}`, 
                                    marginRight: `${parseInt(msg?.user_number) == parseInt(userNumber) ? '1%' : 'auto'}`,
                                    marginLeft: `${parseInt(msg?.user_number) == parseInt(userNumber) ? 'auto' : '1%'}`, 
                                    top: 0, 
                                    marginTop: '3%',
                                    borderRadius: 50 
                                }}>
                                    <Text color="white" css={{ fontSize: '.8rem', p: '1%' }}>
                                        {msg?.message}
                                    </Text>
                                </Grid>
                            </Grid>)
                            : <Text css={{ color: '#c2c2c2', textAlign: 'center', w: '100%', m: 'auto', lineHeight: 0 }} h4>
                                Aquí aparecerán sus mensajes
                            </Text>
                        }
                </Grid.Container>
                <form onSubmit={handleSubmit} className='col-12 container-textarea'>
                    <Grid.Container justify="center" className='grid-container'>
                            <Grid xs={9} sm={9} md={11} lg={11} xl={11} css={{ p: 0, m: 'auto' }}>
                                <Textarea
                                    onKeyPress={e => e.key === 'Enter' && handleSubmit(e) }
                                    className="textarea"
                                    ref={textareaRef}
                                    onChange={handleForm('message')}
                                    css={{ w: '99%', m: 'auto' }}
                                    placeholder="Escibe un mensaje"
                                />
                            </Grid>
                            <Grid xs={3} sm={3} md={1} lg={1} xl={1} css={{ p: 0, m: 'auto' }}>
                                <Button
                                    className="btnSubmit"
                                    auto
                                    type="submit"
                                    color="primary"
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" width={'30%'} height={'30%'} fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                                    </svg>}
                                />
                            </Grid>
                    </Grid.Container>
                </form>
            </article>
                
        </Body>
        </>
    )
}

export default Chat