import React from 'react';
import { Loading } from '@/components';
import loadable from '../utils/loadable';

// Landing Page
export const Landing = loadable(() => import('./Landing'), {
  fallback: <Loading />,
});

// Static Pages
export const NotFound = loadable(() => import('./NotFound'), {
  fallback: <Loading />,
});
export const Layout = loadable(() => import('./Layout'), {
  fallback: <Loading />,
});

export const Login = loadable(() => import('./Login'), {
  fallback: <Loading />,
});
export const Dashboard = loadable(() => import('./Dashboard'), {
  fallback: <Loading />,
});
export const List = loadable(() => import('./List'), {
  fallback: <Loading />,
});
export const UserList = loadable(() => import('./List/userList'), {
  fallback: <Loading />,
});

export const MasterList = loadable(() => import('./List/masterList'), {
  fallback: <Loading />,
});
export const TransferList = loadable(() => import('./List/TransferList'), {
  fallback: <Loading />,
});
export const EventProfitlist = loadable(() => import('./reports/eventprofit'), {
  fallback: <Loading />,
});

export const DownlineProfitListreport = loadable(
  () => import('./reports/downlineprofit'),
  {
    fallback: <Loading />,
  },
);
export const Reports = loadable(() => import('./reports'), {
  fallback: <Loading />,
});

export const UserBanking = loadable(() => import('./Banking/userBanking'), {
  fallback: <Loading />,
});
export const MasterBankin = loadable(() => import('./Banking/masterBanking'), {
  fallback: <Loading />,
});

export const MarketAnalysis = loadable(() => import('./MarketAnalysis'), {
  fallback: <Loading />,
});
export const BetList = loadable(() => import('./BetList'), {
  fallback: <Loading />,
});

export const MyAccount = loadable(() => import('./MyAccount'), {
  fallback: <Loading />,
});

export const Commisson = loadable(() => import('./Commison'), {
  fallback: <Loading />,
});
export const PasswordHistory = loadable(() => import('./PasswordHistory'), {
  fallback: <Loading />,
});

export const RestoreUser = loadable(() => import('./RestoreUser'), {
  fallback: <Loading />,
});
export const Profile = loadable(() => import('./MyAccount/Profile'), {
  fallback: <Loading />,
});

export const AccountStatement = loadable(
  () => import('./MyAccount/AccountStatement'),
  {
    fallback: <Loading />,
  },
);
export const ActivityLog = loadable(() => import('./MyAccount/ActivityLog'), {
  fallback: <Loading />,
});

export const ProfitandLose = loadable(
  () => import('./MyAccount/ProfitandLosEvent'),
  {
    fallback: <Loading />,
  },
);
export const BetHistory = loadable(() => import('./MyAccount/BetHistory'), {
  fallback: <Loading />,
});

export const ProfitLoseEvent = loadable(
  () => import('./reports/profitLosePages/ProfitLoseEvent'),
  {
    fallback: <Loading />,
  },
);

export const ProfitLoseMarket = loadable(
  () => import('./reports/profitLosePages/ProfitLoseMarket'),
  {
    fallback: <Loading />,
  },
);
export const ProfitLoseUser = loadable(
  () => import('./reports/profitLosePages/ProfitLoseUser'),
  {
    fallback: <Loading />,
  },
);

export const BetHistoryMaster = loadable(
  () => import('./reports/profitLosePages/BetHistoryMaster'),
  {
    fallback: <Loading />,
  },
);
export const DownlineProfitLoseevent = loadable(
  () =>
    import('./reports/downlineprofit/Internalroutes/DownlineProfitLoseevent'),
  {
    fallback: <Loading />,
  },
);

export const DownlineProfitLoseMarket = loadable(
  () =>
    import('./reports/downlineprofit/Internalroutes/DownlineProfitLoseMarket'),
  {
    fallback: <Loading />,
  },
);
export const ProfileMaster = loadable(
  () => import('./MyAccountMaster/ProfileMaster'),
  {
    fallback: <Loading />,
  },
);

export const AccountStatementMaster = loadable(
  () => import('./MyAccountMaster/AccountSatementMaster'),
  {
    fallback: <Loading />,
  },
);
export const ActivityLogMaster = loadable(
  () => import('./MyAccountMaster/ActivityLogMaster'),
  {
    fallback: <Loading />,
  },
);
export const ProfileUser = loadable(
  () => import('./MyAccountUser/ProfileUser'),
  {
    fallback: <Loading />,
  },
);
export const BetListUser = loadable(
  () => import('./MyAccountUser/BetListUser'),
  {
    fallback: <Loading />,
  },
);

export const MyAccountMaster = loadable(() => import('./MyAccountMaster'), {
  fallback: <Loading />,
});
export const MyAccountUser = loadable(() => import('./MyAccountUser'), {
  fallback: <Loading />,
});

export const MasterData = loadable(
  () => import('./List/masterList/masterdata'),
  {
    fallback: <Loading />,
  },
);
export const Deposit = loadable(() => import('./Transaction/Deposit'), {
  fallback: <Loading />,
});

export const Withdrawal = loadable(() => import('./Transaction/Withdrawal'), {
  fallback: <Loading />,
});
export const MyAccountMasterUser = loadable(
  () => import('./MyAccountMasterUser'),
  {
    fallback: <Loading />,
  },
);

export const ProfileMasterUser = loadable(
  () => import('./MyAccountMasterUser/ProfileMasterUser'),
  {
    fallback: <Loading />,
  },
);
export const AccountAndQR = loadable(() => import('./AccountAndQR'), {
  fallback: <Loading />,
});

export const ManageQR = loadable(() => import('./AccountAndQR/manageQr'), {
  fallback: <Loading />,
});

export const ManageAccount = loadable(
  () => import('./AccountAndQR/ManageAccount'),
  {
    fallback: <Loading />,
  },
);
export const PasswordChangeAdmin = loadable(
  () => import('../components/PasswordChangePage'),
  {
    fallback: <Loading />,
  },
);

export const KycDetails = loadable(() => import('./KYC'), {
  fallback: <Loading />,
});
export const Market_Details = loadable(
  () => import('./MarketAnalysis/Market_Details'),
  {
    fallback: <Loading />,
  },
);

export const SoccerDetails = loadable(
  () => import('./MarketAnalysis/Soccer-Details'),
  {
    fallback: <Loading />,
  },
);
export const TennisDetails = loadable(
  () => import('./MarketAnalysis/tennis-Details'),
  {
    fallback: <Loading />,
  },
);

export const ProfitLossMaster = loadable(
  () => import('./MyAccountMasterUser/ProfitLossMaster'),
  {
    fallback: <Loading />,
  },
);
export const BetHistorymasterUser = loadable(
  () => import('./MyAccountMasterUser/BetHistorymasterUser'),
  {
    fallback: <Loading />,
  },
);

export const ProfitLoseUserNew = loadable(
  () => import('./reports/profitLosePages/ProfitLoseUserNew'),
  {
    fallback: <Loading />,
  },
);

export const BetHistoryMasterNew = loadable(
  () => import('./reports/profitLosePages/BetHistoryMasterNew'),
  {
    fallback: <Loading />,
  },
);
export const DownlineProfitSports = loadable(
  () => import('./reports/downlineprofit/DownlineProfitSports'),
  {
    fallback: <Loading />,
  },
);

export const DownlineProfitSportsUser = loadable(
  () => import('./reports/downlineprofit/DownlineProfitSportsUser'),
  {
    fallback: <Loading />,
  },
);
export const DownlineProfitCasinoAviator = loadable(
  () => import('./reports/downlineprofit/DownlineProfitCasinoAviator'),
  {
    fallback: <Loading />,
  },
);

export const DownlineProfitCasinoAviatorUser = loadable(
  () => import('./reports/downlineprofit/DownlineProfitCasinoAviatorUser'),
  {
    fallback: <Loading />,
  },
);
export const MyAccountUserAviator = loadable(
  () => import('./MyAccountUserAviator'),
  {
    fallback: <Loading />,
  },
);

export const ProfileUserAviator = loadable(
  () => import('./MyAccountUserAviator/ProfileUserAviator'),
  {
    fallback: <Loading />,
  },
);

export const AccountStatementUserAviator = loadable(
  () => import('./MyAccountUserAviator/AccountStatementUserAviator'),
  {
    fallback: <Loading />,
  },
);
export const ActivityLogUserAviator = loadable(
  () => import('./MyAccountUserAviator/ActivityLogUserAviator'),
  {
    fallback: <Loading />,
  },
);

export const BetListUserAviator = loadable(
  () => import('./MyAccountUserAviator/BetListUserAviator'),
  {
    fallback: <Loading />,
  },
);
export const ProfitLossUserAviator = loadable(
  () => import('./MyAccountUserAviator/ProfitLossUserAviator'),
  {
    fallback: <Loading />,
  },
);

export const DownlineProfitLoseCasinoAviatorMarket = loadable(
  () =>
    import(
      './reports/downlineprofit/Internalroutes/DownlineProfitLoseCasinoAviatorMarket'
    ),
  {
    fallback: <Loading />,
  },
);
export const DownlineProviderGamesCasinoAviator = loadable(
  () =>
    import(
      './reports/downlineprofit/Internalroutes/DownlineProviderGamesCasinoAviator'
    ),
  {
    fallback: <Loading />,
  },
);

export const ProfitLoseCasinoAviator = loadable(
  () => import('./reports/profitLosePages/ProfitLoseCasinoAviator'),
  {
    fallback: <Loading />,
  },
);

export const ProfitLossUser = loadable(
  () => import('./MyAccountUser/ProfitLossUser'),
  {
    fallback: <Loading />,
  },
);

export const ActivityLogUser = loadable(
  () => import('./MyAccountUser/ActivityLogUser'),
  {
    fallback: <Loading />,
  },
);
export const Events = loadable(() => import('./Events'), {
  fallback: <Loading />,
});
export const ManageMobile = loadable(() => import('./ManageMobile'), {
  fallback: <Loading />,
});
export const DownloadCSV = loadable(() => import('../components/DownloadCSV'), {
  fallback: <Loading />,
});
/*
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import List from './containers/List';
import UserList from './containers/List/userList';
import MasterList from './containers/List/masterList';
import EventProfitlist from './containers/reports/eventprofit';
import DownlineProfitListreport from './containers/reports/downlineprofit';
import Reports from './containers/reports';
import UserBanking from './containers/Banking/userBanking';
import MasterBankin from './containers/Banking/masterBanking';
import MarketAnalysis from './containers/MarketAnalysis';
import BetList from './containers/BetList';
import MyAccount from './containers/MyAccount';
import Commisson from './containers/Commison';
import PasswordHistory from './containers/PasswordHistory';
import RestoreUser from './containers/RestoreUser';
import Profile from './containers/MyAccount/Profile';
import AccountStatement from './containers/MyAccount/AccountStatement';
import ActivityLog from './containers/MyAccount/ActivityLog';
import ProfitandLose from './containers/MyAccount/ProfitandLosEvent';
import BetHistory from './containers/MyAccount/BetHistory';
import ProfitLoseEvent from './containers/reports/profitLosePages/ProfitLoseEvent';
import ProfitLoseMarket from './containers/reports/profitLosePages/ProfitLoseMarket';
import ProfitLoseUser from './containers/reports/profitLosePages/ProfitLoseUser';
import BetHistoryMaster from './containers/reports/profitLosePages/BetHistoryMaster';
import Layout from './containers/Layout';
import PrivateRoute from './containers/auth/PrivateRoute';
import DownlineProfitLoseevent from './containers/reports/downlineprofit/Internalroutes/DownlineProfitLoseevent';
import DownlineProfitLoseMarket from './containers/reports/downlineprofit/Internalroutes/DownlineProfitLoseMarket';
import ProfileMaster from './containers/MyAccountMaster/ProfileMaster';
import AccountStatementMaster from './containers/MyAccountMaster/AccountSatementMaster';
import ActivityLogMaster from './containers/MyAccountMaster/ActivityLogMaster';
import ProfileUser from './containers/MyAccountUser/ProfileUser';
import AccountStatementUser from './containers/MyAccountUser/AccountStatementUser';
import ActivityLogUser from './containers/MyAccountUser/ActivityLogUser';
import ProfitLossUser from './containers/MyAccountUser/ProfitLossUser';
import BetListUser from './containers/MyAccountUser/BetListUser';
import MyAccountMaster from './containers/MyAccountMaster';
import MyAccountUser from './containers/MyAccountUser';
import MasterData from './containers/List/masterList/masterdata';
import Deposit from './containers/Transaction/Deposit';
import Withdrawal from './containers/Transaction/Withdrawal';
import MyAccountMasterUser from './containers/MyAccountMasterUser';
import ProfileMasterUser from './containers/MyAccountMasterUser/ProfileMasterUser';
import AccountAndQR from './containers/AccountAndQR';
import ManageQR from './containers/AccountAndQR/manageQr';
import ManageAccount from './containers/AccountAndQR/ManageAccount';
import PasswordChangeAdmin from './components/PasswordChangePage';
import KycDetails from './containers/KYC/index';
import Market_Details from './containers/MarketAnalysis/Market_Details';
import SoccerDetails from './containers/MarketAnalysis/Soccer-Details/Index';
import TennisDetails from './containers/MarketAnalysis/tennis-Details/Index';
import ProfitLossMaster from './containers/MyAccountMasterUser/ProfitLossMaster';
import BetHistorymasterUser from './containers/MyAccountMasterUser/BetHistorymasterUser';
import ProfitLoseUserNew from './containers/reports/profitLosePages/ProfitLoseUserNew';
import BetHistoryMasterNew from './containers/reports/profitLosePages/BetHistoryMasterNew';
import DownlineProfitSports from './containers/reports/downlineprofit/DownlineProfitSports';
import DownlineProfitSportsUser from './containers/reports/downlineprofit/DownlineProfitSportsUser';
import DownlineProfitCasinoAviator from './containers/reports/downlineprofit/DownlineProfitCasinoAviator';
import DownlineProfitCasinoAviatorUser from './containers/reports/downlineprofit/DownlineProfitCasinoAviatorUser';
import MyAccountUserAviator from './containers/MyAccountUserAviator';
import ProfileUserAviator from './containers/MyAccountUserAviator/ProfileUserAviator';
import AccountStatementUserAviator from './containers/MyAccountUserAviator/AccountStatementUserAviator';
import ActivityLogUserAviator from './containers/MyAccountUserAviator/ActivityLogUserAviator';
import BetListUserAviator from './containers/MyAccountUserAviator/BetListUserAviator';
import ProfitLossUserAviator from './containers/MyAccountUserAviator/ProfitLossUserAviator';
import DownlineProfitLoseCasinoAviatorMarket from './containers/reports/downlineprofit/Internalroutes/DownlineProfitLoseCasinoAviatorMarket';
import DownlineProviderGamesCasinoAviator from './containers/reports/downlineprofit/Internalroutes/DownlineProviderGamesCasinoAviator';
import ProfitLoseCasinoAviator from './containers/reports/profitLosePages/ProfitLoseCasinoAviator';

*/
