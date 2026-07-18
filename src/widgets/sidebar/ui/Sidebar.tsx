import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material'

export const Sidebar = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                height: 'calc(100vh - 60px)',
                maxWidth: 240,
                borderRight: '1px solid gray',
                position: 'sticky',
                top: 60,
            }}
        >
            <nav aria-label="main mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton href="/">
                            <ListItemText primary="Главная" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton href="/dashboard">
                            <ListItemText primary="Панель управления" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton href="/admin">
                            <ListItemText primary="Пользователи" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton href="/sales-funnel">
                            <ListItemText primary="Воронка продаж" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    )
}
