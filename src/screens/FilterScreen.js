import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	Button,
	ScrollView,
	View,
	TextInput,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useDispatch } from 'react-redux'

import { CustomInput } from '../components/CustomInput'
import { setFilter } from '../redux/reducers/searchSlice'

const FilterScreen = ({ navigation }) => {
	const [visible, setVisible] = useState(false)
	const [error, setError] = useState(false)
	const [from, setFrom] = useState('Chicago, Illinois')
	const [to, setTo] = useState('Buffalo Grove, Illinois')
	const [pallet, setPallet] = useState(1)
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(new Date())
	const [message, setMessage] = useState('')
	const [isStartDate, setIsStartDate] = useState(false)
	const [isEndDate, setIsEndDate] = useState(false)

	const dispatch = useDispatch()

	const RegNumbers = (value) => {
		if (!value) return
		return value && value?.toString().replace(/[^0-9]/g, '')
	}

	const fetchData = () => {
		if (!from || !to || !endDate || !startDate || !pallet) {
			setMessage('All fields are required!!!')
			setError(true)
			setVisible(true)
			setTimeout(() => {
				setError(false)
				setVisible(false)
				setMessage('')
			}, 5000)
			return
		}

		dispatch(
			setFilter({
				filter: {
					from,
					to,
					pallet,
					startDate,
					endDate,
				},
			})
		)
		navigation.navigate('Home')
	}

	const startDayHandler = (event, selectedDate) => {
		const currentDate = selectedDate
		// setIsStartDate(false)
		setStartDate(currentDate)
	}

	const endDayHandler = (event, selectedDate) => {
		const currentDate = selectedDate
		setEndDate(currentDate)
	}

	return (
		<ScrollView
			contentContainerStyle={{ flex: 1, backgroundColor: '#fff', padding: 10 }}
		>
			{visible && (
				<Text style={{ color: error ? 'red' : 'green', textAlign: 'center' }}>
					{message}
				</Text>
			)}

			<CustomInput
				label={'From'}
				value={from}
				placeholder='From'
				setState={(text) => setFrom(text)}
			/>
			<CustomInput
				label={'To'}
				value={to}
				placeholder='To'
				setState={(text) => setTo(text)}
			/>
			<CustomInput
				label={'How  many pallet?'}
				value={RegNumbers(pallet)}
				placeholder='How  many pallet'
				maxLength={3}
				setState={(text) => setPallet(text)}
			/>
			<View style={{ flexDirection: 'row' }}>
				<View style={{ flex: 1, padding: 5 }}>
					<Text style={{ marginBottom: 5, color: '#555', fontWeight: 'bold' }}>
						Start date{' '}
						{isStartDate && (
							<Text
								style={{ color: 'red' }}
								onPress={() => setIsStartDate(false)}
							>
								Close
							</Text>
						)}
					</Text>
					<TextInput
						style={{ height: 40, borderWidth: 1, padding: 10, borderRadius: 6 }}
						value={startDate ? startDate.toLocaleDateString() : startDate}
						placeholder='Start date'
						maxLength={3}
						onPressIn={() => setIsStartDate(!isStartDate)}
						onChangeText={(text) => setStartDate(text)}
						editable={false}
						selectTextOnFocus={false}
					/>
				</View>
				{isStartDate && (
					<DateTimePicker
						style={{ flex: 1 }}
						testID='dateTimePicker'
						value={startDate}
						mode={'date'}
						locale='es-ES'
						onChange={startDayHandler}
					/>
				)}
			</View>
			<View style={{ flexDirection: 'row' }}>
				<View style={{ flex: 1, padding: 5 }}>
					<Text style={{ marginBottom: 5, color: '#555', fontWeight: 'bold' }}>
						End day{' '}
						{isEndDate && (
							<Text
								style={{ color: 'red' }}
								onPress={() => setIsEndDate(false)}
							>
								Close
							</Text>
						)}
					</Text>
					<TextInput
						style={{ height: 40, borderWidth: 1, padding: 10, borderRadius: 6 }}
						value={endDate ? endDate.toLocaleDateString() : endDate}
						placeholder='End date'
						maxLength={3}
						onPressIn={() => setIsEndDate(!isEndDate)}
						onChangeText={(text) => setEndDate(text)}
						editable={false}
						selectTextOnFocus={false}
					/>
				</View>
				{isEndDate && (
					<DateTimePicker
						style={{ flex: 1 }}
						testID='dateTimePicker'
						value={endDate}
						mode={'date'}
						locale='es-ES'
						onChange={endDayHandler}
					/>
				)}
			</View>

			<Button title='Search' onPress={fetchData} />
		</ScrollView>
	)
}

const styles = StyleSheet.create({})

export default FilterScreen
