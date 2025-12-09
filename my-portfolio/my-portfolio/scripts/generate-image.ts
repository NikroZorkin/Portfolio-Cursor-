import Replicate from 'replicate'
import { writeFile, mkdir, readFile } from 'fs/promises'
import path from 'path'

// ===== НАСТРОЙКИ =====
const OUTPUT_DIR = 'C:\\Cursor Generate IMG'
// =====================

// Читаем токен из .env.local (не коммитится в git)
async function getApiToken(): Promise<string> {
  try {
    const envPath = path.join(__dirname, '..', '.env.local')
    const content = await readFile(envPath, 'utf-8')
    const match = content.match(/REPLICATE_API_TOKEN=(.+)/)
    if (match) return match[1].trim()
  } catch {}
  // Fallback на переменную окружения
  if (process.env.REPLICATE_API_TOKEN) return process.env.REPLICATE_API_TOKEN
  throw new Error('REPLICATE_API_TOKEN не найден. Добавь в .env.local')
}

let replicate: Replicate

async function generateImage(prompt: string, filename: string) {
  console.log(`\n🎨 Генерация: "${prompt}"`)
  console.log(`📁 Сохранение: ${OUTPUT_DIR}\\${filename}`)

  try {
    // Инициализируем Replicate с токеном
    const token = await getApiToken()
    replicate = new Replicate({ auth: token })

    // Создаём папку если нет
    await mkdir(OUTPUT_DIR, { recursive: true })

    const output = await replicate.run('black-forest-labs/flux-1.1-pro', {
      input: {
        prompt,
        aspect_ratio: '16:9',
        output_format: 'webp',
        output_quality: 90,
        safety_tolerance: 2,
        prompt_upsampling: true,
      },
    })

    const imageUrl = output as string
    console.log(`🔗 URL: ${imageUrl}`)

    // Скачиваем и сохраняем
    const response = await fetch(imageUrl)
    const buffer = Buffer.from(await response.arrayBuffer())

    const outputPath = path.join(OUTPUT_DIR, filename)
    await writeFile(outputPath, buffer)

    console.log(`\n✅ ГОТОВО: ${outputPath}`)
    return outputPath
  } catch (error) {
    console.error('\n❌ Ошибка:', error)
    throw error
  }
}

// CLI: npx tsx scripts/generate-image.ts "prompt" "filename.webp"
const args = process.argv.slice(2)
const prompt = args[0]
const filename = args[1] || `generated-${Date.now()}.webp`

if (!prompt) {
  console.log(`
Использование: npx tsx scripts/generate-image.ts "промпт" "файл.webp"

Примеры:
  npx tsx scripts/generate-image.ts "anime girl gothic style" "anime.webp"
  npx tsx scripts/generate-image.ts "minimalist dark background" "bg.webp"

Изображения сохраняются в: ${OUTPUT_DIR}
`)
  process.exit(1)
}

generateImage(prompt, filename)
