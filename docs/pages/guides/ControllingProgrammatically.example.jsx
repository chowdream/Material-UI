import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from '@material-ui/pickers';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

function ControllingProgrammaticallyExample() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, handleDateChange] = useState('2018-01-01T00:00:00.000Z');

  return (
    <div className={classes.root}>
      <Button onClick={() => setIsOpen(true)}> Open picker </Button>

      <DatePicker
        renderInput={props => <TextField {...props} />}
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        label="Open me from button"
        inputFormat="d MMM yyyy"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default ControllingProgrammaticallyExample;
