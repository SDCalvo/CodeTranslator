import React, { useState } from 'react'
import Editor from 'react-simple-code-editor'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism.css'
import {useCodex} from '../Context/CodexContext'

export default function CodeEditor() {
    
	const { getCompletion } = useCodex();

	const code = `function add(a, b) {
		return a + b;
	  }
	  
	  const a = 123;
	  `

    const hightlightWithLineNumbers = (input) =>
        input
            .split('\n')
            .map(
                (line, i) =>
                    `<span class='editorLineNumber'>${i + 1}</span>${line}`
            )
            .join('\n')

    const [codeValue, setCodeValue] = useState(code)

	function handleSubmit(e) {
		e.preventDefault()
		getCompletion("translate this code from javascript to python " + codeValue);
		console.log("code value: ", codeValue);
	}

    return (
        <div className="container">
			<div className="row justify-content-center align-items-center">
				<Editor
					value={codeValue}
					onValueChange={(code) => setCodeValue(code)}
					highlight={(code) => hightlightWithLineNumbers(code)}
					padding={10}
					textareaId="codeArea"
					className="editor"
					style={{
						fontFamily: '"Fira code", "Fira Mono", monospace',
						fontSize: 18,
						outline: 0,
					}}
				/>
				<button className="btn btn-primary rounded w-25 my-5">asd</button>
			</div>
        </div>
    )
}
