import { View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import listingsData from '@/assets/data/airbnb-listings.json'
import ListingsMap from '@/components/ListingsMap'
import ListingsDataGeo from '@/assets/data/airbnb-listings.geo.json'
import ListingsBottomSheet from '@/components/ListingsBottomSheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Page = () => {
  const items = useMemo(() => listingsData as any, [])
  const [category, setCategory] = useState('Tiny homes')
  const onDataChanged = (category: string) => {
    setCategory(category)
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop: 80 }}>
        <Stack.Screen
          options={{
            header: () => <ExploreHeader onCategoryChanged={onDataChanged} />
          }}
        />
        <ListingsMap listings={ListingsDataGeo} />
        <ListingsBottomSheet listings={items} category={category} />
      </View>
    </GestureHandlerRootView>
  )
}

export default Page
