export const colors = {
  white: {
    base: '#fff',
    light: '#f0f0f0',
    grey: '#cecece',
    dark: '#a0afd7',
  },
  black: {
    base: '#333438',
    light: '#4b4e57',
    blue: '#2e3246',
  },
  primary: {
    base: '#12b3c7',
    light: '#bae9ee',
    dark: '#1a96ae',
  },
  background: {
    light: '#bae9ee',
    dark: '#1a96ae',
  },
};

export const shadow = {
  card: '0 20px 30px rgba(0, 0, 0, 0.1)',
  image: '0 15px 25px rgba(0, 0, 0, 0.1)',
  suggestion: '0 -5px 30px rgba(0,0,0,0.2)',
  footer: '0 -3px 26px rgba(0,0,0,0.5)',
  feature: {
    big: {
      default: '0 40px 40px rgba(0, 0, 0, 0.2)',
      hover: '0 50px 50px rgba(0, 0, 0, 0.1)',
    },
    small: {
      default: '0 15px 25px rgba(0, 0, 0, 0.2)',
      hover: '0 40px 45px rgba(0, 0, 0, 0.1)',
    },
  },
  text: {
    small: '0 5px 10px rgba(0, 0, 0, 0.25)',
    big: '0 15px 20px rgba(0, 0, 0, 0.13)',
  },
};

export const gradient = {
  // eslint-disable-next-line
  leftToRight: `linear-gradient(-45deg, ${colors.background.light} 0%, ${colors.background.dark} 100%)`,
  // eslint-disable-next-line
  rightToLeft: `linear-gradient(45deg, ${colors.background.light} 0%, ${colors.background.dark} 100%)`,
};

export const transition = {
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  duration: '0.4s',
};

export const theme = {
  colors,
  gradient,
  shadow,
  breakpoints: {
    xs: '375px',
    s: '768px',
    m: '900px',
    l: '1200px',
  },
  fontFamily: {
    // eslint-disable-next-line
    body: `'whitneyssm-book', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
    // eslint-disable-next-line
    heading: `'whitneyssm-semibold', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
  },
  fontSize: {
    xxsmall: '.625rem', // 10px
    xsmall: '.75rem', // 12px
    small: '.875rem', // 14px
    medium: '1rem', // 16px
    large: '1.125rem', // 18px,
    xlarge: '1.5rem', // 24px
    xxlarge: '2rem', // 32px
  },
  letterSpacing: {
    normal: 0,
    medium: '.08em',
    wide: '.12em',
  },
  lineHeight: {
    body: 2,
    heading: 1.6,
    article: 2.2,
  },
  layout: {
    article: '924px',
    base: '1172px',
    big: '1280px',
  },
  borderRadius: {
    default: '0.4rem',
    round: '100rem',
  },
  transitions: {
    default: {
      duration: transition.duration,
      timing: transition.easeInOutCubic,
      transition: `all ${transition.duration} ${transition.easeInOutCubic}`,
    },
    boom: {
      duration: transition.duration,
      timing: transition.easeOutBack,
      transition: `all ${transition.duration} ${transition.easeOutBack}`,
    },
    headroom: {
      transition: 'all 0.25s ease-in-out',
    },
  },
};

export default theme;
