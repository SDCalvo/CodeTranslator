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
            presencePenalty: 0.5,
            frequencyPenalty: 0.7,
            bestOf: 2,
            n: 1,
            stream: false,
            stop: null,
        });

        console.log("codex resp: ", codexResponse.data);
        return codexResponse.data.choices[0].text;
    }

    const value = {
        getCompletion,
    };

    return <CodexContext.Provider value={value}>{children}</CodexContext.Provider>;
}