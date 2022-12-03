import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  Collapse,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Select,
  FormControl,
  MenuItem,
  IconButton,
  Box,
  TableHead,
} from '@mui/material';
// components
import formatMoneyWithDot from '../utils/formatMoney';
import AppToast from '../myTool/AppToast';
import Page from '../components/Page';
import OrderDialog from '../dialog/OrderDialog';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';

import KeyboardArrowUpIcon from '@mui/icons-material/ArrowDownward';
import KeyboardArrowDownIcon from '@mui/icons-material/ArrowUpward';

import {
  getAllCartAPI,
  getAllStatusAPI,
  updateStatusAPI,
  createBillAPI,
  getCartDescriptionAPI,
} from '../components/services/index';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'cardId', label: 'Cart ID', alignRight: false },
  { id: 'owner', label: 'Owner', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'createTime', label: 'Create At', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [listCart, setListCart] = useState([]);
  const [listStatus, setListStatus] = useState([]);
  //-------------------------------------------------
  const [openDialog, setOpenDialog] = useState(false);

  const getAllCart = async () => {
    try {
      const res = await getAllCartAPI();
      setListCart(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllStatus = async () => {
    try {
      const res = await getAllStatusAPI();
      setListStatus(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCart();
    getAllStatus();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = listCart.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listCart.length) : 0;

  const filteredUsers = applySortFilter(listCart, getComparator(order, orderBy), filterName);

  return (
    <Page title="User">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Orders
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpenDialog}
          >
            Add Order
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={listCart.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <Row row={row} listStatus={listStatus} getAllCart={getAllCart} />
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[1, 5, 10]}
            component="div"
            createTime
            count={listCart.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <OrderDialog openDialog={openDialog} setOpenDialog={setOpenDialog} listCart={listCart} />
    </Page>
  );
}

const Row = ({ row, listStatus, getAllCart }) => {
  const {
    id: cartId,
    createTime,
    customer: { id: idUser, name: userName },
    status: { id },
    totalPrice,
  } = row;

  const [status, setStatus] = useState(id);
  const [afterStatus, setAfterStatus] = useState(id);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [severity, setSeverity] = useState(false);
  const [contentToast, setContentToast] = useState('');

  const [openDetailCart, setOpenDetailCart] = useState(false);
  const [cartDetail, setCartDetail] = useState([]);

  const updateStatus = async (body) => {
    try {
      const res = await updateStatusAPI(body);
      if (res?.status === 200) {
        getAllCart();
        setContentToast(res?.data);
        setSeverity('success');
        setOpenToast(true);
      } else {
        setContentToast(error);
        setSeverity('error');
        setOpenToast(true);
      }
    } catch (error) {
      setContentToast(error);
      setSeverity('error');
      setOpenToast(true);
    }
  };

  const createBill = async (cartId) => {
    try {
      const res = await createBillAPI(cartId);
      if (res?.status === 200) {
        setContentToast(res?.data);
        setSeverity('success');
        setOpenToast(true);
        setOpen2(false);
        setTimeout(() => getAllCart(), 1000);
      } else {
        setContentToast(error);
        setSeverity('error');
        setOpenToast(true);
        console.log(error);
      }
    } catch (error) {
      setContentToast(error);
      setSeverity('error');
      setOpenToast(true);
      console.log(error);
    }
  };

  function formatDate(str) {
    const date = str.split('T');
    const day = date[0].split('-');
    return `${day[2]}/${day[1]}/${day[0]}`;
  }

  const handleChangeStatus = (e) => {
    setOpen(true);
    setAfterStatus(e?.target?.value);
  };

  const handleCreateBill = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStatus(status);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOk = () => {
    setStatus(afterStatus);
    const body = {
      cartId,
      statusId: afterStatus,
    };
    updateStatus(body);
    setOpen(false);
  };

  const getCartDescription = async (cartId) => {
    try {
      const res = await getCartDescriptionAPI(cartId);
      setCartDetail(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (!openDetailCart) getCartDescription(cartId);
    setOpenDetailCart(!openDetailCart);
  };

  return (
    <>
      <TableRow hover key={cartId} tabIndex={-1} role="checkbox">
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={handleClick}>
            {openDetailCart ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{cartId}</TableCell>
        <TableCell align="center">{userName}</TableCell>
        <TableCell align="center">{formatMoneyWithDot(totalPrice)}</TableCell>
        <TableCell align="center">{formatDate(createTime)}</TableCell>

        <TableCell align="center">
          <FormControl style={{ marginTop: '10px' }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={handleChangeStatus}
            >
              {listStatus?.map((value) => (
                <MenuItem value={value?.id} key={value?.id}>
                  {value?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>
        {status === 5 && (
          <TableCell>
            <Button variant="text" onClick={handleCreateBill}>
              Xác nhận
            </Button>
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={openDetailCart} timeout="auto" unmountOnExit>
            {cartDetail?.length > 0 ? (
              <Box sx={{ margin: 4 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Sản phẩm
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên sản phẩm</TableCell>
                      <TableCell align="center">Số lượng</TableCell>
                      <TableCell align="right">Giá tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartDetail?.map((value) => (
                      <TableRow key={value?.cartDesId}>
                        <TableCell component="th" scope="row" sx={{ width: '400px' }}>
                          {value?.product?.name}
                        </TableCell>
                        <TableCell align="center">{value?.quantity}</TableCell>
                        <TableCell align="right">{formatMoneyWithDot(value?.price * value?.quantity)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            ) : null}
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Đổi trạng thái?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chắc chắn muốn đổi trạng thái của giỏ hàng {cartId} không ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleOk} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Xác nhận đơn hoàn thành?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chắc chắn xác nhận đơn hàng {cartId} hoàn thành?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Hủy</Button>
          <Button onClick={() => createBill(cartId)} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <AppToast
        content={contentToast}
        type={0}
        isOpen={openToast}
        severity={severity}
        callback={() => {
          setOpenToast(false);
        }}
      />
    </>
  );
};
