"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sprout, Leaf, BookOpen } from 'lucide-react'

export default function FarmFeedPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Farm Activity Feed</h1>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Sprout className="mr-2 h-4 w-4 text-green-500" />
                                <span className="text-sm">New cover crop planted in Field 3</span>
                            </div>
                            <div className="flex items-center">
                                <Leaf className="mr-2 h-4 w-4 text-green-500" />
                                <span className="text-sm">Soil test results updated for Field 1</span>
                            </div>
                            <div className="flex items-center">
                                <BookOpen className="mr-2 h-4 w-4 text-green-500" />
                                <span className="text-sm">Completed lesson on soil biology</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Community Updates</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* We can add community comments and updates here */}
                            <div className="flex items-center">
                                <span className="text-sm">John Smith shared soil test results</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sm">Maria Garcia posted about crop rotation</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 