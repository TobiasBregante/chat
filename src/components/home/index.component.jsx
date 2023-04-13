/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import Body from '../_body.component'
import axios from 'axios'
import Chat from '../chat'

const HomeComponent = () => {
    const [dataMessages, setDataMessages] = useState([])

    const { API_PATH } = process.env

    const handleGetMessages = async seeMore => {
        const res = await (await axios?.get(`${API_PATH}/message/get`, {
            headers: {
                "token": '',
                "root": ''
            }
        }))?.data

        setDataMessages(res?.result)
    }

    useEffect(() => {
        handleGetMessages()
     }, [])

    return (
        <Body>
            <article className="row contain">
                <Chat/>
            </article>
        </Body>
    )
}

export default HomeComponent