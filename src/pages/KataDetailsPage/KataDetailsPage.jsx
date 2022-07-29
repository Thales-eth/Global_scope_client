import CodeMirror from '@uiw/react-codemirror';
import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link } from "react-router-dom"
import { MessageContext } from './../../contexts/userMessage.context'
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import codeService from '../../services/code.services';
import kataService from '../../services/kata.services';
import MyVerticallyCenteredModal from '../../components/WrongAnswerModal/WrongAnswerModal';
import './KataDetailsPage.css'

const KataDetailsPage = () => {


    let sun = 'https://res.cloudinary.com/dqwiiycdv/image/upload/v1659048408/sun-3-xxl_hptfh4.png'

    let moon = 'https://res.cloudinary.com/dqwiiycdv/image/upload/v1659047417/moon-4-xxl_qs1phw.png'

    const [lightMode, setLightMode] = useState(false)

    const [theme, setTheme] = useState(okaidia)

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

    const changeLights = () => {
        setLightMode(false)
        setTheme(githubLight)
    }

    const changeDark = () => {
        setLightMode(true)
        setTheme(githubDark)
    }

    return (

        <div className='kataPage'>

            <p className='kataDescription'>{kata.description}
                {

                    lightMode ? <div className='logoBox'><img onClick={changeLights} className='lightSwitch' src={sun} alt="light-mode" /></div>
                        : <div className='logoBox'><img onClick={changeDark} className='lightSwitch' src={moon} alt="dark-mode" /></div>

                }
            </p>

            <CodeMirror
                className='codeMirror'
                value={kata.content}
                height='400px'
                width='600px'
                theme={theme}
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
                failure && <button className='mistakesBtn' onClick={() => setModalShow(true)}>
                </button>
            }
        </div>

    )
}

export default KataDetailsPage