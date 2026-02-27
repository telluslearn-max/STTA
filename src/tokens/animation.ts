export const duration = {
  fast: 0.25,
  medium: 0.45,
  slow: 0.7,
  crawl: 1.0,
} as const

export const ease = {
  snap: 'power4.out',
  float: 'power2.inOut',
  elastic: 'elastic.out(1, 0.4)',
  sweep: 'cubic-bezier(.77,0,.175,1)',
} as const

export const lerp = {
  cursor: 0.10,
  image: 0.07,
  card: 0.08,
  marquee: 0.08,
} as const
