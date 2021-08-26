import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism.css'

export default function CodeEditor() {
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

    return (
        <div className="container">
			<div className="row">
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
        </div>
    )
}
