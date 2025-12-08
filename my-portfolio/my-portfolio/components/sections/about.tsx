import Image from 'next/image'
import { BentoCard } from '@/components/bento-card'
import {
  SwatchIcon,
  LightBulbIcon,
  DevicePhoneMobileIcon,
  HandRaisedIcon,
  SparklesIcon,
  UserGroupIcon,
  BeakerIcon,
  MapIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'

export function AboutSection() {
  return (
    <section id="about" className="min-h-[60vh] px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-fg md:text-5xl">About</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {/* Bio */}
          <BentoCard size="md" className="md:col-span-2">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-card-fg">
              Hi, I'm Danylo Zorkin <HandRaisedIcon className="h-6 w-6 text-primary" />
            </h3>
            <p className="mt-4 text-muted-fg">
              I'm a UX/UI designer focused on AI-driven products and clean, code-friendly interfaces. I'm comfortable moving between Figma, design systems, and front-end logic, creating experiences that look great and work well.
            </p>
            <p className="mt-4 text-muted-fg">
              I'm really curious about how AI can speed up research, brainstorming, and creative exploration — from quick UX ideas to polished UI designs. I enjoy working where design meets engineering, speaking both "designer" and "developer" to make teamwork easier and smarter.
            </p>
            <p className="mt-4 text-muted-fg">
              When I'm not designing, you'll usually find me testing new AI tools, improving my design process, learning more about coding, or diving into product and tech trends to stay ahead of the curve.
            </p>
          </BentoCard>

          {/* Photo */}
          <BentoCard
            size="sm"
            noPadding
            className="relative overflow-hidden h-full min-h-[280px]"
          >
            <div className="relative h-full w-full">
              <Image
                src="/IMG000 (2).jpg"
                alt="About me"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                style={{ 
                  objectPosition: 'center 70%',
                  transform: 'scale(1.2) translateX(-8%)'
                }}
              />
            </div>
          </BentoCard>

          {/* Interests */}
          <BentoCard size="sm">
            <h3 className="text-base font-semibold text-card-fg">Interests</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-fg">
              <li className="flex items-center gap-2">
                <SparklesIcon className="h-4 w-4 text-primary" />
                AI-assisted design workflows
              </li>
              <li className="flex items-center gap-2">
                <SwatchIcon className="h-4 w-4 text-primary" />
                UX/UI for digital products
              </li>
              <li className="flex items-center gap-2">
                <LightBulbIcon className="h-4 w-4 text-primary" />
                Exploring new AI & design tools
              </li>
            </ul>
          </BentoCard>

          <BentoCard size="sm">
            <h3 className="text-base font-semibold text-card-fg">Values</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-fg">
              <li className="flex items-center gap-2">
                <HandRaisedIcon className="h-4 w-4 text-primary" />
                Accessibility
              </li>
              <li className="flex items-center gap-2">
                <SparklesIcon className="h-4 w-4 text-primary" />
                Sustainability
              </li>
              <li className="flex items-center gap-2">
                <UserGroupIcon className="h-4 w-4 text-primary" />
                Collaboration
              </li>
            </ul>
          </BentoCard>

          <BentoCard size="sm">
            <h3 className="text-base font-semibold text-card-fg">Hobbies</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-fg">
              <li className="flex items-center gap-2">
                <BeakerIcon className="h-4 w-4 text-primary" />
                Coffee Tasting
              </li>
              <li className="flex items-center gap-2">
                <MapIcon className="h-4 w-4 text-primary" />
                Hiking
              </li>
              <li className="flex items-center gap-2">
                <BookOpenIcon className="h-4 w-4 text-primary" />
                Reading
              </li>
            </ul>
          </BentoCard>
        </div>
      </div>
    </section>
  )
}

