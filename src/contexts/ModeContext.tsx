'use client';

import { createContext, useContext, useState } from 'react';

interface ModeContextType {
    mode: string
    setMode: (mode: string) => void
}

const ModeContext = createContext<ModeContextType>({
    mode: 'codeEditor',
    setMode: () => { }
});

export const ModeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<string>('codeEditor');

    return (
        <ModeContext.Provider value={{ mode, setMode }}>
            {children}
        </ModeContext.Provider>
    );
};

export const useMode = () => useContext(ModeContext);
