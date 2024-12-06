import React from 'react';
import { Card, CardContent, Typography, TextField, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContactSection = styled('div')({
  height: '90vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});

const ContactCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  width: '100%',
  backgroundColor: theme.palette.background.paper,
}));

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const Contact = () => (
  <Container>
    <ContactSection>
      <ContactCard>
        <CardContent>
          <Typography variant="h2" component="h1" gutterBottom>
            Contact Me
          </Typography>
          <Form>
            <TextField label="Name" variant="outlined" fullWidth />
            <TextField label="Email" type="email" variant="outlined" fullWidth />
            <TextField label="Message" multiline rows={4} variant="outlined" fullWidth />
            <Button variant="contained" color="primary" size="large">
              Send Message
            </Button>
          </Form>
        </CardContent>
      </ContactCard>
    </ContactSection>
  </Container>
);

export default Contact;
