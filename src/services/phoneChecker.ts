import { operators } from '../data/operators'

/**
 * Convert a Cambodian phone number into local format.
 *
 * Examples:
 *
 * 010123456       -> 010123456
 * 010 123 456     -> 010123456
 * +85510123456    -> 010123456
 * 85510123456     -> 010123456
 */
export function normalizePhoneNumber(input: string): string {
  if (!input) return ''

  const digits = input.replace(/\D/g, '')

  if (!digits) return ''

  // International Cambodia format
  // 85510123456 -> 010123456
  if (digits.startsWith('855')) {
    return `0${digits.slice(3)}`
  }

  return digits
}

/**
 * Find the operator associated with the phone prefix.
 *
 * Example:
 *
 * 010123456 -> Smart
 * 012123456 -> Cellcard
 * 097123456 -> Metfone
 */
export function detectOperator(input: string) {
  const number = normalizePhoneNumber(input)

  if (!number) {
    return null
  }

  return (
    operators.find((operator) =>
      operator.prefixes.some((prefix) =>
        number.startsWith(prefix),
      ),
    ) ?? null
  )
}

/**
 * Validate a Cambodian mobile phone number.
 *
 * Accepted:
 *
 * 010123456
 * 012123456
 * 0761234567
 *
 * Also accepts a known 3-digit prefix:
 *
 * 010
 * 012
 * 097
 */
export function isCambodianPhoneNumber(
  input: string,
): boolean {
  const number = normalizePhoneNumber(input)

  if (!number) {
    return false
  }

  // Full Cambodian mobile number
  //
  // 9 digits:
  // 010123456
  //
  // 10 digits:
  // 0761234567
  if (/^0\d{8,9}$/.test(number)) {
    return detectOperator(number) !== null
  }

  // Prefix only
  //
  // 010
  // 012
  // 097
  if (/^0\d{2}$/.test(number)) {
    return operators.some((operator) =>
      operator.prefixes.includes(number),
    )
  }

  return false
}

/**
 * Format a local Cambodian phone number.
 *
 * Examples:
 *
 * 010123456  -> 010 123 456
 * 0761234567 -> 076 123 456 7
 */
export function formatLocal(normalized: string): string {
  if (!normalized) {
    return ''
  }

  const number = normalizePhoneNumber(normalized)

  if (!number) {
    return ''
  }

  const groups: string[] = []

  for (let i = 0; i < number.length; i += 3) {
    groups.push(number.slice(i, i + 3))
  }

  return groups.join(' ')
}

/**
 * Format a Cambodian number internationally.
 *
 * Examples:
 *
 * 010123456  -> +855 10 123 456
 * 0761234567 -> +855 76 123 456 7
 */
export function formatInternational(
  normalized: string,
): string {
  if (!normalized) {
    return ''
  }

  const number = normalizePhoneNumber(normalized)

  if (!number) {
    return ''
  }

  if (!number.startsWith('0')) {
    return `+${number}`
  }

  const withoutZero = number.slice(1)

  if (!withoutZero) {
    return '+855'
  }

  const groups: string[] = []

  for (let i = 0; i < withoutZero.length; i += 3) {
    groups.push(withoutZero.slice(i, i + 3))
  }

  return `+855 ${groups.join(' ')}`
}