import { createSlice } from '@reduxjs/toolkit';
import { notesList } from '../../staticData/noteList';

const initialState = {
  notesList: notesList
};


export const noteSlice = createSlice({
  name: 'note',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addnote: (state, action) => {
			var findIndex = state.notesList.findIndex(x => x.email === action.payload.email);
			if (findIndex !== -1) {
				state.notesList[findIndex].name = action.payload.name;
				state.notesList[findIndex].email = action.payload.email;
				state.notesList[findIndex].description = action.payload.description;
				return;
			}
      state.notesList.push(action.payload);
    },
		updatenote: (state, action) => {
			var findIndex = state.notesList.findIndex(x => x.id === action.payload.id);
			if (findIndex !== -1) {
				state.notesList[findIndex].name = action.payload.name;
				state.notesList[findIndex].email = action.payload.email;
				state.notesList[findIndex].description = action.payload.description;
				return;
			}
    },
		deletenote: (state, action) => {
			state.notesList = state.notesList.filter(x => x.id !== action.payload.id); 
    },
  },
});

export const { addnote, deletenote, updatenote } = noteSlice.actions;

export const selectCount = (state) => state.note.notesList;

export default noteSlice.reducer;
