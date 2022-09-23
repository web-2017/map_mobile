import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { useSelector } from 'react-redux'

import Map from '../components/Map'

const HomeScreen = ({ navigation }) => {
	const [coords, setCoords] = useState('')
	const filterHandler = () => {
		navigation.navigate('Filter')
	}

	const { filter } = useSelector((state) => state.filter)
	console.log(filter)

	return (
		<View>
			<Button
				title='Filter'
				color='#841584'
				onPress={filterHandler}
				type='contained'
			/>
			<Map coords={coords} setCoords={setCoords} />
		</View>
	)
}

export default HomeScreen
