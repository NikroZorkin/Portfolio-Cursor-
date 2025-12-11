import Image from 'next/image'
import { BentoCard } from '@/components/bento-card'
import { StaggerList } from '@/components/animations/stagger-list'
import { SectionReveal } from '@/components/animations/section-reveal'

// Placeholder project data - will be replaced with Contentlayer in CL epic
const projects = [
  {
    id: '1',
    title: 'Redesign + SEO for the Website',
    description: 'A website for selecting a stylist and updating a wardrobe. My tasks included optimizing SEO for the website, as well as a complete redesign and updating with a focus on minimalism and maximum simplicity for the client.',
    cover: '/project-styleleap.jpg',
    tags: ['Figma', 'Adobe Photoshop'],
    featured: true,
    link: 'https://www.upwork.com/freelancers/~01648f1c04b49f406f?p=1963226663592017920',
  },
  {
    id: '2',
    title: 'MVP app (Discord-like utility for gamers)',
    description: 'The screen is where squads vote on what game to play. A modern, minimal style with subtle gamer energy. Deliverable: 1 polished mobile screen (Figma).',
    cover: '/iPhone 15 Pro.jpg',
    tags: ['Figma'],
    featured: false,
    link: 'https://www.upwork.com/freelancers/~01648f1c04b49f406f?p=1963172177032921088',
  },
  {
    id: '3',
    title: 'Furniture Website design',
    description: 'Task: Strict, laconic, minimalistic. Come up with a logo. Decide on typography yourself. Design preferences: More subtle shapes, fewer details, emphasis on images and product descriptions. Main pages - 5 (Home, product issue page, product page, cart, payment page). Additional pages - 4 (page of liked products, search results page, privacy policy, payment and delivery). Also responsive website design for tablet and mobile.',
    cover: '/chrome_WwoeNinjeQ.jpg',
    tags: ['Prototype', 'Figma', 'Adobe Photoshop', 'Responsive Design', 'UX & UI', 'UI/UX Prototyping', 'Web Design'],
    featured: false,
    link: 'https://www.upwork.com/freelancers/~01648f1c04b49f406f?p=1738985797658210304',
    imagePosition: 'center 70%',
  },
  {
    id: '4',
    title: 'Vintage cycle shop',
    description: 'Vintage Cycle Shop – Website Redesign & SEO Optimization. The client requested a full homepage redesign in vintage style, optimized for SEO and focused on increasing user trust and conversions. I delivered a complete website revamp — modernizing the layout while preserving the brand\'s aesthetic. The homepage was restructured with clear hierarchy, optimized metadata, and reinsurance elements. The result is a visually consistent, SEO-friendly, and conversion-focused site.',
    cover: '/Vintage cycle shop.jpg',
    tags: ['UI/UX Prototyping', 'Figma'],
    featured: false,
    link: null,
  },
]

export function WorkSection() {
  return (
    <SectionReveal>
      <section id="work" className="min-h-screen px-4 pt-20 pb-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-fg md:text-5xl">
              Selected Work
            </h2>
            <p className="mt-4 text-lg text-muted-fg">
              A collection of projects showcasing design and problem-solving
            </p>
          </div>

          {/* Bento Grid for Projects with Stagger Animation (C4) */}
          <StaggerList className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project) => {
              const cardContent = (
                <div className="flex h-full w-full flex-col">
                  {/* Project Cover */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                    {project.cover.includes('placeholder') ? (
                      /* Placeholder Pattern */
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="h-16 w-16 text-muted-fg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    ) : (
                      <Image
                        src={project.cover}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        style={{ objectPosition: project.imagePosition || 'center' }}
                      />
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="flex flex-1 flex-col justify-center p-6">
                    <h3 className="text-lg font-semibold text-card-fg">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-fg line-clamp-2">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-muted px-2 py-1 text-xs text-muted-fg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )

              return (
                <BentoCard
                  key={project.id}
                  interactive
                  noPadding
                  className="group cursor-pointer overflow-hidden h-full"
                >
                  {project.link ? (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full w-full"
                    >
                      {cardContent}
                    </a>
                  ) : (
                    cardContent
                  )}
                </BentoCard>
              )
            })}
          </StaggerList>
        </div>
      </section>
    </SectionReveal>
  )
}

