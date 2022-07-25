import CodeMirror from '@uiw/react-codemirror';
import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { MessageContext } from './../../contexts/userMessage.context'
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import codeService from '../../services/code.services';
import kataService from '../../services/kata.services';
import './KatasPage.css'
import axios from 'axios';

const KatasPage = () => {

    const [code, setCode] = useState(`console.log('hola, bebé')`)

    const [answer, setAnswer] = useState(false)

    const [message, setMessage] = useState(false)

    const { setShowMessage } = useContext(MessageContext)

    const [kata1, setKata1] = useState({})

    const kata1ID = '62ded380bf1cbf4ef8ee30e5'

    kataService
        .getKata(kata1ID)
        .then(({ data }) => setKata1(data))
        .catch(err => console.log(err))

    const onChange = React.useCallback((value, viewUpdate) => {
        setCode(value)
    }, []);

    const sendCode = () => {
        codeService
            .createFile(code)
            .then(() => {
                verifyCode()
            })
            .catch(err => console.log(err))
    }

    const verifyCode = () => {

        codeService
            .verifyCode()
            .then(({ data }) => {

                if (data.results.includes('PASS')) {
                    setAnswer(true)
                    setShowMessage({ show: true, title: `✔️ Lezzzgoo!!`, text: 'Keep pushing 🎉' })

                }
                if (data.results.includes('FAIL')) {
                    setMessage(true)
                    setShowMessage({ show: true, title: `Nice try, buddy`, text: '❌ Wrong answer tho... :)' })
                }
            })
            .catch(err => console.log('OPS', err))
    }

    return (
        <div className='kataPage'>
            <h2 className='kataTitle'>{kata1.title}</h2>
            <CodeMirror
                className='codeMirror'
                value={kata1.content}
                height='400px'
                width='600px'
                theme={okaidia}
                extensions={[javascript({ jsx: true })]}
                onChange={onChange}
            />


            {
                answer ? <button className='submitKataSuccess mt-3'>Next test</button> : <button onClick={sendCode} className='submitKataBtn mt-3'>Submit your answer!</button>

            }

        </div>
    );
}

export default KatasPage
