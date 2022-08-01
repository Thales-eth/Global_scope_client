import React, { useState, useContext } from 'react';
import { MessageContext } from './../../contexts/userMessage.context'
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import { useNavigate } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import codeService from '../../services/code.services';
import MyVerticallyCenteredModal from '../../components/WrongAnswerModal/WrongAnswerModal';
import Timer from '../Timer/Timer';
import parseErrorMessage from '../../utils/parseErrorMessage';

const KataTemplate = ({ katas }) => {

    let sun = 'https://res.cloudinary.com/dqwiiycdv/image/upload/v1659048408/sun-3-xxl_hptfh4.png'

    let moon = 'https://res.cloudinary.com/dqwiiycdv/image/upload/v1659047417/moon-4-xxl_qs1phw.png'

    const [code, setCode] = useState(`console.log('hola, bebé')`)

    const [SuccesText, setSuccessText] = useState(`Next Kata`)

    const [lightMode, setLightMode] = useState(false)

    const [theme, setTheme] = useState(okaidia)

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
            .createFile(code, katas[counter].kataCode)
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

                setIsLoading(false)


                if (data.results.includes('PASS')) {
                    setAnswer(true)
                    setMessage(true)
                    setFailure(false)
                    setShowMessage({ show: true, title: `✔️ 10/10!!`, text: 'Keep pushing 🎉' })

                }

                if (data.results.includes('FAIL')) {
                    setFailure(true)
                    setMessage(true)
                    setShowMessage({ show: true, title: `Nice try, buddy`, text: `❌Wrong answer tho... :)` })

                    setWrongAnswer(parseErrorMessage(data.results))
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

        if (counter < 4) {
            setCounter(prevCount => prevCount + 1)
            setAnswer(false)

            counter === 3 && setSuccessText('You Won :)')
        }

        else {
            navigate('/')
        }

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
            <Timer />

            <p className='kataDescription'>{katas[counter].description}
                {

                    lightMode ? <div className='logoBox'><img onClick={changeLights} className='lightSwitch' src={sun} alt="light-mode" /></div>
                        : <div className='logoBox'><img onClick={changeDark} className='lightSwitch' src={moon} alt="dark-mode" /></div>

                }
            </p>

            <CodeMirror
                className='codeMirror'
                value={katas[counter].content}
                height='400px'
                width='600px'
                theme={theme}
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
                failure && <button className='mistakesBtn' onClick={() => setModalShow(true)}>
                </button>
            }


            <MyVerticallyCenteredModal wrongAnswer={wrongAnswer} show={modalShow}
                onHide={() => setModalShow(false)} />

        </div >
    )
}

export default KataTemplate