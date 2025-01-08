import { useState } from 'react'
import { Button } from "@/components/ui/button"

interface Question {
    id: string
    question: string
    options: string[]
    correctAnswer: string
    explanation?: string
}

interface QuizRendererProps {
    questions: Question[]
}

export function QuizRenderer({ questions }: QuizRendererProps) {
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [showResults, setShowResults] = useState(false)

    const handleSubmit = () => {
        setShowResults(true)
    }

    return (
        <div className="space-y-8">
            {questions.map((q) => (
                <div key={q.id} className="space-y-4">
                    <h3 className="font-medium">{q.question}</h3>
                    <div className="space-y-2">
                        {q.options.map((option, index) => (
                            <label
                                key={index}
                                className={`
                                    flex items-center gap-2 p-3 rounded-lg border cursor-pointer
                                    ${answers[q.id] === option ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'}
                                `}
                            >
                                <input
                                    type="radio"
                                    name={q.id}
                                    value={option}
                                    checked={answers[q.id] === option}
                                    onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                                    className="accent-accent"
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                    {showResults && (
                        <div className={`p-4 rounded-lg ${answers[q.id] === q.correctAnswer
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-red-500/10 text-red-500'
                            }`}>
                            <p className="font-medium">
                                {answers[q.id] === q.correctAnswer ? "Correct!" : "Incorrect"}
                            </p>
                            {q.explanation && (
                                <p className="text-sm mt-2 text-foreground">{q.explanation}</p>
                            )}
                        </div>
                    )}
                </div>
            ))}
            {!showResults && (
                <Button
                    onClick={handleSubmit}
                    className="w-full bg-accent hover:bg-accent/90"
                >
                    Submit Answers
                </Button>
            )}
        </div>
    )
} 