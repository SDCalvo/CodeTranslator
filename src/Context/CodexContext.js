import React, { useContext } from 'react'
const OpenAI = require('openai-api');

const CodexContext = React.createContext()

const OPENAI_API_KEY = process.env.REACT_APP_CODEX_KEY;

const openai = new OpenAI(OPENAI_API_KEY);

export function useCodex() {
    return useContext(CodexContext)
}

export function CodexProvider({ children }) {

    async function getCompletion(prompt) {
        const codexResponse = await openai.complete({
            engine: 'davinci-codex',
            prompt: prompt,
            maxTokens: 500,
            temperature: 0,
            topP: 1,
            presencePenalty: 0,
            frequencyPenalty: 0,
            bestOf: 1,
            n: 1,
            stream: false,
            stop: ['\n', "testing"]
        });
    
        console.log("codex resp: ", codexResponse.data);
    }

    const value = {
        getCompletion,
    };

    return <CodexContext.Provider value={value}>{children}</CodexContext.Provider>;
}