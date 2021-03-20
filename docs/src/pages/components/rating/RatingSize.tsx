import * as React from 'react';
import Rating from '@material-ui/core/Rating';
import Stack from '@material-ui/core/Stack';

export default function RatingSIze() {
  return (
    <Stack spacing={1}>
      <Rating name="size-small" defaultValue={2} size="small" />
      <Rating name="size-medium" defaultValue={2} />
      <Rating name="size-large" defaultValue={2} size="large" />
    </Stack>
  );
}
