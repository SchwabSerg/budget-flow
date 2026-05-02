/**
 * Money formatting utilities.
 *
 * All amounts in BudgetFlow are stored as integer minor units (kopecks) in
 * `amount_cents` on the API. The frontend never holds floats for money —
 * arithmetic happens in cents and formatting happens at the display boundary.
 *
 * Default locale: uk-UA (Ukrainian conventions: space thousands, comma decimal,
 * symbol after with non-breaking space).
 *
 * Companion documentation: docs/design/system.md → "Money Formatting"
 */

export type CurrencyCode = 'UAH' | 'USD' | 'EUR' | 'GBP'

export interface FormatMoneyOptions {
  /** ISO 4217 currency code. Defaults to UAH. */
  currency?: CurrencyCode
  /**
   * Sign behavior:
   *  - 'auto' (default): minus on negatives, no sign on positives.
   *  - 'always': forces a sign on non-zero values (used for deltas).
   *  - 'never': drops the sign entirely (used in contexts where sign is implicit).
   */
  sign?: 'auto' | 'always' | 'never'
  /**
   * Compact mode rounds to whole units and omits decimals.
   * Used for tight UI spaces like quick-stat cards.
   */
  compact?: boolean
  /** BCP 47 locale tag. Defaults to uk-UA. */
  locale?: string
}

const DEFAULT_LOCALE = 'uk-UA'
const DEFAULT_CURRENCY: CurrencyCode = 'UAH'

/**
 * Format an amount in minor units to a localized currency string.
 *
 * @param amountCents - Integer minor units (kopecks for UAH, cents for USD/EUR/GBP).
 * @param options - Formatting options. See {@link FormatMoneyOptions}.
 * @returns Localized formatted string, e.g. "1 247,50 ₴".
 *
 * @example
 *   formatMoney(124750)                     // "1 247,50 ₴"
 *   formatMoney(124750, { sign: 'always' }) // "+1 247,50 ₴"
 *   formatMoney(-5000)                      // "-50,00 ₴"
 *   formatMoney(124750, { compact: true })  // "1 248 ₴"
 *   formatMoney(0)                          // "0,00 ₴"
 */
export function formatMoney(
  amountCents: number,
  options: FormatMoneyOptions = {},
): string {
  const {
    currency = DEFAULT_CURRENCY,
    sign = 'auto',
    compact = false,
    locale = DEFAULT_LOCALE,
  } = options

  if (!Number.isFinite(amountCents)) {
    return formatMoney(0, options)
  }

  const amount = amountCents / 100
  const absAmount = Math.abs(amount)

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: compact ? 0 : 2,
    maximumFractionDigits: compact ? 0 : 2,
  })

  const formatted = formatter.format(compact ? Math.round(absAmount) : absAmount)

  if (sign === 'never') {
    return formatted
  }

  if (amount < 0) {
    return `-${formatted}`
  }

  if (sign === 'always' && amount > 0) {
    return `+${formatted}`
  }

  return formatted
}

/**
 * Parse a user-entered amount string into integer minor units.
 * Used for form input — accepts both "1247.50" and "1247,50".
 *
 * Returns null on invalid input. The caller decides how to surface
 * the error (validation message, default to 0, etc.).
 *
 * @example
 *   parseAmount("1247,50")  // 124750
 *   parseAmount("1247.50")  // 124750
 *   parseAmount("1 247,50") // 124750
 *   parseAmount("abc")      // null
 *   parseAmount("")         // null
 */
export function parseAmount(input: string): number | null {
  if (typeof input !== 'string') return null

  const trimmed = input.trim()
  if (trimmed === '') return null

  // Strip non-breaking spaces, regular spaces, and currency symbols
  const cleaned = trimmed
    .replace(/[\s\u00A0₴$€£]/g, '')
    .replace(',', '.')

  const value = Number.parseFloat(cleaned)
  if (!Number.isFinite(value)) return null

  // Round to avoid float artifacts (e.g. 12.47 * 100 = 1246.9999...)
  return Math.round(value * 100)
}

/**
 * Currency symbol lookup for places where a bare symbol is needed
 * (e.g. inside an amount input field). Prefer `formatMoney` for full displays.
 */
export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  UAH: '₴',
  USD: '$',
  EUR: '€',
  GBP: '£',
}
