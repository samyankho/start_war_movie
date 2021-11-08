import { StyleSheet } from 'react-native'

export const PINK = '#ff5dc8'

export const screenOptions = {
  headerStyle: {
    backgroundColor: PINK,
  },
  headerTintColor: '#fff',
}

export default StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25
  },
  boldText: {
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 15
  },
  openingCrawl: {
    paddingTop: 15,
  },
  count: {
    paddingTop: 15,
    fontWeight: 'bold',
    fontSize: 15
  },
  characterFlatlist: {
    marginTop: 15,
    height: 250,
    flexGrow: 0
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  switchContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10
  },
  switch: {
    paddingTop: 20,
    marginLeft: 10
  },
  episodeList: {
    height: '93%'
  }
})