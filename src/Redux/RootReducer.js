import {  combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage'

import UserReducer from './User/UserReducer';


const persisConfig = {
    key:'root',
    storage,
}

const rootReducer = combineReducers({
    user:UserReducer,
})



export default persistReducer(persisConfig, rootReducer)