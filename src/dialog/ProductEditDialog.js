import * as React from 'react';
import { Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { editProductAPI, getAllManufacturerAPI, getAllProductTypeAPI } from '../components/services/index';

export default function ProductEditDialog(props) {
  const { openDialog, setOpenDialog, getAllProduct, setContentToast, setSeverity, setOpenToast, product } = props;
  const [name, setName] = React.useState();
  const [quantity, setQuantity] = React.useState();
  const [image, setImage] = React.useState();
  const [manufacturer, setManufacturer] = React.useState();
  const [productType, setProductType] = React.useState();
  const [isError, setIsError] = React.useState(false);
  //  const [listManufacturer, setListManufacturer] = React.useState();
  //  const [listProductType, setListProductType] = React.useState();

  React.useEffect(() => {
    setName(product?.name);
    setImage(product?.image);
    setQuantity(product?.quantity);
    // setManufacturer(product?.manufacturerId);
    // setProductType(product?.productTypeId);
  }, [product]);

  const editProduct = async (data) => {
    try {
      const res = await editProductAPI(data);
      console.log(res);
      if (res.status === 200) {
        setContentToast(res?.data);
        setSeverity('success');
        setOpenToast(true);
        setOpenDialog(false);
        getAllProduct();
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

  //  const getAllManufacturer = async () => {
  //    try {
  //      const res = await getAllManufacturerAPI();
  //      setListManufacturer(res?.data);
  //      console.log(res?.data);
  //    } catch (error) {
  //      console.log(error);
  //    }
  //  };

  //  const getAllProductType = async () => {
  //    try {
  //      const res = await getAllProductTypeAPI();
  //      setListProductType(res?.data);
  //      console.log(res?.data);
  //    } catch (error) {
  //      console.log(error);
  //    }
  //  };

  //  React.useEffect(() => {
  //    getAllManufacturer();
  //    getAllProductType();
  //  }, []);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleEditUser = () => {
    // if (!name || !image || !quantity || !manufacturer || !productType) {
    if (!name || !image || !quantity) {
      setIsError(true);
    } else {
      setIsError(false);
      console.log(product?.productId);
      const data = {
        productId: product?.productId,
        image,
        name,
        quantity,
        // manufacturerId: manufacturer?._id,
        // productTypeId: productType?._id,
      };

      console.log(data);

      editProduct(data);
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent sx={{ height: 300 }}>
          <TextField
            margin="dense"
            id="name"
            label="Product Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            sx={{ mt: 3 }}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 3,
            }}
          >
            <Autocomplete
              disablePortal
              id="manufacturer"
              options={listManufacturer}
              getOptionLabel={(option) => option?.manufacturerName}
              sx={{ width: 500, mr: 2 }}
              //  value={manufacturer}
              onChange={(e, newValue) => {
                console.log(newValue);
                setManufacturer(newValue?._id);
              }}
              renderInput={(params) => <TextField {...params} label="Manufacturer" />}
            />
            <Autocomplete
              disablePortal
              id="productType"
              options={listProductType}
              getOptionLabel={(option) => option?.productTypeName}
              fullWidth
              value={listProductType?.find((value) => value?._id === productType?._id)}
              onChange={(e, newValue) => {
                console.log(newValue);
                setProductType(newValue?._id);
              }}
              renderInput={(params) => <TextField {...params} label="Product Type" />}
            />
          </Box> */}
          <TextField
            margin="dense"
            id="image"
            label="Image URL"
            type="text"
            fullWidth
            variant="outlined"
            value={image}
            sx={{ mt: 3 }}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <TextField
            autoFocus
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            size="medium"
            value={quantity}
            sx={{ mt: 3 }}
            onChange={(e) => setQuantity(e.target.value)}
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
