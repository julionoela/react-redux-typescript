import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

/** interface User */
export interface User {
    id: string;
    name: string;
    email: string;
}

export interface UserState {
    loading: boolean,
    users: Array<User>,
    error: string|undefined
}

/** initialise the state value */
const initialState: UserState = {
    loading: false,
    users: [],
    error: undefined
}

/** function api call */
export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    () => {
      const res = fetch('https://jsonplaceholder.typicode.com/users').then(data => data.json());
      return res;
    }
)


/** create the slice */
export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<Array<User>>) => {
            state.loading = false;
            state.users = action.payload;
        });

        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.message;
        });
    }
});

/** export actions and state from the created slice */
export const userSelector = (state:RootState) => state.userReducer;

export default userSlice.reducer;