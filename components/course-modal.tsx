import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CourseModalProps {
  isOpen: boolean
  onClose: () => void
  course: {
    title: string
    instructor: string
    description: string
    syllabus: string[]
    length: string
  }
}

export function CourseModal({ isOpen, onClose, course }: CourseModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-foreground">{course.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">Instructor: {course.instructor}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-4 h-[300px] pr-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground">Course Overview</h4>
              <p className="text-sm text-muted-foreground">{course.description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Syllabus</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                {course.syllabus.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Length to Complete</h4>
              <p className="text-sm text-muted-foreground">{course.length}</p>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={onClose} className="bg-primary text-primary-foreground hover:bg-primary/90">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

