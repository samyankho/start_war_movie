import React, {useState, useEffect} from 'react'
import { Text, FlatList, Pressable, View } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {connect} from 'react-redux'
import Loading from './Loading'
import styles from './styles'

const CHARACTER_QUERY = gql`
query($id: ID) {
    person(id: $id) {
      id
      name
      birthYear
      height
      mass
      homeworld {
        name
      }
      filmConnection {
        films {
          title
          id
        }
      }
    }
  }
`

function CharacterDetail({ character, setLiked, setDisliked, navigation, initLike })  {
    const { name, birthYear, height, mass, homeworld, filmConnection } = character
  
    return (
      <View style={styles.item}>
        <View style={styles.row}>
            <Text style={styles.title}>Name: {name}</Text>
            <LikeButton initLike={initLike} setLiked={setLiked} setDisliked={setDisliked}/>
        </View>
        <Text style={styles.boldText}>BirthYear: {birthYear}</Text>
        <Text style={styles.boldText}>Height: {height}</Text>
        <Text style={styles.boldText}>Mass: {mass}</Text>
        <Text style={styles.boldText}>HomeWorld: {homeworld.name}</Text>
        <Text style={styles.boldText}>Movies:</Text>
        <FlatList style={styles.characterFlatlist}
            data={filmConnection.films}
            renderItem={({ item }) => (
                <Film
                film={item}
                onPress={() => navigation.navigate('Movie', { movie: item })}
                />
            )}
            keyExtractor={(item) => item.id}
            />
      </View>
    )
  }

  const LikeButton = ({initLike, setLiked, setDisliked}) => {

    const onChangeLiked = () => {
        initLike ? setDisliked() : setLiked()
    }

    return (
      <Pressable onPress={() => onChangeLiked()}>
        <MaterialCommunityIcons
          name={initLike ? "heart" : "heart-outline"}
          size={40}
          color={initLike ? "red" : "black"}
        />
      </Pressable>
    );
  };

  const Film = ({ film, onPress }) => {
    const { title } = film
  
    return (
      <Pressable style={styles.item} onPress={onPress}>
        <Text style={styles.boldText}>{title}</Text>
      </Pressable>
    )
  }

const Character = ({ route, navigation, setLiked, likedCharacters, setDisliked }) => {
    const [initLike, setInitLike] = useState(false)
    const { loading, error, data } = useQuery(CHARACTER_QUERY, {
        variables: {id: route.params.character.id}
    })

    useEffect(() => {
        let result = false
        likedCharacters.map(item => {
            item.id === route.params.character.id ? result = true : ''
        })
        setInitLike(result)
    })

    const setLikedBtn = () =>{
        setInitLike(!initLike)
        setLiked(data.person)
    }

    const setDislikedBtn = () =>{
        setInitLike(!initLike)
        setDisliked(data.person)
    }

  if (error) return <Text>There was an error, try and reload.</Text>;

  if (loading) {
    return <Loading />
  }

  return (
    <CharacterDetail 
    character={data.person} 
    navigation={navigation} 
    initLike={initLike} 
    setLiked={setLikedBtn} 
    setDisliked={setDislikedBtn}/>
  )
}

const dispatchToProps = (dispatch) =>{
    return {
        setLiked(person){
            let action = {
                type:'setLiked',
                value: {
                    "name": person.name,
                    "id": person.id
                }
            }
            dispatch(action)
        },
        setDisliked(person){
            let action = {
                type:'setDisliked',
                value: {
                    "name": person.name,
                    "id": person.id
                }
            }
            dispatch(action)
        }
    }
}

const stateToProps = (state)=>{
    return {
        likedCharacters : state.likedCharacters
    }
}

export default connect(stateToProps, dispatchToProps)(Character)
