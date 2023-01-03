import * as React from 'react';
import { Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { patchUpdateCartAPI } from '../components/services/index';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function OrderEditDialog(props) {
  const { openDialog, setOpenDialog, getAllService, setContentToast, setSeverity, setOpenToast, order } = props;
	const [expectedDate, setExpectedDate] = React.useState(new Date());
	const [returnDate, setReturnDate] = React.useState(new Date());
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {}, []);

  const editOrders = async (data, orderId) => {
    try {
      const res = await patchUpdateCartAPI({
				idCart: orderId,
				formData: data
			});
      if (res.status === 200) {
        setContentToast(res?.data);
        setSeverity('success');
        setOpenToast(true);
        setOpenDialog(false);
        getAllService();
      } else {
        setContentToast('Hệ thống đã cập nhật đơn hàng');
        setOpenToast(true);
        setSeverity('error');
      }
    } catch (error) {
      setContentToast('Cập nhật đơn hàng thất bại');
      setOpenToast(true);
      setSeverity('error');
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleEditUser = () => {
		if(!returnDate && !expectedDate) {
			setIsError(true)
		} else {
			setIsError(false)
			const data = {
				...(expectedDate ? {timeToDone: expectedDate}: null),
				...(returnDate ? {returnDate}: null)
			}
			editOrders(data, order?.id)
		}
	};

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Edit Orders</DialogTitle>
        <DialogContent>
          <DialogContent>
            <DialogContentText>Hãy nhập thời gian dự kiến xong đơn hàng</DialogContentText>
            <Box
              noValidate
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: '20px',
              }}
            >
              <DatePicker
                label="Select day"
								inputFormat="DD/MM/YYYY"
                value={expectedDate}
                minDate={new Date()}
                onChange={(newValue) => {
                  setExpectedDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
						<DialogContentText sx={{mt: 5}}>Hãy nhập thời gian hẹn khách hàng có thể quay lại</DialogContentText>
            <Box
              noValidate
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: '20px',
              }}
            >
              <DatePicker
                label="Return day"
								inputFormat="DD/MM/YYYY"
                value={returnDate}
                minDate={new Date()}
                sx={{
                  mt: '20px',
                }}
                onChange={(newValue) => {
                  setReturnDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
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
            Please enter as least one information
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditUser} type="submit">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
