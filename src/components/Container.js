import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet } from 'react-native'

const Container = ({ children, style }) => {
	return (
		<View style={{ ...styles.container, ...style }}>
			<StatusBar />
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
})

export default Container
