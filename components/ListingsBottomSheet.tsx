import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { Listing } from '@/types/types'
import BottomSheet from '@gorhom/bottom-sheet'
import Listings from './Listings'
import Colors from '@/constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

interface Props {
  listings: Listing[]
  category: string
}

const ListingsBottomSheet = ({ listings, category }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['10%', '100%'], [])
  const [refresh, setRefresh] = useState(0)

  const showMap = () => {
    bottomSheetRef.current?.collapse()
    setRefresh(refresh + 1)
  }

  return (
    <BottomSheet
      index={1}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      enablePanDownToClose={false}
      style={styles.sheetContainer}
    >
      <View style={{ flex: 1 }}>
        <Listings refresh={refresh} listings={listings} category={category} />
        <View style={styles.absoluteBtn}>
          <TouchableOpacity onPress={showMap} style={styles.btn}>
            <Text style={{ fontFamily: 'mon-sb', color: '#fff' }}>Map</Text>
            <Ionicons
              name='map'
              size={20}
              style={{ fontFamily: 'mon-sb', color: '#fff' }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  absoluteBtn: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center'
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 16,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
  sheetContainer: {
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1
    }
  }
})

export default ListingsBottomSheet
