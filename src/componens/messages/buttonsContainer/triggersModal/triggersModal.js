import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Divider from "@material-ui/core/Divider";

export default function TriggersModal(props) {
   const {onClose, open} = props;

   return (
      <Dialog onClose={() => onClose(false)} aria-labelledby="simple-dialog-title" open={open}>
         <DialogTitle id="simple-dialog-title">Выберите шаг</DialogTitle>
         <Divider/>
      </Dialog>
   );
}
