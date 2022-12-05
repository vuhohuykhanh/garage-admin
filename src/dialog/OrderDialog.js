import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppToast from '../myTool/AppToast';
import { addCarDesAPI, getAllProductAPI } from '../components/services/index';

export default function OrderDialog(props) {
  const { openDialog, setOpenDialog, listCart } = props;
  const [listProduct, setListProduct] = useState([]);
  const [quantity, setQuantity] = useState(null);
  const [productAdd, setProductAdd] = useState([]);
  const [productFocus, setProductFocus] = useState(null);
  const [openToastHere, setOpenToastHere] = useState(false);
  const [contentToastHere, setContentToastHere] = useState('');
  const [severityHere, setSeverityHere] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [cartId, setCartId] = useState(null);

  const addProduct = async () => {
    const data = {
      idCartDes: cartId,
      productAdd,
    };

    try {
      const res = await addCarDesAPI(data);
      if (res.status === 200) {
        setContentToastHere(res?.data);
        setSeverityHere('success');
        setProductAdd([]);
        setOpenToastHere(true);
        setOpenDialog(false);
      } else {
        console.log(res);
        setContentToastHere('Thêm sản phẩm add thất bại');
        setOpenToastHere(true);
        setSeverityHere('error');
      }
    } catch (error) {
      console.log(error);
      setContentToastHere('Thêm sản phẩm add thất bại');
      setOpenToastHere(true);
      setSeverityHere('error');
    }
  };

  const getAllProduct = async () => {
    try {
      const res = await getAllProductAPI();
      setListProduct(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAllProduct();
  }, []);

  const handleClose = () => {
    setCartId(null);
    setProductAdd([]);
    setOpenDialog(false);
  };

  const handleAddProduct = () => {
    if (!cartId || !productAdd.length) {
      setIsError(true);
    } else {
      setIsError(false);
      setErrorMsg('');
      addProduct();
    }
  };

  const handleAddProductToList = () => {
    if (!productFocus || !quantity) {
      setIsError(true);
      setErrorMsg('(Product & Quantity)');
    } else {
      setIsError(false);
      setErrorMsg('');
      const exist = productAdd?.find((value) => value.id === productFocus?.id);
      if (exist) {
        setOpenToastHere(true);
        setContentToastHere('Sản phẩm này đã có trong giỏ hàng, không thể thêm vào nữa!!');
        setSeverityHere('error');
      } else {
        const data = {
          id: productFocus?.id,
          quantity,
          name: productFocus?.name,
          price: productFocus?.price,
          productPrice: productFocus?.price,
          totalPrice: productFocus?.price * quantity,
          type: 'Báo giá',
        };
        setProductAdd([...productAdd, data]);
				setQuantity("");
				setProductFocus(null);
      }
    }
  };

  return (
    <div style={{ width: '1000px' }}>
      <Dialog open={openDialog} onClose={handleClose} maxWidth={'1000px'}>
        <DialogTitle>Add Product To Order</DialogTitle>
        <DialogContent sx={{ height: 650 }}>
          <Autocomplete
            disablePortal
            id="cart"
            options={listCart}
            getOptionLabel={(option) => option?.id.toString()}
            sx={{ mt: 2, mb: '60px' }}
            onChange={(e, newValue) => {
              console.log('newValue', newValue);
              setCartId(newValue?.id);
            }}
            renderInput={(params) => <TextField {...params} label="Cart" />}
          />
          <DenseTable productAdd={productAdd} />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: '60px',
            }}
          >
            <Autocomplete
              disablePortal
              id="product"
              options={listProduct}
							value={productFocus}
              getOptionLabel={(option) => option?.name.toString()}
              sx={{ width: 500, mr: 2 }}
              onChange={(e, newValue) => {
                setProductFocus(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Product" />}
            />
            <TextField
              id="quantity"
              label="Quantity"
              type="Number"
              fullWidth
							value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </Box>
          <Button
            style={{ display: 'flex', justifyContent: 'right', marginTop: '20px', width: '100%' }}
            onClick={handleAddProductToList}
          >
            Thêm
          </Button>
        </DialogContent>
        <p
          style={{
            margin: '10px',
            color: 'red',
            fontWeight: 'Bold',
            justifyContent: 'flex-end',
            display: isError ? 'flex' : 'none',
          }}
        >
          Please enter full information {errorMsg}
        </p>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddProduct} type="submit">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
      <AppToast
        content={contentToastHere}
        type={0}
        isOpen={openToastHere}
        severity={severityHere}
        callback={() => {
          setOpenToastHere(false);
        }}
      />
    </div>
  );
}

function DenseTable({ productAdd }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Mã SP</TableCell>
            <TableCell align="center">Tên</TableCell>
            <TableCell align="center">Giá</TableCell>
            <TableCell align="center">Số lượng</TableCell>
            <TableCell align="center">Thành tiền</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productAdd?.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" align="center">
                {row?.id}
              </TableCell>
              <TableCell align="center">{row?.name}</TableCell>
              <TableCell align="center">{row?.price}</TableCell>
              <TableCell align="center">{row?.quantity}</TableCell>
              <TableCell align="center">{row?.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
