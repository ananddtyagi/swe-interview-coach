'use client';
import { useProblem } from "@/contexts/ProblemContext";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent } from './ui/card';

export const ProblemSelector = () => {
    const { currentProblem, setCurrentProblem, allProblems } = useProblem();

    const handleProblemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = event.target.selectedIndex - 1; // Adjust for the disabled option
        if (selectedIndex >= 0 && selectedIndex < allProblems.length) {
            setCurrentProblem(allProblems[selectedIndex]);
        }
    };

    return (
        <Card className="h-full overflow-auto">
            <CardContent className="whitespace-normal overflow-auto max-h">
                <select onChange={handleProblemChange} className="w-full border rounded-md">
                    <option value="" disabled>Select a problem</option>
                    {allProblems.map((problem, index) => (
                        <option key={index} value={index}>
                            {problem.name}
                        </option>
                    ))}
                </select>

                <div className="prose max-w-none">
                    {currentProblem && <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentProblem.problem}</ReactMarkdown>}
                </div>
            </CardContent>
        </Card>
    );
}