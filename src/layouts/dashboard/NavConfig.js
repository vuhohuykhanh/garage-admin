// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  //  {
  //    title: 'dashboard',
  //    path: '/dashboard/app',
  //    icon: getIcon('eva:pie-chart-2-fill'),
  //  },
  {
    title: 'User',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Accessory',
    path: '/dashboard/accessory',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Service',
    path: '/dashboard/service',
    icon: getIcon('eva:lock-fill'),
  },
	{
		title: 'Sale',
		path: '/dashboard/sale',
		icon: getIcon('eva:file-text-fill'),
	},
  {
    title: 'Order',
    path: '/dashboard/order',
    icon: getIcon('eva:alert-triangle-fill'),
  },
  {
    title: 'Bill',
    path: '/dashboard/bill',
    icon: getIcon('eva:person-add-fill'),
  },
  //  {
  //    title: 'Not found',
  //    path: '/404',
  //    icon: getIcon('eva:alert-triangle-fill'),
  //  },
];

export default navConfig;
