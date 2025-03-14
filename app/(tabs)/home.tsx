import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'

const home = () => {
  return (
    <SafeAreaView>
      <FlatList 
      data = {[{id: 1},{id: 2},{id: 3}]}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
         <Text>{item.id}</Text>
      )}
      ListHeaderComponent={() => (
        <View>
          <SearchInput
            placeholder="Search here !!"
            value=""
            handleChangeText={() => {}}
          />
          <View>
            {/* Horizontal scrolling view */}
            <Text>Latest Events</Text>
            <Trending posts={[{id: "image1 "},{id: "image 2"}]}/>
          </View>


        </View>
      )}
      // If list is empty it will show empty
      ListEmptyComponent={() => (
        <Text>Empty</Text>
      )
      }
      />
    <View>
      <Text>home</Text>
    </View>
    </SafeAreaView>
  )
}

export default home