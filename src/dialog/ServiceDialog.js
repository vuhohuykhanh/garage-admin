import * as React from 'react';
import { Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { addNewServiceAPI, getAllServiceTypeAPI } from '../components/services/index';

export default function ServiceDialog(props) {
  const { openDialog, setOpenDialog, getAllService, setContentToast, setSeverity, setOpenToast } = props;
  const [name, setName] = React.useState();
  const [image, setImage] = React.useState();
  const [price, setPrice] = React.useState();
  const [serviceType, setServiceType] = React.useState();
  const [description, setDescription] = React.useState();
  const [isError, setIsError] = React.useState(false);
  const [listServiceType, setListServiceType] = React.useState();

  const addNewService = async (data) => {
    try {
      const res = await addNewServiceAPI(data);
      if (res.status === 200) {
        setName(null);
        setImage(null);
        setPrice(null);
        setServiceType(null);
        setDescription(null);
        setContentToast(res?.data);
        setSeverity('success');
        setOpenToast(true);
        setOpenDialog(false);
        getAllService();
      } else {
        setContentToast('Thêm dịch vụ thất bại');
        setOpenToast(true);
        setSeverity('error');
      }
    } catch (error) {
      setContentToast('Thêm dịch vụ thất bại');
      setOpenToast(true);
      setSeverity('error');
    }
  };

  const getAllServiceType = async () => {
    try {
      const res = await getAllServiceTypeAPI();
      setListServiceType(res?.data);
      console.log(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAllServiceType();
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
    setName(null);
    setImage(null);
    setPrice(null);
    setServiceType(null);
    setDescription(null);
  };

  const handleAddUser = () => {
    if (!name || !image || !price || !serviceType || !description) {
      setIsError(true);
      const data = {
        name,
        image,
        price,
        serviceTypeId: serviceType,
        description: [
          {
            type: 'Content',
            content: description,
          },
        ],
      };

      console.log(data);
    } else {
      setIsError(false);
      const data = {
        name,
        image,
        price,
        serviceTypeId: serviceType,
        description: [
          {
            type: 'Content',
            content: description,
          },
        ],
      };

      console.log(data);

      addNewService(data);
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Add New Service</DialogTitle>
        <DialogContent sx={{ height: 500 }}>
          <TextField
            margin="dense"
            id="name"
            label="Service Name"
            type="text"
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="image"
            label="Image URL"
            type="text"
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 1,
            }}
          >
            <TextField
              autoFocus
              id="price"
              label="Price"
              type="number"
              size="medium"
              sx={{ width: 500, mr: 2 }}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <Autocomplete
              disablePortal
              id="serviceType"
              options={listServiceType}
              getOptionLabel={(option) => option?.serviceTypeName}
              sx={{ width: 500, mr: 2 }}
              onChange={(e, newValue) => {
                setServiceType(newValue?._id);
              }}
              renderInput={(params) => <TextField {...params} label="Service Type" />}
            />
          </Box>
          <TextField
            margin="dense"
            id="description"
            label="Description"
            minRows={10}
            multiline
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onChange={(e) => setDescription(e.target.value)}
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
          <Button onClick={handleAddUser} type="submit">
            Add Service
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
