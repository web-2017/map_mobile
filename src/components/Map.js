import { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, TextInput, Dimensions, Button } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { useDispatch, useSelector } from 'react-redux'

const { width, height } = Dimensions.get('window')

import { GOOGLE_KEY } from '../utils/keys'
import { apiRoutes } from '../api/apiRoutes'
import { setPost } from '../redux/reducers/postSlice'

const ASPECT_RATIO = width / height
const LATITUDE = 37.771707
const LONGITUDE = -122.4053769
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const Map = () => {
	const [value, setValue] = useState('')
	const mapRef = useRef()
	const [initialRegion, setInitialRegion] = useState({
		latitude: LATITUDE,
		longitude: LONGITUDE,
		latitudeDelta: LATITUDE_DELTA,
		longitudeDelta: LONGITUDE_DELTA,
	})
	const [origin, setOrigin] = useState('Chicago')
	const [destination, setDestination] = useState('Buffalo Grove')
	const [distance, setDistance] = useState('')

	const { filter } = useSelector((state) => state)
	const dispatch = useDispatch()

	useEffect(() => {
		fetchData()
		setOrigin(filter.from)
		setDestination(filter.to)
	}, [filter])

	const fetchData = async () => {
		console.log('MAP', filter)
		try {
			const response = await fetch(`${apiRoutes.calculateRoute}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					from: filter?.from,
					to: filter?.to,
					pallet: filter?.pallet,
					startDate: filter?.startDate,
					endDate: filter?.endDate,
					distance,
				}),
			})

			const data = await response.json()
			console.log('success', data)

			dispatch(setPost({ ...data }))

			console.log(data)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<MapView
			ref={mapRef}
			// provider={PROVIDER_GOOGLE}
			style={styles.map}
			zoomControlEnabled={true}
			initialRegion={initialRegion}
		>
			{/* {coords.map((elem, i) => (
				<Marker key={i} coordinate={elem} />
			))} */}

			<MapViewDirections
				mode='DRIVING'
				origin={origin}
				// waypoints={coords.length > 2 ? coords.slice(1, -1) : undefined}
				destination={destination}
				apikey={GOOGLE_KEY}
				strokeWidth={3}
				strokeColor='hotpink'
				optimizeWaypoints={true}
				onStart={(params) => {
					console.log(
						`Started routing between "${params.origin}" and "${params.destination}"`
					)
				}}
				onReady={(result) => {
					setDistance(result.distance)
					console.log(`Distance: ${result.distance} km`)
					console.log(`Duration: ${result.duration} min.`)

					mapRef.current.fitToCoordinates(result.coordinates, {
						edgePadding: {
							right: width / 20,
							bottom: height / 20,
							left: width / 20,
							top: height / 20,
						},
					})
				}}
				onError={(errorMessage) => {
					console.log('GOT AN ERROR', errorMessage)
				}}
			/>
		</MapView>
	)
}

const styles = StyleSheet.create({
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
})

export default Map
