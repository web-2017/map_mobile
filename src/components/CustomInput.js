import React from 'react'
import { TextInput, StyleSheet, Text, View } from 'react-native'

export const CustomInput = ({
	placeholder = '',
	value,
	setState,
	label,
	container,
	...style
}) => {
	return (
		<View style={{ ...styles.container, container }}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				clearButtonMode='always'
				placeholder={placeholder}
				value={value}
				style={{ ...styles.input, style }}
				onChangeText={setState}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		margin: 5,
	},
	label: {
		marginBottom: 5,
		fontWeight: 'bold',
	},
	input: {
		height: 40,
		borderWidth: 1,
		padding: 10,
		borderRadius: 6,
	},
})
