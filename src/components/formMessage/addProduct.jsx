import { useState } from "react"
import { Form, Button, Row, Col } from 'react-bootstrap'
import Body from "../_body.component"
import axios from "axios"

const AddMessage = () => {
    const [form, setForm] = useState({
        title: null,
        description: null,
        since_created: new Date(),
    })

    const { API_PATH } = process.env

    const notify = msg => toast(msg);

    const handleForm = key => e => {
        setForm({ ...form, [key]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        let data = new FormData()

        data.append("title", form?.title)
        data.append("description", form?.description)
        data.append("tel", form?.tel)

        const res = await (await axios.post(`${API_PATH}/message/create`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })).data

        if (res?.created) {
            notify('Se ha creado exitosamente')
        } else {
            notify('Error al cargar el Message')
        }
    }

    return (
        <Body>
            <Row>
                <Col xs={11} className='m-auto pt-4 pb-4'>
                    <h1 className="text-secondary">Create a new Message in simple steps</h1>
                </Col>
                <Col xs={11} className='m-auto pt-4 pb-4'>
                    <Form onSubmit={handleSubmit} className='col-12'>
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control onChange={handleForm('title')} type="text" placeholder="Title" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={handleForm('description')} as="textarea" placeholder="Description" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTel">
                            <Form.Label>Tel</Form.Label>
                            <Form.Control onChange={handleForm('tel')} type="number" placeholder="Tel (+54)" />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Presentation image</Form.Label>
                            <Form.Control ref={imgRef} onChange={handleForm('image')} type="file" />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" type="submit">
                                Add Message
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Body>
    )
}

export default AddMessage