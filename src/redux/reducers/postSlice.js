import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	costDeliveryPerMile: '',
	costPerPallet: '',
	deliveryPallet: '',
	palletPerDay: '',
	totalDays: '',
	distance: '',
	total: '',
}

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		setPost: (state, action) => {
			console.log('setPost', action.payload)
			return {
				...state,
				...action.payload,
			}
		},
	},
})

// Action creators are generated for each case reducer function
export const { setPost } = postSlice.actions

export default postSlice.reducer
