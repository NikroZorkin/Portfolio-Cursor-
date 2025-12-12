// Discord webhook for contact form notifications

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1448703028063506613/XbKeTepXg8YX0jcyrp6m1DKvS2O-TnUdTXPcH60-OjfgAICbAYzknERrqNf3gH_NqD8Y'

interface ContactMessage {
  name: string
  email: string
  message: string
}

export async function sendDiscordNotification(data: ContactMessage): Promise<boolean> {
  const timestamp = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Kiev',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const embed = {
    title: '📩 Новое сообщение с портфолио!',
    color: 0x5865F2, // Discord blurple
    fields: [
      {
        name: '👤 Имя',
        value: data.name,
        inline: true,
      },
      {
        name: '📧 Email',
        value: data.email,
        inline: true,
      },
      {
        name: '💬 Сообщение',
        value: data.message.length > 1000 
          ? data.message.substring(0, 1000) + '...' 
          : data.message,
        inline: false,
      },
    ],
    footer: {
      text: `🕐 ${timestamp}`,
    },
    timestamp: new Date().toISOString(),
  }

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    })

    if (!response.ok) {
      console.error('[Discord] Webhook failed:', response.status, await response.text())
      return false
    }

    console.log('[Discord] Message sent successfully')
    return true
  } catch (error) {
    console.error('[Discord] Error sending webhook:', error)
    return false
  }
}

