import { Header } from '@/components/header'
import { HeroSection } from '@/components/sections/hero'
import { WorkSection } from '@/components/sections/work'
import { AboutSection } from '@/components/sections/about'
import { SkillsSection } from '@/components/sections/skills'
import { ContactSection } from '@/components/sections/contact'
import { PageFade } from '@/components/animations/page-fade'

export default function Home() {
  return (
    <PageFade>
      <Header />
      <main className="relative">
        <HeroSection />
        <WorkSection />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </PageFade>
  )
}
