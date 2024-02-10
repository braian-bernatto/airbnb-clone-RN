import { View, Text, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { Feature, ListingGeoLocation } from '@/types/types'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { defaultStyles } from '@/constants/Styles'
import { useRouter } from 'expo-router'
import MapView from 'react-native-map-clustering'

interface Props {
  listings: ListingGeoLocation
}

const INITIAL_REGION = {
  latitude: 52.520008,
  longitude: 13.404954,
  latitudeDelta: 9,
  longitudeDelta: 9
}

const ListingsMap = memo(({ listings }: Props) => {
  const router = useRouter()
  const onMarkerSelected = (item: Feature) => {
    router.push(`/listing/${item.properties.id}`)
  }

  const renderClusterFn = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster
    const points = properties.point_count
    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        // style={{ flex: 1 }}
        coordinate={{
          latitude: geometry.coordinates[0],
          longitude: geometry.coordinates[1]
        }}
      >
        <View style={styles.container}>
          <View style={styles.marker}>
            <Text style={styles.markerText}>TEMBOLO</Text>
          </View>
        </View>
      </Marker>
    )
  }

  return (
    <View style={defaultStyles.container}>
      <MapView
        animationEnabled={false}
        initialRegion={INITIAL_REGION}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        clusterColor='#fff'
        clusterTextColor='#000'
        clusterFontFamily='mon-sb'
        // renderCluster={renderClusterFn}
      >
        {listings?.features?.map((item: Feature) => (
          <Marker
            key={item.properties.id}
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude
            }}
            onPress={() => onMarkerSelected(item)}
          >
            <View style={styles.container}>
              <View style={styles.marker}>
                <Text style={styles.markerText}>$ {item.properties.price}</Text>
              </View>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  marker: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 4
    }
  },
  markerText: {
    fontSize: 14,
    fontFamily: 'mon-sb'
  }
})

export default ListingsMap
