import { createSlice } from '@reduxjs/toolkit';
import { initialValue } from './InitialValue';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { nanoid } from 'nanoid';

const initialState = {
  items: initialValue,
  filter: '',
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer: (state, { payload }) => {
        state.items.push(payload);
      },
      prepare: ({ name, number }) => {
        const id = nanoid();
        return { payload: { name, number, id } };
      },
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

export const persistContactReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContacts, filterContacts } =
  contactsSlice.actions;
