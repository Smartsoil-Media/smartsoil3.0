import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Home, BookOpen, Sprout, Settings, LogOut, MessageSquare, Film } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useAuth } from '@/contexts/auth-context'

interface SidebarProps {
  className?: string
  activePage: string
  setActivePage: (page: string) => void
}

export function DashboardSidebar({ className, activePage, setActivePage }: SidebarProps) {
  const router = useRouter()
  const { logout } = useAuth()

  const handleNavigation = (page: string) => {
    setActivePage(page)
    switch (page) {
      case 'home':
        router.push('/dashboard')
        break
      case 'courses':
        router.push('/dashboard/mycourses')
        break
      case 'feed':
        router.push('/dashboard/farmfeed')
        break
      case 'community':
        router.push('/dashboard/community')
        break
    }
  }

  return (
    <Sidebar className={`bg-background border-r border-border ${className}`}>
      <SidebarHeader>
        <Link href="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">Smartsoil</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => handleNavigation('home')}
              className={`text-foreground hover:bg-secondary hover:text-secondary-foreground ${activePage === 'home' ? 'bg-secondary text-secondary-foreground' : ''
                }`}
            >
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => handleNavigation('courses')}
              className={`text-foreground hover:bg-secondary hover:text-secondary-foreground ${activePage === 'courses' ? 'bg-secondary text-secondary-foreground' : ''
                }`}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              <span>My Courses</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="#" className="w-full">
              <SidebarMenuButton
                onClick={() => handleNavigation('resources')}
                className={`text-foreground hover:bg-secondary hover:text-secondary-foreground ${activePage === 'resources' ? 'bg-secondary text-secondary-foreground' : ''
                  }`}
              >
                <Sprout className="mr-2 h-4 w-4" />
                <span>Resources</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => handleNavigation('feed')}
              className={`text-foreground hover:bg-secondary hover:text-secondary-foreground ${activePage === 'feed' ? 'bg-secondary text-secondary-foreground' : ''
                }`}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Farm Feed</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="#" className="w-full">
              <SidebarMenuButton
                onClick={() => handleNavigation('media')}
                className={`text-foreground hover:bg-secondary hover:text-secondary-foreground ${activePage === 'media' ? 'bg-secondary text-secondary-foreground' : ''
                  }`}
              >
                <Film className="mr-2 h-4 w-4" />
                <span>Media</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

