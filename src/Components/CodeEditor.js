import React, { useState, useEffect } from 'react'
import Editor from 'react-simple-code-editor'
import { useCodex } from '../Context/CodexContext'
import Select from 'react-select'
    
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
    { value: 'R', label: 'R' },
]

export default function CodeEditor() {
	const [fromSelect, setFromSelect] = useState('***choose a language***');
	const [toSelect, setToSelect] = useState('***choose a language to convert to***');
	const [yourCode, setYourCode] = useState('[Enter your code here]');
    const code = 
`#Transform the next code from ${fromSelect} to ${toSelect}
    
#code in ${fromSelect}
    
${yourCode} //think about how to make this into a state and how to modify it
        
#code in ${toSelect}
`
    const [codeValue, setCodeValue] = useState(code)

	const { getCompletion } = useCodex();

    const highlightWithLineNumbers = (input) =>
        input
            .split('\n')
            .map(
                (line, i) =>
                    `<span class='editorLineNumber'>${i + 1}</span>${line}`
            )
            .join('\n')
    
	useEffect(() => {
		setCodeValue(code);
	}, [fromSelect, toSelect, code]);

    async function handleSubmit(e) {
        e.preventDefault()
        const resp = await getCompletion(codeValue)
        setCodeValue(codeValue + resp)
        console.log('resp: ', resp)
    }

    return (
        <div className="container text-light">
            <div className="row justify-content-center align-items-center glass px-3 my-5">
				<div className="text-center mt-3 bg-dark rounded py-3">
					<h1>Welcome to code converter!</h1>
					<p className="text-center mt-5">Code converter is a website that let's you type a code fragment and translate it to a different
					programing language using <a href="https://beta.openai.com/" target="_blank" rel="noreferrer">OpenAI API</a>.</p>
					<br/>
					<p className="text-start">How to use: Chose the language of the code you want to convert and a language to convert that code into, 
					then, inside the code editor, replace the line that says '[Enter your code here]' with the code fragment 
					you want to convert. Take note that you don't need to use the selects, you can manually write everything in the codebox. 
                    Also if you want you can use comments to tell the model to write code for you, the translator is a suggestion
                    but you can use the codebox to interact with the model and ask it to write any code you like using natural language.
                    To have the best results try giving very detailed instructions in the codebox for what you expect the model to do.
                    And last but not least Have fun!</p>
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
                        highlight={(code) => highlightWithLineNumbers(code)}
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
                    Ask the AI 🙂
                </button>
            </div>
        </div>
    )
}

