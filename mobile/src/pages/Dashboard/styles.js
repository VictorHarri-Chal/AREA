import {  StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    openMenuButton: {
      position: 'absolute',
      top: 305,
      left: -180,
      padding: 10,
      backgroundColor: 'lightgray',
      borderRadius: 5,
    },
    closeMenuButton: {
      position: 'absolute',
      top: 221,
      left: 6,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 5,
    },
    validateMenuButton: {
      position: 'absolute',
      top: 305,
      left: -20,
      padding: 10,
      backgroundColor: 'lightgray',
      borderRadius: 5,
    },
    binMenuButton: {
      position: 'absolute',
      top: 305,
      left: 140,
      padding: 10,
      backgroundColor: 'lightgray',
      borderRadius: 5,
    },
    slotDelimiter: {
      position: 'absolute',
      width: Dimensions.get('window').width,
      height: 8,
      left: 0,
      backgroundColor: 'black',
    },
    flag: {
      position: 'absolute',
      left: 5,
    },
    menuContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      backgroundColor: 'transparent',
    },
    menuLeft: {
      width: '30%',
      backgroundColor: 'lightgray',
      padding: 10,
    },
    menuRight: {
      width: '70%',
      backgroundColor: 'black',
      padding: 20,
      //justifyContent: 'center',
      alignItems: 'center',
    },
    menuButtonContainer: {
      marginVertical: 10,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 5,
      alignItems: 'center',
    },
    menuText: {
      color: '#fff',
      fontSize: 20,
      marginBottom: 20,
    },
    menuButton: {
      padding: 10,
      backgroundColor: 'lightgray',
      borderRadius: 5,
    },
    menuButtonText: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
    },
    iconeMenuRight: {
        marginTop: 1,
    },
    buttonIndicator: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 10,
        height: 10,
        borderRadius: 5,
      },
    actionButton: {
      position: 'absolute',
      top: 90,
      left: 40,
      padding: 7,
      borderRadius: 6,
    },
    reactionButton: {
      position: 'absolute',
      top: 90,
      left: 150,
      padding: 7,
      backgroundColor: 'lightgray',
      borderRadius: 6,
    },
    actionReactionButtonText: {
      color: 'black',
      fontSize: 20,
    },
    rectangleButton: {
      position: 'absolute',
      alignItems: 'center',
      top: 150,
      padding: 7,
      borderRadius: 4,
    },
  });

  export default styles;