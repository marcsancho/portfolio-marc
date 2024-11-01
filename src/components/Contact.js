// src/components/Contact.js
import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Contact = () => (
    <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>Contacto</Typography>
        <form>
            <TextField label="Nombre" fullWidth margin="normal" />
            <TextField label="Correo Electrónico" fullWidth margin="normal" />
            <TextField label="Mensaje" fullWidth margin="normal" multiline rows={4} />
            <Button variant="contained" color="primary" type="submit">
                Enviar
            </Button>
        </form>
    </Box>
);

export default Contact;
