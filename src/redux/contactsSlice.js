import { createSlice } from '@reduxjs/toolkit';
import { initialValue } from './InitialValue';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
  items: initialValue,
  filter: '',
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, { payload }) {
      state.items.push(payload);
    },
    deleteContacts(state, { payload }) {
      state.items = state.items.filter(({ id }) => id !== payload);
    },
    filterContacts(state, { payload }) {
      state.filter = payload;
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
  blacklist: ['filter'],
};

export const getContacts = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;

export const persistContactReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContacts, filterContacts } =
  contactsSlice.actions;
