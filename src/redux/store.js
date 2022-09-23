import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import searchSlice from './reducers/searchSlice'
import postSlice from './reducers/postSlice'

export const store = configureStore({
	reducer: {
		filter: searchSlice,
		post: postSlice,
	},
	middleware: [
		...getDefaultMiddleware({
			serializableCheck: false,
		}),
	],
})
