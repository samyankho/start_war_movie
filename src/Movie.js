import React from 'react'
import { Text, FlatList, Pressable, View } from 'react-native'
import { gql, useQuery } from '@apollo/client'

import Loading from './Loading'
import styles from './styles'

const MOVIE_QUERY = gql`
query($id: ID){
    film(id: $id) {
        title
        id
        openingCrawl
        releaseDate
        speciesConnection {
            totalCount
        }
        planetConnection {
            totalCount
        }
        vehicleConnection {
            totalCount
        }
        characterConnection {
            characters {
                name
                id
            }
        }
    }
}
`

function MovieDetail({ movie, navigation })  {
    const { releaseDate, title, openingCrawl, speciesConnection, vehicleConnection, planetConnection, characterConnection } = movie
  
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.boldText}>{releaseDate}</Text>
        <Text style={styles.openingCrawl}>{openingCrawl}</Text>
        <Text style={styles.count}>Total species count: {speciesConnection.totalCount}</Text>
        <Text style={styles.count}>Total planet count: {planetConnection.totalCount}</Text>
        <Text style={styles.count}>Total vehicle count: {vehicleConnection.totalCount}</Text>
        <FlatList style={styles.characterFlatlist}
            data={characterConnection.characters}
            renderItem={({ item }) => (
                <CharacterItem
                character={item}
                onPress={() => navigation.navigate('Character', { character: item })}
                />
            )}
            keyExtractor={(item) => item.id}
            />
      </View>
    )
  }

  const CharacterItem = ({ character, onPress }) => {
    const { name } = character
    return (
      <Pressable style={styles.item} onPress={onPress}>
        <Text style={styles.releaseDate}>{name}</Text>
      </Pressable>
    )
  }

export default ({ route, navigation }) => {
  const { loading, error, data } = useQuery(MOVIE_QUERY, {
      variables: {id: route?.params?.movie?.id}
  })

  if (error) return <Text>There was an error, try and reload.</Text>;

  if (loading) {
    return <Loading />
  }

  return (
    <MovieDetail movie={data.film} navigation={ navigation }/>
  )
}