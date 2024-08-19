// utility-functions.test
import { describe, expect, test } from 'vitest'
import { getFormattedPhoneNumber, secondsToMMSS } from '../../src/utils/utility-functions'

describe('getFormattedPhoneNumber', () => {
  test('should return empty string when phoneNumber is undefined', () => {
    // Arrange
    const phoneNumber = undefined

    // Act
    const result = getFormattedPhoneNumber(phoneNumber)

    // Assert
    expect(result).toBe('')
  })

  test('should return empty string when phoneNumber is not a number', () => {
    // Arrange
    const phoneNumber = 'abc'

    // Act
    const result = getFormattedPhoneNumber(phoneNumber)

    // Assert
    expect(result).toBe('')
  })

  test('should return formatted phone number with country code', () => {
    // Arrange
    const phoneNumber = '123456789'

    // Act
    const result = getFormattedPhoneNumber(phoneNumber)

    // Assert
    expect(result).toBe('+123456789')
  })


  test('should returns formatted phone if number has spaces', () => {
    // Arrange
    const phoneNumber = '1234 567 89'

    // Act
    const result = getFormattedPhoneNumber(phoneNumber)

    // Assert
    expect(result).toBe('+123456789')
  })
})

describe('secondsToMMSS', () => {
  test('returns formatted MM:SS string', () => {
    // Arrange
    const seconds = 65

    // Act
    const result = secondsToMMSS(seconds)

    // Assert
    expect(result).toBe('01:05')
  })

  test('returns "00:00" when seconds is undefined', () => {
    // Arrange
    const seconds = undefined

    // Act
    const result = secondsToMMSS(seconds)

    // Assert
    expect(result).toBe('00:00')
  })
})
