import React, {useState, useEffect} from 'react'
import { Text, FlatList, Pressable, Switch, View } from 'react-native'
import { gql, useQuery } from '@apollo/client'

import Loading from './Loading'
import styles from './styles'
 
const FILMS_QUERY = gql`
query {
    allFilms {
      films {
        title
        releaseDate
        openingCrawl
        id
      }
    } 
  }
`

const FilmItem = ({ film, onPress }) => {
    const { releaseDate, title, openingCrawl } = film
  
    return (
      <Pressable style={styles.item} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.boldText}>{releaseDate}</Text>
        <Text style={styles.openingCrawl}>{openingCrawl.substring(0, 50)}...</Text>
      </Pressable>
    )
  }

export default ({ navigation }) => {
  const { loading, error, data } = useQuery(FILMS_QUERY)
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
  }

  const sortDate = (films) => {
    let sortedFilm = JSON.parse(JSON.stringify(films))
    sortedFilm.sort((a,b) => {
      return isEnabled ? new Date(b.releaseDate) - new Date(a.releaseDate) : new Date(a.releaseDate) - new Date(b.releaseDate)
    });
    return sortedFilm
  }

  if (error) return <Text>There was an error, try and reload.</Text>;

  if (loading) {
    return <Loading />
  }

  return (
    <View>
      <View style={styles.switchContainer}>
        <Text style={styles.boldText}>{isEnabled ? "Sorted by newest" : "Sorted by oldest"}</Text>
        <Switch style={styles.switch}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <FlatList style={styles.episodeList}
        data={isEnabled ? sortDate(data.allFilms.films) : sortDate(data.allFilms.films)}
        renderItem={({ item }) => (
          <FilmItem
            film={item}
            onPress={() => navigation.navigate('Movie', { movie: item })}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}