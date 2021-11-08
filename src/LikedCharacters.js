import { Text, FlatList, Pressable, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import styles from './styles'

const CharacterItem = ({ character, onPress }) => {
    const { name } = character
    return (
      <Pressable style={styles.item} onPress={onPress}>
        <Text style={styles.boldText}>{name}</Text>
      </Pressable>
    )
  }


function LikedCharacters ({likedCharacters, navigation}) {
    return (
        <FlatList
        data={likedCharacters}
        renderItem={({ item }) => (
            <CharacterItem
            character={item}
            onPress={() => navigation.navigate('Character', { character: item })}
            />
        )}
        keyExtractor={(item) => item.id}
        />
    )
  }

  const stateToProps = (state)=>{
    return {
        likedCharacters : state.likedCharacters
    }
  }

  export default connect(stateToProps, null)(LikedCharacters)