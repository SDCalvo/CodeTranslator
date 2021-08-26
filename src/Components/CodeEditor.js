import React, { useState, useEffect } from 'react'
import Editor from 'react-simple-code-editor'
import { useCodex } from '../Context/CodexContext'
import Select from 'react-select'

export default function CodeEditor() {
    
	const options = [
		{ value: 'javascript', label: 'Javascript' },
		{ value: 'typescript', label: 'Typescript' },
		{ value: 'python', label: 'Python' },
		{ value: 'c#', label: 'C#' },
		{ value: 'c++', label: 'C++' },
		{ value: 'c', label: 'C' },
		{ value: 'java', label: 'Java' },
		{ value: 'ruby', label: 'Ruby' },
		{ value: 'go' , label: 'Go' },
		{ value: 'rust', label: 'Rust' },
		{ value: 'swift', label: 'Swift' },
	]
	const [fromSelect, setFromSelect] = useState('***choose a language***');
	const [toSelect, setToSelect] = useState('***choose a language to convert to***');
	const { getCompletion } = useCodex();
    const code = 
`#Transform the next code from ${fromSelect} to ${toSelect}

#code in ${fromSelect}

[Enter your code here]
	
#code in ${toSelect}
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

	useEffect(() => {
		setCodeValue(code);
	}, [fromSelect, toSelect]);

    async function handleSubmit(e) {
        e.preventDefault()
        const resp = await getCompletion(codeValue)
        setCodeValue(codeValue + resp)
        console.log('resp: ', resp)
    }

    return (
        <div className="container text-light">
            <div className="row justify-content-center align-items-center glass px-3 my-5">
				<div className="text-center mt-3 bg-dark rounded">
					<h1>Welcome to code converter!</h1>
					<p className="text-center mt-5">Code converter is a website that let's you type a code fragment and translate it to a different
					programing language using <a href="https://beta.openai.com/" target="_blank" rel="noreferrer">OpenAI API</a>.</p>
					<br></br>
					<p className="text-start">How to use: Chose the language of the code you want to convert and a language to convert that code into, 
					then, inside the code editor, replace the line that says '[Enter your code here]' with the code fragment 
					you want to convert. Have fun!</p>
				</div>
				<div className="my-3 d-flex w-100 justify-content-between align-items-center bg-dark py-3 rounded">
					<div className="ms-3"><h5>Transform code from </h5></div>
					<Select 
						options={options} 
						className="w-25 text-dark"
						onChange={(option) => setFromSelect(option.value)}
					/>
					<div><h5> to </h5></div>
					<Select 
						options={options} 
						className="w-25 text-dark me-3"
						onChange={(option) => setToSelect(option.value)}
					/>
				</div>
				<div className="editor-container bg-dark">
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
                </div>
                <button
                    onClick={(e) => {
                        handleSubmit(e)
                    }}
                    className="btn btn-primary rounded my-3 w-25"
                >
                    Transform!
                </button>
            </div>
        </div>
    )
}
