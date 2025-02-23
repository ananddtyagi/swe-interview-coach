'use client';
import { useProblem } from "@/contexts/ProblemContext";

export const ProblemSelector = () => {
    const { currentProblem, setCurrentProblem, allProblems } = useProblem();

    const handleProblemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = event.target.selectedIndex - 1; // Adjust for the disabled option
        if (selectedIndex >= 0) {
            setCurrentProblem(allProblems[selectedIndex]);
        }
    };

    return (
        <div>
            <select onChange={handleProblemChange}>
                <option value="" disabled>Select a problem</option>
                {allProblems.map((problem, index) => (
                    <option key={index} value={index}>
                        {problem.name}
                    </option>
                ))}
            </select>

            {currentProblem && <p>{currentProblem.problem}</p>}
        </div>
    );
}