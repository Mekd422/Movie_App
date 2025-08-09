import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const {
    data: movies, 
    loading: Loading, 
    error: Error,
    refetch: loadMovies,
    reset
  } = useFetch(() => fetchMovies({
      query: searchQuery
    }), false) 

  useEffect(() => {
    const func = async () => {
      if(searchQuery.trim()){
        await loadMovies();
      }else{
        reset()
      }
    }

    func();

  }, [searchQuery])
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0 
      ' resizeMode='cover'/>
      <FlatList 
      data={movies}
      renderItem={({item}) => <MovieCard {... item} />}
      keyExtractor={(item) => item.id.toString()} 
      
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "center",
              gap: 16,
              marginVertical: 16
            }}
            
            contentContainerStyle={{paddingBottom: 100}}
            ListHeaderComponent={
              <>
              <View className='w-full flex-row justify-center mt-20
              items-center'>
                <Image source={icons.logo} className='w-12 h-10'/>
              </View>
              <View className='my-5'>
                <SearchBar 
                onChangeText={(text: string) => setSearchQuery(text)}
                value={searchQuery}
                placeholder='search movies...'/>
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
              {!Loading && !Error && searchQuery.trim() && Array.isArray(movies) && movies?.length > 0 &&
              (
                <Text className='text-xl text-white font-bold'>
                  Search Results for{' '}
                  <Text className='text-accent'>{searchQuery}</Text>
                </Text>
              )}
              </>
            }
            />
      
    </View>
  )
}

export default Search