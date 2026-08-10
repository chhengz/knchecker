import { operators } from '../data/operators'

export function normalizePhoneNumber(input: string): string {
  if (!input) return ''
  const digits = input.replace(/\D/g, '')

  if (digits.startsWith('855')) {
    return '0' + digits.slice(3)
  }

  return digits
}

export function detectOperator(input: string) {
  const number = normalizePhoneNumber(input)
  if (!number) return null

  return (
    operators.find((op) =>
      op.prefixes.some((prefix) => number.startsWith(prefix))
    ) ?? null
  )
}

export function isCambodianPhoneNumber(input: string): boolean {
  const number = normalizePhoneNumber(input)
  if (!number) return false

  // Full local numbers: 0 + 8 or 9 digits (e.g. 010123456 or 0761234567)
  if (/^0\d{7,8}$/.test(number)) return true

  // Accept a 3-digit prefix (e.g. '099' or '012') as valid when it matches a known operator
  if (/^0\d{2}$/.test(number)) {
    return operators.some((op) => op.prefixes.includes(number.slice(0, 3)))
  }

  return false
}

export function formatLocal(normalized: string): string {
  if (!normalized) return ''
  // chunk into 3-digit groups for a simple, readable format
  const groups: string[] = []
  for (let i = 0; i < normalized.length; i += 3) {
    groups.push(normalized.slice(i, i + 3))
  }
  return groups.join(' ')
}

export function formatInternational(normalized: string): string {
  if (!normalized) return ''
  if (normalized.startsWith('0')) {
    const without0 = normalized.slice(1)
    // add +855 and simple grouping
    return '+855 ' + without0.replace(/(\d{2})(?=\d)/g, '$1 ').trim()
  }
  return '+' + normalized
}
