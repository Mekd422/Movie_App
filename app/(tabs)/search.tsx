import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'

const search = () => {
  const router = useRouter();

  const {
    data: movies, 
    loading: Loading, 
    error: Error} = useFetch(() => fetchMovies({
      query: ''
    }))
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0 
      ' resizeMode='cover'/>
      <FlatList 
      data={movies}
      renderItem={({item}) => <MovieCard {... item}/>}
      keyExtractor={(item) => item.id.toString()} 
      
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "center",
              gap: 16,
              marginVertical: 16
            }}
            className="px-5"
            contentContainerStyle={{paddingBottom: 100}}
            ListHeaderComponent={
              <>
              <View className='w-full flex-row justify-center mt-20
              items-center'>
                <Image source={icons.logo} className='w-12 h-10'/>
              </View>
              <View className='my-5'>
                <SearchBar placeholder='search movies...'/>
              </View>
              {Loading && (
                <ActivityIndicator size="large" color="#0000ff"
                className='my-3'/>
              )}

              {Error && (
                <Text className='text-red-500 px-5 my-3'>
                  Error: {Error.message}
                </Text>
              )}
              </>
            }
            />
      
    </View>
  )
}

export default search