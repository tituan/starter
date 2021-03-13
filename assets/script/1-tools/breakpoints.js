/**
 * This file defines the values of breapkpoints.
 * These values are the same as used by the sass (assets/scss/1-settings/_variables.scss).
 */

export function breakpoints(size) {

  const breakpoints = {
    xs: 400,
    sm: 500,
    md: 850,
    lg: 1200,
    xl: 1500
  }

  let breakpointsValue = breakpoints[size]

  return breakpointsValue

}
