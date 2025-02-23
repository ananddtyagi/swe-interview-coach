'use client';

import { problems } from '@/problems';
import { Problem } from '@/problems/types';
import { createContext, useContext, useState } from 'react';

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
    const allProblems = Object.values(problems);
    const [currentProblem, setCurrentProblem] = useState<Problem | null>(allProblems[0] || null);

    return (
        <ProblemContext.Provider value={{ currentProblem, setCurrentProblem, allProblems }}>
            {children}
        </ProblemContext.Provider>
    );
};

export const useProblem = () => useContext(ProblemContext);
