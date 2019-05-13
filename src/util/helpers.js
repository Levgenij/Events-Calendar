import config from '../config'
import moment from 'moment-timezone'

/**
 * This this undefined or null ?
 * @param input
 * @return {boolean}
 */
export const isUndefinedOrNull = (input) => input === undefined || input === null

/**
 * Is input value is an empty string ?
 *
 * @param input
 * @return {boolean}
 */
export const isEmptyString = (input) => typeof input === 'string' && input.length === 0

/**
 * Log to console
 *
 * @param args
 */
export const log = (...args) => {
  if (config.debug) {
    window.console.log.apply(window, ['[LOG]', ...args])
  }
}

/**
 * Whether input value is object
 *
 * @param input
 * @returns {boolean}
 */
export const isObject = (input) => typeof input === 'object'

/**
 * Is this string?
 *
 * @param input
 * @return {boolean}
 */
export const isString = (input) => typeof input === 'string'

/**
 * Remove item from array
 *
 * @param array
 * @param item
 * @returns {Object}
 */
export const arrayRemove = (array, item) => {
  const index = array.indexOf(item)
  
  if (index > -1) {
    array.splice(array.indexOf(item), 1)
  }
  
  return item
}

/**
 * Massively remove items from an array
 *
 * @param array
 * @param items
 * @returns {*}
 */
export const arrayMassRemove = (array, items) => items.forEach((item) => arrayRemove(array, item))

/**
 * Repeat given callback x times also
 * passing to callback current
 * iteration number
 *
 * @param times
 * @param fn
 * @returns {any[]}
 */
export const repeat = (times, fn) => Array.from({length: times}, (v, i) => i).map(x => fn(x)).slice(-1)[0]

/**
 * Flatten an array to given depth
 *
 * @param array
 * @param depth
 * @returns {*[]}
 */
export const flatten = (array, depth = 1) => {
  return repeat(depth, () => {
    array = [].concat.apply([], array)
    
    return array
  })
}

/**
 * Cast object properties to moment instance
 *
 * @param object
 * @param properties
 * @return {*}
 */
export const momentize = (object, properties) => {
  properties.forEach(prop => {
    const value = object[prop]
    
    object[prop] = isUndefinedOrNull(value) ? value : moment.isMoment(value) ? value : (isObject(value) ? moment.tz(value.date, value.timezone).local() : moment.tz(value, 'UTC').local())
  })
  
  return object
}

