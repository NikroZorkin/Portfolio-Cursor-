# /gen — Генерация изображений

## Использование
```
/gen {описание картинки}
```

## Что делать при вызове

**СРАЗУ** запустить команду в **ФОНОВОМ РЕЖИМЕ** (is_background: true):

```powershell
cd my-portfolio\my-portfolio; npm run gen-image "{prompt на английском}" "{filename}.webp"
```

## Параметры
- **prompt**: Перевести описание пользователя на английский, добавить детали для качества
- **filename**: Сгенерировать имя файла из описания (латиница, kebab-case)

## Пример

Пользователь: `/gen аниме девушка в готическом стиле`

Выполнить:
```powershell
cd my-portfolio\my-portfolio; npm run gen-image "anime girl in gothic style, dark aesthetic, elegant, detailed illustration" "anime-gothic.webp"
```

## Важно
- Генерация занимает **30-60 секунд** — запускать ТОЛЬКО в background
- Картинки сохраняются в: `C:\Cursor Generate IMG`
- После запуска проверить результат в `terminals/*.txt`
- API ключ уже зашит в скрипте — ничего дополнительно не нужно

