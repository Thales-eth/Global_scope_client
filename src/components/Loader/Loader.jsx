import { Spinner } from 'react-bootstrap'
import './Loader.css'

const Loader = () => {

    return (
        <Spinner className='spinner' role="status" animation="grow">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}

export default Loader