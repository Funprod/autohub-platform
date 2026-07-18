'use client'

import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'
import NextLink, { LinkProps } from 'next/link'

type Props = LinkProps & MuiLinkProps

export function Link({ href, children, ...props }: Props) {
    return (
        <MuiLink
            component={NextLink}
            href={href}
            underline="none"
            color="primary"
            {...props}
        >
            {children}
        </MuiLink>
    )
}
