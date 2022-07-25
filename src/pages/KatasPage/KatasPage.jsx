import CodeMirror from '@uiw/react-codemirror';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import codeService from '../../services/code.services';
import './KatasPage.css'

const KatasPage = () => {

    const [code, setCode] = useState(`console.log('hola, bebé')`)

    const onChange = React.useCallback((value, viewUpdate) => {
        setCode(value)
    }, []);

    const sendCode = () => {
        codeService
            .sendCode(code)
            .then(({ data }) => console.log(data))
            .catch(err => console.log(err))
    }

    return (
        <div className='kataPage'>
            <h2>Code a function that multiplies 2 numbers!:</h2>
            <CodeMirror
                className='codeMirror'
                value='function sum(a,b) { 
                    //write your code here
                }
                // Do not touch anything below this line :3
                module.exports = sum'
                height='400px'
                width='600px'
                theme={okaidia}
                extensions={[javascript({ jsx: true })]}
                onChange={onChange}
            />
            <Button onClick={sendCode} className='submitKataBtn mt-3'>Submit your answer!</Button>
        </div>
    );
}

export default KatasPage
