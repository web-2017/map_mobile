import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import { useSelector } from 'react-redux'

const PanelInfo = () => {
	const [visible, setVisible] = useState(false)
	const [palletPerDay, setPalletPerDay] = useState('')
	const [deliveryPallet, setDeliveryPallet] = useState('')
	const [costPerPallet, setCostPerPallet] = useState('')
	const [totalDays, setTotalDays] = useState('')
	const [total, setTotal] = useState('')
	const [distance, setDistance] = useState('')
	const { post } = useSelector((state) => state)
	console.log('post', post)
	useEffect(() => {
		if (post?.total) {
			setVisible(true)
			setPalletPerDay(post?.palletPerDay)
			setDeliveryPallet(post?.deliveryPallet)
			setCostPerPallet(post?.costPerPallet)
			setTotalDays(post?.totalDays)
			setTotal(post?.total)
			setDistance(post?.distance)
		}
	}, [post])

	return (
		<View style={{ ...styles.panel, bottom: visible ? 0 : -1000 }}>
			<View style={{ backgroundColor: '#ffffff', padding: 20 }}>
				<Text style={{ ...styles.text, ...styles.title }}>Info:</Text>
				<Text style={styles.text}>Cost for pallet: {palletPerDay} $</Text>
				<Text style={styles.text}>Cost for delivery: {deliveryPallet} $</Text>
				<Text style={styles.text}>Your cost per pallet: {costPerPallet} $</Text>
				<Text style={styles.text}>Your total days: {totalDays}</Text>
				<Text style={styles.text}>Your distance: {distance} km</Text>
				<Text style={styles.text}>Total: {total} $</Text>
				<Button title='Close' onPress={() => setVisible(false)} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	panel: {
		position: 'absolute',
		padding: 20,
		backgroundColor: '#d3815295',
		width: '100%',
		height: 300,
	},
	title: {
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: 10,
		fontStyle: 'normal',
	},
	text: {
		fontSize: 18,
		fontStyle: 'italic',
	},
})

export default PanelInfo
