import * as React from 'react';
import { Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { editServiceAPI } from '../components/services/index';

export default function ServiceEditDialog(props) {
  const { openDialog, setOpenDialog, getAllService, setContentToast, setSeverity, setOpenToast, service } = props;
  const [name, setName] = React.useState();
  const [image, setImage] = React.useState();
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setName(service?.name);
    setImage(service?.image);
  }, [service]);

  const editService = async (data) => {
    try {
      const res = await editServiceAPI(data);
      console.log(res);
      if (res.status === 200) {
        setContentToast(res?.data);
        setSeverity('success');
        setOpenToast(true);
        setOpenDialog(false);
        getAllService();
      } else {
        setContentToast('Sửa sản phẩm thất bại');
        setOpenToast(true);
        setSeverity('error');
      }
    } catch (error) {
      setContentToast('Sửa sản phẩm thất bại');
      setOpenToast(true);
      setSeverity('error');
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleEditUser = () => {
    if (!name || !image) {
      setIsError(true);
    } else {
      setIsError(false);
      const data = {
        serviceId: service?.serviceId,
        image,
        name,
      };

      console.log(data);

      editService(data);
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogContent sx={{ height: 300 }}>
          <TextField
            margin="dense"
            id="name"
            label="Service Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            sx={{ mt: 3 }}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="image"
            label="Image URL"
            type="text"
            fullWidth
            multiline
            variant="outlined"
            value={image}
            sx={{ mt: 5 }}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <p
            style={{
              margin: '10px',
              color: 'red',
              fontWeight: 'Bold',
              justifyContent: 'flex-end',
              display: isError ? 'flex' : 'none',
            }}
          >
            Please enter full information
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditUser} type="submit">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
