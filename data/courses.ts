import type { LessonContentBlock, ContentFormat } from '@/types/course-content'

export const coursesData = [
    {
        id: "course-1",
        title: "Pasture Cropping",
        description: "Learn innovative techniques to integrate crops into perennial pastures, enhancing soil health and productivity.",
        instructor: "Colin Seis",
        thumbnail: "/images/col-thumbnail.png",
        order: 1,
        modules: [
            {
                id: "module-1",
                title: "Introduction to Pasture Cropping",
                description: "Learn the fundamentals and benefits of pasture cropping",
                order: 1,
                lessons: [
                    {
                        id: "lesson-1",
                        title: "What is Pasture Cropping?",
                        description: "An overview of pasture cropping principles",
                        moduleId: "module-1",
                        courseId: "course-1",
                        order: 1,
                        content: [
                            {
                                type: "text" as const,
                                format: "markdown" as ContentFormat,
                                content: `# What is Pasture Cropping?

Pasture cropping is an innovative farming technique that allows annual crops to be grown into living perennial pastures. This technique was pioneered in Australia and has shown remarkable results in:

## Key Benefits
- Improved soil health and structure
- Increased biodiversity
- Year-round ground cover
- Enhanced water retention
- Reduced input costs
- Multiple income streams

## How It Works
Pasture cropping involves sowing annual crops directly into dormant perennial pastures. This approach:
1. Maintains living roots in the soil year-round
2. Reduces soil disturbance
3. Maximizes land use efficiency
4. Provides both grazing and cropping opportunities`
                            } satisfies LessonContentBlock
                        ],
                        resources: []
                    },
                    {
                        id: "lesson-2",
                        title: "Benefits of Pasture Cropping",
                        description: "Explore the economic and environmental benefits",
                        moduleId: "module-1",
                        courseId: "course-1",
                        order: 2,
                        content: [
                            {
                                type: "video" as const,
                                format: "html" as ContentFormat,
                                content: '<div class="video-wrapper">Benefits Overview</div>',
                                metadata: {
                                    videoUrl: "https://example.com/benefits.mp4",
                                    duration: 480
                                }
                            }
                        ],
                        resources: []
                    }
                ]
            },
            {
                id: "module-2",
                title: "Implementation Techniques",
                description: "Step-by-step guide to implementing pasture cropping",
                order: 2,
                lessons: [
                    {
                        id: "lesson-3",
                        title: "Site Selection",
                        description: "How to choose the right location for pasture cropping",
                        moduleId: "module-2",
                        courseId: "course-1",
                        order: 1,
                        content: [
                            {
                                type: "video" as const,
                                format: "html" as ContentFormat,
                                content: '<div class="video-wrapper">Site Selection Guide</div>',
                                metadata: {
                                    videoUrl: "https://example.com/site-selection.mp4",
                                    duration: 720
                                }
                            }
                        ],
                        resources: []
                    },
                    {
                        id: "lesson-4",
                        title: "Soil Preparation",
                        description: "Preparing your soil for success",
                        moduleId: "module-2",
                        courseId: "course-1",
                        order: 2,
                        content: [
                            {
                                type: "text" as const,
                                format: "markdown" as ContentFormat,
                                content: `# Soil Preparation\n\nProper soil preparation is crucial...`
                            }
                        ],
                        resources: []
                    }
                ]
            }
        ],
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01")
    },
    {
        id: "course-2",
        title: "Strategic Grazing Management",
        description: "Master grazing management and pasture ecology to improve land productivity and animal health through strategic practices.",
        instructor: "Dr. Judi Earl",
        thumbnail: "/images/grazing-management.jpg",
        order: 2,
        modules: [
            {
                id: "module-1",
                title: "Fundamentals of Grazing Management",
                description: "Understanding the principles of strategic grazing",
                order: 1,
                lessons: [
                    {
                        id: "lesson-1",
                        title: "Introduction to Strategic Grazing",
                        description: "Learn the core principles of strategic grazing management",
                        moduleId: "module-1",
                        courseId: "course-2",
                        order: 1,
                        content: [
                            {
                                type: "text",
                                format: "markdown" as ContentFormat,
                                content: `# Strategic Grazing Management

Strategic grazing is a systematic approach to managing the relationship between livestock and pasture. This course will teach you:

## Key Components
- Pasture recovery periods
- Stock density management
- Seasonal planning
- Monitoring and assessment

## Benefits
- Improved pasture productivity
- Better animal performance
- Enhanced soil health
- Increased biodiversity
- Drought resilience`
                            } satisfies LessonContentBlock
                        ],
                        resources: []
                    }
                ]
            }
        ],
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01")
    },
    {
        id: "course-3",
        title: "Advanced Cover Cropping",
        description: "Learn innovative approaches to integrating cover crops and revolutionize your soil management practices.",
        instructor: "Kevin Elmy",
        thumbnail: "/images/cover-cropping.jpg",
        order: 3,
        modules: [
            {
                id: "module-1",
                title: "Cover Crop Fundamentals",
                description: "Master the basics of cover cropping",
                order: 1,
                lessons: [
                    {
                        id: "lesson-1",
                        title: "Why Use Cover Crops?",
                        description: "Understand the benefits and principles of cover cropping",
                        moduleId: "module-1",
                        courseId: "course-3",
                        order: 1,
                        content: [
                            {
                                type: "text",
                                format: "markdown" as ContentFormat,
                                content: `# Introduction to Cover Crops

Cover crops are a powerful tool for soil health management. This course covers:

## Benefits
- Soil structure improvement
- Nutrient cycling
- Weed suppression
- Erosion control
- Water management

## Implementation
- Species selection
- Timing considerations
- Integration with cash crops
- Management techniques`
                            } satisfies LessonContentBlock
                        ],
                        resources: []
                    }
                ]
            }
        ],
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01")
    }
] 