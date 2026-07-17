import { Theme } from '@emotion/react'
import { Components } from '@mui/material'

export const components = {
    MuiButton: {
        defaultProps: {
            variant: 'contained',
            size: 'medium',
            disableElevation: true,
        },

        styleOverrides: {
            root: {
                borderRadius: 8,
                textTransform: 'none',
                fontWeight: 600,
            },
        },
    },

    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 12,
            },
        },
    },

    MuiTextField: {
        defaultProps: {
            variant: 'outlined',
            size: 'small',
        },
    },

    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 12,
            },
        },
    },
} satisfies Components<Theme>
