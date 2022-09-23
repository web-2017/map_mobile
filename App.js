import 'react-native-gesture-handler'
import { Provider, useSelector } from 'react-redux'
import { Button, View } from 'react-native'

import Container from './src/components/Container'
import Navigation from './src/routes/Navigation'
import PanelInfo from './src/components/PanelInfo'
import { store } from './src/redux/store'

export default function App() {
	return (
		<Provider store={store}>
			<Container>
				<Navigation />
				<PanelInfo />
			</Container>
		</Provider>
	)
}
