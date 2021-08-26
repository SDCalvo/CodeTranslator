import './App.css'
import CodeEditor from './Components/CodeEditor'
import {CodexProvider} from './Context/CodexContext'

function App() {
    return (
        <CodexProvider>
            <CodeEditor></CodeEditor>
        </CodexProvider>
    )
}

export default App
