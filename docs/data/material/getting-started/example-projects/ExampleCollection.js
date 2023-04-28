import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const examples = [
  {
    name: 'Next.js',
    label: 'View JS example',
    tsLabel: 'View TS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-next',
    tsLink:
      'https://github.com/mui/material-ui/tree/master/examples/material-next-ts',
    src: '/static/images/examples/next.svg',
  },
  {
    name: 'Create React App',
    label: 'View JS example',
    tsLabel: 'View TS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-cra',
    tsLink:
      'https://github.com/mui/material-ui/tree/master/examples/material-cra-ts',
    src: '/static/images/examples/cra.svg',
  },
  {
    name: 'Remix',
    label: 'View example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-remix-ts',
    src: '/static/images/examples/remix.svg',
  },
  {
    name: 'Tailwind CSS',
    label: 'View example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-cra-tailwind-ts',
    src: '/static/images/examples/tailwindcss.svg',
  },
  {
    name: 'Vite.js',
    label: 'View JS example',
    tsLabel: 'View TS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-vite',
    src: '/static/images/examples/vite.svg',
  },
  {
    name: 'styled-components',
    label: 'View JS example',
    tsLabel: 'View TS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-cra-styled-components',
    tsLink:
      'https://github.com/mui/material-ui/tree/master/examples/material-cra-styled-components-ts',
    src: '/static/images/examples/styled.png',
  },
  {
    name: 'Gatsby',
    label: 'View example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-gatsby',
    src: '/static/images/examples/gatsby.svg',
  },
  {
    name: 'Preact',
    label: 'View example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-preact',
    src: '/static/images/examples/preact.svg',
  },
  {
    name: 'CDN',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-via-cdn',
    label: 'View example',
  },
  {
    name: 'Express.js (server-rendered)',
    label: 'View example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-express-ssr',
    src: '/static/images/examples/express.png',
  },
];

export default function ExampleCollection() {
  return (
    <Grid container spacing={2}>
      {examples.map((example) => (
        <Grid key={example.name} item xs={12} sm={6}>
          <Card
            sx={[
              (theme) => ({
                p: 2,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                bgcolor: theme.palette.mode === 'dark' ? 'transparent' : '#fff',
                backgroundImage: 'none',
                borderRadius: 2,
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? '#132F4C' : 'grey.200',
                boxShadow: 'none',

                '&:hover': {
                  borderColor:
                    theme.palette.mode === 'dark' ? '#173A5E' : 'grey.300',
                  boxShadow:
                    theme.palette.mode === 'dark'
                      ? '0px 2px 8px rgba(0, 13, 26, 1)'
                      : '0px 2px 8px rgba(170, 180, 190, 0.2)',
                },
              }),
            ]}
          >
            <Avatar
              imgProps={{
                width: '40',
                height: '40',
                loading: 'lazy',
              }}
              src={example.src}
              alt={example.name}
            />
            <div>
              <Typography
                variant="body"
                fontWeight={600}
                sx={{ fontFamily: 'IBM Plex Sans' }}
              >
                {example.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'baseline',
                }}
              >
                <Link
                  href={example.link}
                  variant="body2"
                  sx={{
                    fontFamily: 'IBM Plex Sans',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    mt: 0.5,
                  }}
                >
                  {example.label}
                  <ChevronRightRoundedIcon fontSize="small" />
                </Link>
                {!!example.tsLink && (
                  <React.Fragment>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: 'IBM Plex Sans',
                        display: { xs: 'none', sm: 'block' },
                        opacity: 0.2,
                        mr: 0.75,
                      }}
                    >
                      /
                    </Typography>
                    <Link
                      href={example.tsLink}
                      variant="body2"
                      sx={{
                        fontFamily: 'IBM Plex Sans',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {example.tsLabel}
                      <ChevronRightRoundedIcon fontSize="small" />
                    </Link>
                  </React.Fragment>
                )}
              </Box>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
