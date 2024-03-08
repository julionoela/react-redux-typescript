import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
/** interface User */
export interface User {
    id: string;
    name: string;
    email: string;
}

/** initialise the state value */
const initialState: Array<User> = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@test.com',
    }
]

/** create the slice */
export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.push(action.payload);
        }
    }
});

/** export actions and state from the created slice */
export const {addUser} = userSlice.actions
export const userSelector = (state:RootState) => state.userReducer;

export default userSlice.reducer;