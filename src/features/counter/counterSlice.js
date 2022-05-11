import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

const initialState = {
user:null,
isLoggedIn:false
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state,action) => {

      state.user=action.payload

      
    },
    logout: (state) => {
      state.user=null
    
    },
    register:(state,action)=>{
      state.user=action.payload
 
    }

  },

});

export const { login, logout,register } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user.user;



export default userSlice.reducer;
