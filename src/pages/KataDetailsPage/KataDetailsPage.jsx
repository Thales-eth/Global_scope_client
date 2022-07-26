import CodeMirror from '@uiw/react-codemirror';
import React, { useState, useContext } from 'react';
import { useParams, Link } from "react-router-dom"
import { Button } from 'react-bootstrap';
import { MessageContext } from './../../contexts/userMessage.context'
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import codeService from '../../services/code.services';
import kataService from '../../services/kata.services';
import './KataDetailsPage.css'
import { useEffect } from 'react';

const KataDetailsPage = () => {

    const { kata_id } = useParams()

    const [kata, setKata] = useState({})

    const { kataCode } = kata

    const [message, setMessage] = useState(false)
    const { setShowMessage } = useContext(MessageContext)

    const [answer, setAnswer] = useState(false)

    const [code, setCode] = useState(`console.log('hola, bebé')`)

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

                if (data.results.includes('PASS')) {
                    setAnswer(true)
                    setShowMessage({ show: true, title: `✔️ 10/10!!`, text: 'Keep pushing 🎉' })

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
            <h2 className='kataTitle'>{kata.title}</h2>
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
                answer ? <Link to={'/katas'}><button className='submitKataSuccess mt-3'>I want more Katas!</button></Link> : <button onClick={sendCode} className='submitKataBtn mt-3'>Submit your answer!</button>

            }

        </div>
    )
}

export default KataDetailsPage