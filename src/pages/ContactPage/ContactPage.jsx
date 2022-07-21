import { Row, Col, Form, Button, Container } from "react-bootstrap"
import './ContactPage.css'

const ContactPage = () => {
    return (
        <div className="contactPage">
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Contact us!</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" />
                            </Form.Group>
                            <Button type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container >
        </div>
    )
}

export default ContactPage