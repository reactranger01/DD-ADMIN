import { combineReducers } from '@reduxjs/toolkit';
import ui from './modules/ui';
import betModule from './modules/bet';
import user from './modules/user';
import calculationModule from './modules/calculation';
import userBetsModule from './modules/userBets';

export default function createReducer() {
  const rootReducer = combineReducers({
    Adduser: betModule,
    calculation: calculationModule,
    userEventBets: userBetsModule,
    user: user,
    ui,
  });

  return rootReducer;
}
