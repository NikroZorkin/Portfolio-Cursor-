'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { FileDown, Loader2, Sun, Moon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

type ThemeOption = 'light' | 'dark'

const STORAGE_KEY = 'pdf-export-theme'

// Theme colors
const themeStyles = {
  light: {
    bg: '#ffffff',
    text: '#1a1a1a',
    textMuted: '#666666',
    border: '#e5e5e5',
    accent: '#3b82f6',
    card: '#f5f5f5',
  },
  dark: {
    bg: '#141414',
    text: '#fafafa',
    textMuted: '#a1a1a1',
    border: '#333333',
    accent: '#60a5fa',
    card: '#1f1f1f',
  },
}

// Dynamic content extraction from DOM
interface ExtractedData {
  name: string
  title: string
  bio: string
  experience: Array<{ title: string; company: string; period: string; description: string }>
  skills: string[]
  contact: { email: string; github: string }
}

function extractDataFromDOM(): ExtractedData {
  const data: ExtractedData = {
    name: '',
    title: 'UX/UI Designer',
    bio: '',
    experience: [],
    skills: [],
    contact: { email: '', github: '' },
  }

  // Extract name from hero section
  const heroH1 = document.querySelector('#hero h1')
  if (heroH1) {
    data.name = heroH1.textContent?.replace(/\s+/g, ' ').trim() || 'Danylo Zorkin'
  }

  // Extract bio from hero
  const heroBio = document.querySelector('#hero p.text-muted-fg, #hero [class*="text-muted"]')
  if (heroBio) {
    data.bio = heroBio.textContent?.trim() || ''
  }

  // Extract experience from hero (experience card)
  const experienceItems = document.querySelectorAll('#hero [class*="border-b"]')
  experienceItems.forEach((item) => {
    const title = item.querySelector('h3')?.textContent?.trim() || ''
    const company = item.querySelector('p.italic, [class*="italic"]')?.textContent?.trim() || ''
    const period = item.querySelector('p.text-xs, [class*="text-xs"]')?.textContent?.trim() || ''
    const description = item.querySelector('p.mt-3, p:last-child')?.textContent?.trim() || ''
    
    if (title) {
      data.experience.push({ title, company, period, description })
    }
  })

  // Extract skills from skills section
  const skillCards = document.querySelectorAll('#skills [class*="rounded-xl"]')
  skillCards.forEach((card) => {
    const skillTitle = card.querySelector('h3')?.textContent?.trim()
    if (skillTitle) data.skills.push(skillTitle)
  })

  // Fallback skills if not found
  if (data.skills.length === 0) {
    data.skills = ['Core Design', 'UX', 'UI & Visual', 'Tools', 'AI & Automation', 'Design & Code']
  }

  // Extract contact info
  const emailLink = document.querySelector('a[href^="mailto:"]')
  if (emailLink) {
    data.contact.email = emailLink.getAttribute('href')?.replace('mailto:', '').split('?')[0] || ''
  }

  const githubLink = document.querySelector('a[href*="github.com"]')
  if (githubLink) {
    const href = githubLink.getAttribute('href') || ''
    const match = href.match(/github\.com\/([^\/\?]+)/)
    if (match) data.contact.github = `github.com/${match[1]}`
  }

  // Fallbacks
  if (!data.name) data.name = 'Danylo Zorkin'
  if (!data.bio) data.bio = "UX/UI designer focused on AI-driven products and clean, code-friendly interfaces."
  if (!data.contact.email) data.contact.email = 'danilzorkin1402@gmail.com'
  if (!data.contact.github) data.contact.github = 'github.com/NikroZorkin'

  return data
}

export function PdfExport() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<ThemeOption>('dark')
  const [isGenerating, setIsGenerating] = useState(false)
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null)
  const pdfRef = useRef<HTMLDivElement>(null)

  // Load theme preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeOption | null
    if (saved) setTheme(saved)
  }, [])

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  // Extract data when modal opens
  const refreshData = useCallback(() => {
    const data = extractDataFromDOM()
    setExtractedData(data)
  }, [])

  useEffect(() => {
    if (open) {
      // Small delay to ensure DOM is ready
      setTimeout(refreshData, 100)
    }
  }, [open, refreshData])

  const generatePdf = async () => {
    if (!pdfRef.current || !extractedData) return

    setIsGenerating(true)

    try {
      const html2pdf = (await import('html2pdf.js')).default

      const element = pdfRef.current
      const isDark = theme === 'dark'

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${extractedData.name.replace(/\s+/g, '_')}_Portfolio_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: isDark ? '#141414' : '#ffffff',
          logging: false,
          // Ignore CSS color parsing errors (oklch/lab not supported)
          ignoreElements: (el: Element) => el.classList?.contains('pdf-ignore'),
          onclone: (clonedDoc: Document) => {
            // Force standard colors on cloned document
            const style = clonedDoc.createElement('style')
            style.textContent = `
              * {
                color: inherit !important;
                background-color: inherit !important;
                border-color: ${isDark ? '#333333' : '#e5e5e5'} !important;
              }
            `
            clonedDoc.head.appendChild(style)
          },
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: 'avoid-all' },
      }

      await html2pdf().set(opt).from(element).save()
    } catch (error) {
      console.error('PDF generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const colors = themeStyles[theme]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full gap-2 border-border hover:bg-white/5"
        >
          <FileDown className="h-4 w-4" />
          Download Portfolio PDF
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-[98vw] max-w-[1400px] h-[96vh] max-h-[96vh] overflow-hidden sm:max-w-none p-0 dialog-fade-zoom"
      >
        <div className="flex flex-col h-full gap-4 p-4 md:p-6">
          <DialogHeader className="px-0 pt-0">
            <DialogTitle>Export Portfolio to PDF</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Theme Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Theme</Label>
              <RadioGroup
                value={theme}
                onValueChange={(v) => setTheme(v as ThemeOption)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="cursor-pointer flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    Light
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="cursor-pointer flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    Dark
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* PDF Preview */}
            {extractedData && (
              <div 
                className="rounded-lg border border-border overflow-hidden"
                style={{ maxHeight: '80vh', overflowY: 'auto' }}
              >
                {/* Isolated container - no CSS variables inheritance */}
                <div
                  ref={pdfRef}
                  className="pdf-content"
                  style={{
                    // Force ALL colors to be hex - html2canvas doesn't support oklch/lab
                    all: 'initial',
                    display: 'block',
                    backgroundColor: colors.bg,
                    color: colors.text,
                    padding: '40px',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    width: '100%',
                    maxWidth: '1100px',
                    boxSizing: 'border-box',
                    margin: '0 auto',
                  }}
                >
                  {/* Header */}
                  <div style={{ marginBottom: '28px', borderBottom: `1px solid ${colors.border}`, paddingBottom: '20px' }}>
                    <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '6px', color: colors.text }}>
                      {extractedData.name}
                    </h1>
                    <p style={{ fontSize: '20px', color: colors.accent, marginBottom: '14px' }}>
                      {extractedData.title}
                    </p>
                    <p style={{ color: colors.textMuted, fontSize: '14px' }}>
                      {extractedData.bio}
                    </p>
                  </div>

                  {/* Experience */}
                  {extractedData.experience.length > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '14px', color: colors.text, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Experience
                      </h2>
                      {extractedData.experience.map((exp, i) => (
                        <div key={i} style={{ marginBottom: '14px', paddingLeft: '14px', borderLeft: `2px solid ${colors.accent}` }}>
                          <div style={{ fontWeight: '600', color: colors.text, fontSize: '14px' }}>{exp.title}</div>
                          <div style={{ fontSize: '13px', color: colors.textMuted }}>{exp.company} • {exp.period}</div>
                          <div style={{ fontSize: '13px', color: colors.textMuted, marginTop: '4px' }}>{exp.description}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Skills */}
                  {extractedData.skills.length > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '14px', color: colors.text, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Skills
                      </h2>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {extractedData.skills.map((skill, i) => (
                          <span 
                            key={i}
                            style={{ 
                              fontSize: '12px', 
                              padding: '6px 14px', 
                              backgroundColor: colors.card,
                              border: `1px solid ${colors.border}`,
                              borderRadius: '16px',
                              color: colors.text,
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact */}
                  <div style={{ 
                    marginTop: '24px', 
                    paddingTop: '20px', 
                    borderTop: `1px solid ${colors.border}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <div>
                      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: colors.text, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Contact
                      </h2>
                      <div style={{ fontSize: '14px', color: colors.textMuted, marginBottom: '4px' }}>
                        📧 {extractedData.contact.email}
                      </div>
                      <div style={{ fontSize: '14px', color: colors.textMuted }}>
                        💻 {extractedData.contact.github}
                      </div>
                    </div>
                    <div style={{ fontSize: '11px', color: colors.textMuted, textAlign: 'right' }}>
                      Generated: {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

          {!extractedData && (
            <div className="text-center py-8 text-muted-fg">
              Loading content...
            </div>
          )}

          {/* Download Button */}
          <Button
            onClick={generatePdf}
            disabled={isGenerating || !extractedData}
            className="w-full bg-primary text-primary-fg hover:bg-primary/90"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <FileDown className="mr-2 h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
