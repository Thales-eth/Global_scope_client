import { useContext } from 'react';
import { MessageContext } from '../../contexts/userMessage.context';
import Toast from 'react-bootstrap/Toast'
import './UserMessage.css'

function UserMessage() {

    const { setShowMessage, showMessage } = useContext(MessageContext)

    return (
        <Toast
            className='toast'
            show={showMessage.show}
            onClose={() => setShowMessage({ ...showMessage, show: false })}
            style={{ position: 'fixed', bottom: 30, right: 30 }}
            autohide
            delay={5000}
        >
            <Toast.Header>
                <strong className="me-auto">{showMessage.title}</strong>
            </Toast.Header>
            <Toast.Body>{showMessage.text}</Toast.Body>
        </Toast>
    );
}

export default UserMessage