/**
 * Maximum linear relative luminance produced by the particle accumulation
 * pass. With the 12% surface scrim and 84% copy-column wash, an output at
 * this ceiling is reduced to <= 0.11 behind body copy. That keeps 80%-paper
 * body text above 4.5:1 while allowing the open field to remain vivid.
 */
export const FIELD_LUMINANCE_CEILING = 0.74;
