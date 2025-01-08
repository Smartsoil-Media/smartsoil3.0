interface AssignmentRendererProps {
    content: string
    dueDate?: string
}

export function AssignmentRenderer({ content, dueDate }: AssignmentRendererProps) {
    return (
        <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-xl font-semibold mb-4">Assignment</h3>
            <div className="prose dark:prose-invert max-w-none mb-4">
                {content}
            </div>
            {dueDate && (
                <p className="text-sm text-muted-foreground">
                    Due by: {new Date(dueDate).toLocaleDateString()}
                </p>
            )}
        </div>
    )
} 