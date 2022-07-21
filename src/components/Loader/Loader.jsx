import { Spinner } from 'react-bootstrap'

const Loader = () => {

    return (
        <Spinner role="status" animation="grow">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}

export default Loader