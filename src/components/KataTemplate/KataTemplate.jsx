import CodeMirror from '@uiw/react-codemirror';
import React, { useState, useContext } from 'react';
import codeService from '../../services/code.services';
import MyVerticallyCenteredModal from '../../components/WrongAnswerModal/WrongAnswerModal';
import { MessageContext } from './../../contexts/userMessage.context'
import { Button } from 'react-bootstrap';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { useNavigate } from 'react-router-dom';
import Timer from '../Timer/Timer';
import './KataTemplate.css'


const KataTemplate = ({ katas }) => {

    const [code, setCode] = useState(`console.log('hola, bebé')`)

    const [SuccesText, setSuccessText] = useState(`Next Kata`)

    const [isLoading, setIsLoading] = useState("")

    const [message, setMessage] = useState(false)

    const { setShowMessage } = useContext(MessageContext)

    const [answer, setAnswer] = useState(false)

    const [failure, setFailure] = useState(false)

    const [wrongAnswer, setWrongAnswer] = useState("")

    const [modalShow, setModalShow] = React.useState(false);

    const navigate = useNavigate()

    let btnText = ""

    isLoading ? btnText = 'Loading...' : btnText = 'Submit your answer!'

    const [counter, setCounter] = useState(0)

    const sendCode = () => {
        setIsLoading(true)

        codeService
            .createFile(code, katas[counter].kataCode)  // Send kata code as props! 
            .then(({ data }) => {
                const { kataCode } = data
                verifyCode(kataCode)
            })
            .catch(err => console.log(err))
    }

    const verifyCode = (kataCode) => {

        codeService
            .verifyCode(kataCode)
            .then(({ data }) => {

                console.log('MIRA LO QUE LLEGA->', data)

                setIsLoading(false)


                if (data.results.includes('PASS')) {
                    setAnswer(true)
                    setMessage(true)
                    setFailure(false)
                    console.log()
                    setShowMessage({ show: true, title: `✔️ 10/10!!`, text: 'Keep pushing 🎉' })

                }
                if (data.results.includes('FAIL')) {
                    // Test failure results
                    setFailure(true)
                    setWrongAnswer(data.results)
                    setMessage(true)
                    setShowMessage({ show: true, title: `Nice try, buddy`, text: `❌Wrong answer tho... :)` })
                }

                if (!data.results) {
                    setShowMessage({ show: true, title: `❌ Timeout`, text: 'Is that an infinite loop? :(' })
                }

            })
            .catch(err => console.log('OPS', err))
    }

    const onChange = React.useCallback((value, viewUpdate) => {
        setCode(value)
    }, []);

    const updateCounter = () => {

        if (counter < 2) {
            setCounter(prevCount => prevCount + 1)
            setAnswer(false)

            counter === 1 && setSuccessText('You Won :)')
        }

        else {
            console.log('¿¿¿???')
            navigate('/catalog')
        }

    }

    return (
        <div className='kataPage'>
            <Timer />
            <p className='kataDescription'>{katas[counter].description}</p>
            <CodeMirror
                className='codeMirror'
                value={katas[counter].content}
                height='400px'
                width='600px'
                theme={okaidia}
                extensions={[javascript({ jsx: true })]}
                onChange={onChange}

            />

            {
                answer ? <button onClick={updateCounter} className='submitKataSuccess mt-3'>{SuccesText}</button> :
                    <button onClick={sendCode} disabled={isLoading} className='submitKataBtn mt-3'>
                        {btnText}
                    </button>

            }

            {
                failure && <Button className='mt-3' variant="danger" onClick={() => setModalShow(true)}>
                    Mistakes were made...
                </Button>
            }



            <MyVerticallyCenteredModal wrongAnswer={wrongAnswer} show={modalShow}
                onHide={() => setModalShow(false)} />

        </div >
    )
}

export default KataTemplate