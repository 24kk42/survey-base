import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

/**
 * Footer copyright that takes in the date, the link string, and the link url.
 */
export default function Copyright({ string, date, url }) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href={url}>
        {string}
      </Link>{' '}
      {date}
      {'.'}
    </Typography>
  );
}