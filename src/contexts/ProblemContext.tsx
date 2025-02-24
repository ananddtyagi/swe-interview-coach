'use client';

import { useMode } from '@/contexts/ModeContext';
import { coding_problems, Problem, whiteboard_problems } from '@/problems';
import { createContext, useContext, useEffect, useState } from 'react';

interface ProblemContextType {
    currentProblem: Problem | null;
    setCurrentProblem: (problem: Problem) => void;
    allProblems: Problem[];
}

const ProblemContext = createContext<ProblemContextType>({
    currentProblem: null,
    setCurrentProblem: () => { },
    allProblems: []
});

export const ProblemProvider = ({ children }: { children: React.ReactNode }) => {
    const { mode } = useMode();
    const allProblems = mode === 'codeEditor' ? Object.values(coding_problems) : Object.values(whiteboard_problems);
    const [currentProblem, setCurrentProblem] = useState<Problem | null>(allProblems[0] || null);

    useEffect(() => {
        setCurrentProblem(allProblems[0]);
    }, [mode]);


    return (
        <ProblemContext.Provider value={{ currentProblem, setCurrentProblem, allProblems }}>
            {children}
        </ProblemContext.Provider>
    );
};

export const useProblem = () => useContext(ProblemContext);
