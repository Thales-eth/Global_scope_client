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

        console.log('LLEGA EL CODE, NO?-->', kataCode)

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
                    setMessage(true)
                    setShowMessage({ show: true, title: `Nice try, buddy`, text: `❌Wrong answer tho... :)` })

                    let aux = data.results.split('Expected: ')
                    let aux2 = data.results.split('Received: ')

                    aux.shift()
                    aux2.shift()

                    aux = aux.map(e => e.split(" ")[0])
                    aux2 = aux2.map(e => e.split(" ")[0])

                    let expectArr = []

                    aux.forEach((e, i) => {
                        expectArr.push(`Expected ${e}, received ${aux2[i]}`)
                    })

                    let finalResult = expectArr.join(" ")

                    setWrongAnswer(finalResult)

                }

                if (!data.results) {
                    setShowMessage({ show: true, title: `❌ Timeout`, text: 'Is that an infinite loop? :(' })
                }

            })
            .catch(err => console.log('OPS', err))
    }

    return (
        <>

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



                <MyVerticallyCenteredModal className='mistakesModal' wrongAnswer={wrongAnswer} show={modalShow}
                    onHide={() => setModalShow(false)} />

                {
                    failure && <button className='mistakesBtn mt-3' onClick={() => setModalShow(true)}>
                    </button>
                }
            </div>


        </>
    )
}

export default KataDetailsPage