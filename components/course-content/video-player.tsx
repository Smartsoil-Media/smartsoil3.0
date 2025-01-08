interface VideoPlayerProps {
    url: string
    duration?: number
}

export function VideoPlayer({ url, duration }: VideoPlayerProps) {
    return (
        <div className="aspect-video relative bg-black rounded-lg overflow-hidden">
            <video
                src={url}
                controls
                className="absolute inset-0 w-full h-full"
            />
            {duration && (
                <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm">
                    {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, '0')}
                </div>
            )}
        </div>
    )
} 