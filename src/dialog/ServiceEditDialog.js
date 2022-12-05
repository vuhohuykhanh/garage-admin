import * as React from 'react';
import { Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { editProductAPI, getAllServiceTypeAPI } from '../components/services/index';

export default function ServiceEditDialog(props) {
  const { openDialog, setOpenDialog, getAllService, setContentToast, setSeverity, setOpenToast, service } = props;
  const [name, setName] = React.useState();
  const [price, setPrice] = React.useState();
  const [serviceType, setServiceType] = React.useState();
  const [isError, setIsError] = React.useState(false);
  const [listServiceType, setListServiceType] = React.useState();

  React.useEffect(() => {
    setName(service?.name);
    setPrice(service?.price);
    setServiceType(service?.serviceType);
  }, [service, openDialog]);

  React.useEffect(() => {
    getAllServiceType();
  }, []);

  const getAllServiceType = async () => {
    try {
      const res = await getAllServiceTypeAPI();
      setListServiceType(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editService = async (data, productId) => {
    try {
      const res = await editProductAPI(data, productId);
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
    if (!name || !price || !serviceType) {
      setIsError(true);
    } else {
      setIsError(false);
      const data = {
        name,
				price,
        serviceType: serviceType?.id,
      };

      editService(data, service?.id);
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogContent sx={{ height: 500 }}>
          <TextField
            margin="dense"
            id="name"
            label="Service Name"
            type="text"
            fullWidth
            value={name}
            variant="outlined"
            sx={{ mt: 2 }}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            autoFocus
            id="price"
            label="Price"
            type="number"
            size="medium"
            fullWidth
            value={price}
            sx={{ mt: 4 }}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <Autocomplete
            disablePortal
            id="serviceType"
            value={serviceType}
            options={listServiceType}
            getOptionLabel={(option) => option?.name}
            sx={{ mt: 4 }}
            onChange={(e, newValue) => {
              setServiceType(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Service Type" />}
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
        {/*<DialogContent sx={{ height: 300 }}>
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
        </DialogContent>*/}
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
