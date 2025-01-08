import React from 'react'
import ReactMarkdown from 'react-markdown'
import { LessonContentBlock } from '@/types/course-content'
import { QuizRenderer } from './quiz-renderer'
import { AssignmentRenderer } from './assignment-renderer'
import { VideoPlayer } from './video-player'

interface ContentRendererProps {
    block: LessonContentBlock
}

export function ContentRenderer({ block }: ContentRendererProps) {
    if (block.type === 'video') {
        return (
            <div className="aspect-video mb-6">
                <iframe
                    src={block.metadata?.videoUrl}
                    className="w-full h-full"
                    allowFullScreen
                />
            </div>
        )
    }

    if (block.format === 'markdown') {
        return <div dangerouslySetInnerHTML={{ __html: block.content }} />
    }

    return <div>{block.content}</div>
} 