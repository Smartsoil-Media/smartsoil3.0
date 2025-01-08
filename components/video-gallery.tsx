import { Play } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Introduction to Regenerative Farming',
    description: 'Learn the basics of regenerative agriculture and its impact on soil health.',
    thumbnail: '/placeholder.svg',
    duration: '15:30'
  },
  {
    id: '2',
    title: 'Cover Cropping Techniques',
    description: 'Discover various cover cropping methods to improve soil structure.',
    thumbnail: '/placeholder.svg',
    duration: '22:45'
  },
  {
    id: '3',
    title: 'Rotational Grazing Systems',
    description: 'Explore the benefits of rotational grazing for pasture management.',
    thumbnail: '/placeholder.svg',
    duration: '18:20'
  },
  {
    id: '4',
    title: 'Soil Microbiome and Plant Health',
    description: 'Understand the crucial role of soil microorganisms in plant nutrition.',
    thumbnail: '/placeholder.svg',
    duration: '25:15'
  },
  {
    id: '5',
    title: 'Water Management in Regenerative Farming',
    description: 'Learn effective water conservation techniques for sustainable agriculture.',
    thumbnail: '/placeholder.svg',
    duration: '20:10'
  },
  {
    id: '6',
    title: 'Integrating Livestock in Crop Systems',
    description: 'Discover how to successfully combine livestock and crop production.',
    thumbnail: '/placeholder.svg',
    duration: '28:05'
  }
]

export function VideoGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <Card key={video.id} className="overflow-hidden">
          <CardContent className="p-0 relative">
            <Image
              src={video.thumbnail}
              alt={video.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <Button variant="secondary" size="icon" className="rounded-full">
                <Play className="h-6 w-6" />
              </Button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
              <span className="text-xs text-muted-foreground">{video.duration}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

