import './i18n';
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './containers/auth/PrivateRoute';
import {
  AccountStatement,
  AccountStatementMaster,
  ActivityLog,
  ActivityLogMaster,
  BetHistory,
  BetHistoryMaster,
  BetHistorymasterUser,
  BetList,
  BetListUser,
  Commisson,
  Dashboard,
  DownlineProfitCasinoAviator,
  DownlineProfitCasinoAviatorUser,
  DownlineProfitListreport,
  DownlineProfitLoseMarket,
  DownlineProfitLoseevent,
  DownlineProfitSports,
  DownlineProfitSportsUser,
  EventProfitlist,
  Layout,
  List,
  Login,
  MarketAnalysis,
  MasterBankin,
  MasterData,
  MasterList,
  MyAccount,
  MyAccountMaster,
  MyAccountMasterUser,
  MyAccountUser,
  PasswordHistory,
  Profile,
  ProfileMaster,
  ProfileMasterUser,
  ProfileUser,
  ProfitLoseEvent,
  ProfitLoseMarket,
  ProfitLoseUser,
  ProfitLossMaster,
  ProfitandLose,
  Reports,
  RestoreUser,
  UserBanking,
  UserList,
  ActivityLogUser,
  ProfitLossUser,
  MyAccountUserAviator,
  ProfileUserAviator,
  AccountStatementUserAviator,
  DownlineProfitLoseCasinoAviatorMarket,
  ProfitLoseUserNew,
  ProfitLoseCasinoAviator,
  BetHistoryMasterNew,
  Deposit,
  Withdrawal,
  AccountAndQR,
  ManageQR,
  ManageAccount,
  PasswordChangeAdmin,
  KycDetails,
  Market_Details,
  SoccerDetails,
  TennisDetails,
  ProfitLossUserAviator,
  BetListUserAviator,
  ActivityLogUserAviator,
  DownlineProviderGamesCasinoAviator,
  Events,
  ManageMobile,
  TransferList,
} from './containers/pageListAsync';
import AccountStatementUser from './containers/MyAccountUser/AccountStatementUser';
import NetExposure from './containers/RiskManagement/NetExposure';
import NetExposureUserBet from './containers/RiskManagement/NetExposureUserBet';
import NetExposureView from './containers/RiskManagement/NetExposureView';
import SessionNetExposureView from './containers/RiskManagement/SessionNetExposureView';
import NetExposureViewUser from './containers/RiskManagement/UserNetExposuseTbales/NetExposureViewUser';
import NetExposureUserPoints from './containers/RiskManagement/NetExposureUserPoints';
import SessionNetExposureUserPoints from './containers/RiskManagement/SessionNetExposureUserPoints';
import WorkStation from './containers/RiskManagement/WorkStation';
import SessionWorkStation from './containers/RiskManagement/SessionWorkStation';
import SessionNetExposureViewUser from './containers/RiskManagement/UserNetExposuseTbales/SessionNetExposureViewUser';

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          limit={1}
          ProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          // pauseOnFocusLoss
          draggable
          // pauseOnHover
          theme="colored"
        />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>

        <Routes>
          {/* <Route path="/" element={<Landing />} />
          <Route path="/*" element={<NotFound />} /> */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            {' '}
            <Route index element={<Dashboard />} />
            <Route path="/list" element={<List />}>
              <Route path="user_list" element={<UserList />} />
              <Route path="master_list" element={<MasterList />} />
              <Route path="master_data/:id/:path" element={<MasterData />} />
              <Route path="transfer_list" element={<TransferList />} />
            </Route>
            <Route path="/net-exposure" element={<NetExposure />} />
            <Route
              path="/net_exposure-user-bets/:userId"
              element={<NetExposureUserBet />}
            />
            <Route path="/net_exposure_View" element={<NetExposureView />} />
            <Route
              path="/session_net_exposure_View"
              element={<SessionNetExposureView />}
            />
            <Route
              path="/net_exposure_View_user"
              element={<NetExposureViewUser />}
            />
            <Route
              path="/session_net_exposure_View_user"
              element={<SessionNetExposureViewUser />}
            />
            <Route
              path="/net_exposure_userpoints"
              element={<NetExposureUserPoints />}
            />
            <Route
              path="/session_net_exposure_userpoints"
              element={<SessionNetExposureUserPoints />}
            />
            <Route path="/workstation" element={<WorkStation />} />
            <Route
              path="/session_workstation"
              element={<SessionWorkStation />}
            />
            <Route path="report" element={<Reports />}>
              <Route path="event_profit" element={<EventProfitlist />} />
              <Route
                path="downline_profit"
                element={<DownlineProfitListreport />}
              />
              <Route
                path="downline-profit-sports/:path/:usetype/:startDate/:endDate"
                element={<DownlineProfitSports />}
              />
              <Route
                path="downline-profit-sports-user/:path/:usetype"
                element={<DownlineProfitSportsUser />}
              />
              <Route
                path="downline-profit-casino-aviator/:path/:usetype/:startDate/:endDate"
                element={<DownlineProfitCasinoAviator />}
              />
              <Route
                path="downline-profit-casino-aviator-user/:path/:usetype"
                element={<DownlineProfitCasinoAviatorUser />}
              />
            </Route>
            <Route path="/user_banking" element={<UserBanking />} />
            <Route path="/master_banking" element={<MasterBankin />} />
            <Route path="/market_analysis" element={<MarketAnalysis />} />
            <Route path="/bet_list" element={<BetList />} />
            <Route path="/events" element={<Events />} />
            <Route path="/myaccount" element={<MyAccount />}>
              <Route index element={<Profile />} />
              <Route path="account_statement" element={<AccountStatement />} />
              <Route path="activity_log" element={<ActivityLog />} />
              <Route path="profit_lose" element={<ProfitandLose />} />
              <Route path="bet_history" element={<BetHistory />} />
            </Route>
            <Route path="/master_account/:id" element={<MyAccountMaster />}>
              <Route index element={<ProfileMaster />} />
              <Route
                path="account_statement"
                element={<AccountStatementMaster />}
              />
              <Route path="activity_log" element={<ActivityLogMaster />} />
            </Route>
            <Route
              path="/master_user_account/:id"
              element={<MyAccountMasterUser />}
            >
              <Route index element={<ProfileMasterUser />} />
              <Route
                path="account_statement"
                element={<AccountStatementMaster />}
              />
              <Route path="activity_log" element={<ActivityLogMaster />} />
              <Route path="profit_lose" element={<ProfitLossMaster />} />
              <Route path="bet_history" element={<BetHistorymasterUser />} />
            </Route>
            <Route path="/user_account/:id" element={<MyAccountUser />}>
              <Route index element={<ProfileUser />} />
              <Route
                path="account_statement"
                element={<AccountStatementUser />}
              />
              <Route
                path="downline_profitlose_event/:startDate/:endDate"
                element={<DownlineProfitLoseevent />}
              />
              <Route
                path="downline_profitlose_market/:startDate/:endDate"
                element={<DownlineProfitLoseMarket />}
              />
              <Route path="profit_lose" element={<ProfitLossUser />} />
              <Route path="bet_history" element={<BetListUser />} />
              <Route path="activity_log" element={<ActivityLogUser />} />
            </Route>
            <Route
              path="/user_account_aviator/:id"
              element={<MyAccountUserAviator />}
            >
              <Route index element={<ProfileUserAviator />} />
              <Route
                path="account_statement"
                element={<AccountStatementUserAviator />}
              />
              <Route
                path="downline_profitlose_event"
                element={<DownlineProfitLoseevent />}
              />
              <Route
                path="downline_profitlose_casinoaviator_market/:startDate/:endDate"
                element={<DownlineProfitLoseCasinoAviatorMarket />}
              />
              <Route
                path="downline_proividergames_casinoaviator/:startDate/:endDate"
                element={<DownlineProviderGamesCasinoAviator />}
              />
              <Route path="profit_lose" element={<ProfitLossUserAviator />} />
              <Route path="bet_history" element={<BetListUserAviator />} />
              <Route path="activity_log" element={<ActivityLogUserAviator />} />
            </Route>
            <Route path="/commission" element={<Commisson />} />
            <Route path="/password_history" element={<PasswordHistory />} />
            <Route path="/restore_user" element={<RestoreUser />} />
            {/* <Route path='/market_analysis' element{<MarketAnalysis/>}/> */}
            <Route
              path="/plEvent/:id/LIVE/master/:startDate/:endDate"
              element={<ProfitLoseEvent />}
            />
            <Route
              path="/report_plMarket/:gameid/:eventid/master/:startDate/:endDate"
              element={<ProfitLoseMarket />}
            />
            <Route
              path="/report_plUser/:eventid/:market/:startDate/:endDate"
              element={<ProfitLoseUser />}
            />
            <Route
              path="/report_plUsers/:eventid/:market/:startDate/:endDate"
              element={<ProfitLoseUserNew />}
            />
            <Route
              path="/report_plCasinoAviator/:eventid/:market/:startDate/:endDate"
              element={<ProfitLoseCasinoAviator />}
            />
            <Route
              path="/report_eventprofit_bethistory/:username/:market/:eventid/:startDate/:endDate"
              element={<BetHistoryMaster />}
            />
            <Route
              path="/report_eventprofit_bet_history/:username/:market/:eventid/:startDate/:endDate"
              element={<BetHistoryMasterNew />}
            />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
            <Route path="/support" element={<ManageMobile />} />
            <Route path="/account_and_qr" element={<AccountAndQR />}>
              <Route index element={<ManageQR />} />
              <Route path="manage_account" element={<ManageAccount />} />
            </Route>
            <Route
              path="/change_password_admin"
              element={<PasswordChangeAdmin />}
            />
            <Route path="/kyc_details" element={<KycDetails />} />
            <Route
              path="/market-details-cricket/:eventId"
              element={<Market_Details />}
            />
            <Route
              path="/market-details-soccer/:eventId"
              element={<SoccerDetails />}
            />
            <Route
              path="/market-details-tennis/:eventId"
              element={<TennisDetails />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
