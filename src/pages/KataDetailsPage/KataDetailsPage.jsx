import CodeMirror from '@uiw/react-codemirror';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom"
import { MessageContext } from './../../contexts/userMessage.context'
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import codeService from '../../services/code.services';
import kataService from '../../services/kata.services';
import MyVerticallyCenteredModal from '../../components/WrongAnswerModal/WrongAnswerModal';
import './KataDetailsPage.css'

const KataDetailsPage = () => {

    const { kata_id } = useParams()

    const [kata, setKata] = useState({})

    const { kataCode } = kata

    const [isLoading, setIsLoading] = useState("")

    const [message, setMessage] = useState(false)

    const { setShowMessage } = useContext(MessageContext)

    const [answer, setAnswer] = useState(false)

    const [failure, setFailure] = useState(false)

    const [wrongAnswer, setWrongAnswer] = useState("")

    const [modalShow, setModalShow] = React.useState(false);

    const [code, setCode] = useState(`console.log('hola, bebé')`)

    const navigate = useNavigate()

    let btnText = ""

    isLoading ? btnText = 'Loading...' : btnText = 'Submit your answer!'

    useEffect(() => {
        loadKata()
    }, [])

    const loadKata = () => {
        kataService
            .getKata(kata_id)
            .then(({ data }) => {
                setKata(data)
            })
            .catch(err => console.log(err))
    }

    const onChange = React.useCallback((value, viewUpdate) => {
        setCode(value)
    }, []);

    const sendCode = () => {
        setIsLoading(true)

        codeService
            .createFile(code, kataCode)
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

                console.log('MIRA LO QUE LLEGA->', data.results)

                setIsLoading(false)


                if (data.results.includes('PASS')) {
                    setAnswer(true)
                    setMessage(true)
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

    return (
        <div className='kataPage'>
            <p className='kataDescription'>{kata.description}</p>
            <CodeMirror
                className='codeMirror'
                value={kata.content}
                height='400px'
                width='600px'
                theme={okaidia}
                extensions={[javascript({ jsx: true })]}
                onChange={onChange}

            />

            {
                answer ? <Link to={'/katas'}><button className='submitKataSuccess mt-3'>I want more Katas!</button></Link> :
                    <button onClick={sendCode} disabled={isLoading} className='submitKataBtn mt-3'>
                        {btnText}
                    </button>

            }

            {
                failure && <Button className='mt-3' variant="danger" onClick={() => setModalShow(true)}>
                    Mistakes were made...
                </Button>
            }

            {/* <Button onClick={refresh} variant='dark'>Refresh</Button> */}


            <MyVerticallyCenteredModal wrongAnswer={wrongAnswer} show={modalShow}
                onHide={() => setModalShow(false)} />

        </div>
    )
}

export default KataDetailsPage