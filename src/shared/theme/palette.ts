import { colors } from './tokens'

export const palette = {
    mode: 'light' as const,

    primary: {
        main: colors.primary,
    },

    secondary: {
        main: colors.secondary,
    },

    white: {
        main: colors.white,
    },

    success: {
        main: colors.success,
    },

    warning: {
        main: colors.warning,
    },

    error: {
        main: colors.error,
    },

    text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
    },

    background: {
        default: colors.background,
        paper: colors.surface,
    },

    divider: colors.border,
}
