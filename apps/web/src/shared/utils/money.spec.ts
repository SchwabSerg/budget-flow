import { describe, it, expect } from 'vitest'
import { formatMoney, parseAmount } from './money'

describe('formatMoney', () => {
  describe('default UAH formatting', () => {
    it('formats a positive amount with comma decimal and space thousands', () => {
      expect(formatMoney(124750)).toMatch(/1\s247,50\s*₴/)
    })

    it('formats zero with two decimals', () => {
      expect(formatMoney(0)).toMatch(/0,00\s*₴/)
    })

    it('formats a negative amount with a leading minus', () => {
      expect(formatMoney(-5000)).toMatch(/^-50,00\s*₴/)
    })

    it('formats sub-unit amounts correctly', () => {
      expect(formatMoney(50)).toMatch(/0,50\s*₴/)
    })

    it('formats large amounts with multiple thousand separators', () => {
      expect(formatMoney(123456789)).toMatch(/1\s234\s567,89\s*₴/)
    })
  })

  describe('sign option', () => {
    it("with sign='always' adds a + on positive amounts", () => {
      expect(formatMoney(5000, { sign: 'always' })).toMatch(/^\+50,00/)
    })

    it("with sign='always' still uses minus on negative amounts", () => {
      expect(formatMoney(-5000, { sign: 'always' })).toMatch(/^-50,00/)
    })

    it("with sign='always' does not add a sign to zero", () => {
      expect(formatMoney(0, { sign: 'always' })).not.toMatch(/^[+-]/)
    })

    it("with sign='never' strips the minus from negative amounts", () => {
      expect(formatMoney(-5000, { sign: 'never' })).not.toMatch(/^-/)
    })
  })

  describe('compact mode', () => {
    it('rounds to whole units and omits decimals', () => {
      expect(formatMoney(124750, { compact: true })).toMatch(/1\s248\s*₴/)
    })

    it('rounds half up', () => {
      expect(formatMoney(150, { compact: true })).toMatch(/2\s*₴/)
    })

    it('shows zero as a whole number', () => {
      expect(formatMoney(0, { compact: true })).toMatch(/0\s*₴/)
    })
  })

  describe('alternate currencies', () => {
    it('formats USD with the dollar symbol', () => {
      const result = formatMoney(124750, { currency: 'USD', locale: 'en-US' })
      expect(result).toBe('$1,247.50')
    })

    it('formats EUR with the euro symbol', () => {
      const result = formatMoney(124750, { currency: 'EUR', locale: 'de-DE' })
      expect(result).toMatch(/1\.247,50\s*€/)
    })
  })

  describe('edge cases', () => {
    it('handles non-finite values by treating them as zero', () => {
      expect(formatMoney(Number.NaN)).toMatch(/0,00\s*₴/)
      expect(formatMoney(Number.POSITIVE_INFINITY)).toMatch(/0,00\s*₴/)
    })
  })
})

describe('parseAmount', () => {
  it('parses a Ukrainian-formatted decimal', () => {
    expect(parseAmount('1247,50')).toBe(124750)
  })

  it('parses an English-formatted decimal', () => {
    expect(parseAmount('1247.50')).toBe(124750)
  })

  it('strips spaces from user input', () => {
    expect(parseAmount('1 247,50')).toBe(124750)
  })

  it('strips currency symbols from user input', () => {
    expect(parseAmount('₴1247,50')).toBe(124750)
    expect(parseAmount('1247,50 ₴')).toBe(124750)
  })

  it('rounds to avoid float artifacts', () => {
    // 12.47 * 100 in JS evaluates to 1246.9999... — must round up.
    expect(parseAmount('12,47')).toBe(1247)
  })

  it('returns null for empty input', () => {
    expect(parseAmount('')).toBeNull()
    expect(parseAmount('   ')).toBeNull()
  })

  it('returns null for non-numeric input', () => {
    expect(parseAmount('abc')).toBeNull()
  })

  it('handles whole numbers without decimals', () => {
    expect(parseAmount('100')).toBe(10000)
  })
})
