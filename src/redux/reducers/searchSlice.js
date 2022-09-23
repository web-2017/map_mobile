import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	filter: {
		from: '',
		to: '',
		startDate: '',
		endDate: '',
		pallet: '',
	},
}

export const searchSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setFilter: (state, action) => {
			console.log(action.payload)
			return {
				...state.filter,
				...action.payload.filter,
			}
		},
	},
})

// Action creators are generated for each case reducer function
export const { setFilter } = searchSlice.actions

export default searchSlice.reducer
