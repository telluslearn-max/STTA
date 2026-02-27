export const colors = {
  ink: '#0A0A0A',
  plate: '#111111',
  edge: '#1E1E1E',
  orange: '#FF4E00',
  blue: '#003FD4',
  chalk: '#EEECE5',
  muted: 'rgba(238,236,229,.36)',
} as const

export const typography = {
  display: 'Bebas Neue',
  ui: 'Syne',
  mono: 'DM Mono',
} as const

export const spacing = {
  unit: 4,
  sectionY: 120,
  sectionX: 48,
  sectionXMobile: 24,
  cardGap: 2,
  maxWidth: 1440,
} as const

export const typeScale = {
  display: {
    hero: 'clamp(80px, 13.5vw, 210px)',
    section: 'clamp(48px, 7vw, 100px)',
    card: 'clamp(28px, 3vw, 44px)',
    headline: 'clamp(60px, 9vw, 130px)',
  },
  body: {
    large: 'clamp(22px, 3vw, 38px)',
    medium: '13px',
    small: '12px',
    tiny: '10px',
  },
  ui: {
    nav: '13px',
    label: '9px',
    button: '15px',
  },
} as const
