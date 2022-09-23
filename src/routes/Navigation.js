import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import FilterScreen from '../screens/FilterScreen'
import HomeScreen from '../screens/HomeScreen'

const Stack = createNativeStackNavigator()

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Home'>
				<Stack.Screen
					name='Home'
					options={{ headerShown: true, headerTitle: 'Home' }}
					component={HomeScreen}
				/>
				<Stack.Screen
					name='Filter'
					options={{ headerShown: true, headerTitle: 'Calculate total amount' }}
					component={FilterScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
