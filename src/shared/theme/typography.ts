// shared/theme/typography.ts

export const typography = {
    fontFamily: 'var(--font-inter)',

    h1: {
        fontWeight: 700,
        fontSize: '40px',
        lineHeight: '48px',
    },

    h2: {
        fontWeight: 700,
        fontSize: '32px',
        lineHeight: '40px',
    },

    h6: {
        fontWeight: 400,
        fontSize: '18px',
        lineHeight: '26px',
    },

    body1: {
        fontSize: '16px',
        lineHeight: '24px',
    },

    body2: {
        fontSize: '14px',
        lineHeight: '20px',
    },

    button: {
        textTransform: 'none' as const,
        fontWeight: 600,
    },
}
