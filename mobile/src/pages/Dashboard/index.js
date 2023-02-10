import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Dashboard = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const menuButtons = [
    {
      name: "Discord",
      icon: "discord"
    },  
    {
      name: "Github",
      icon: "github"
    },
    {
      name: "Twitter",
      icon: "twitter"
    },
    {
      name: "Spotify",
      icon: "spotify"
    },
    {
      name: "Youtube",
      icon: "youtube"
    },
    {
      name: "Twitch",
      icon: "twitch"
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Text style={styles.openMenuButton}>Open Menu</Text>
      </TouchableOpacity>
      {menuVisible && (
        <View style={styles.menuContainer}>
          <View style={styles.menuLeft}>
            {menuButtons.map(button => (
              <TouchableOpacity
                key={button.name}
                style={[
                  styles.menuButtonContainer,
                  selectedButton === button.name && styles.selectedButton
                ]}
                onPress={() => setSelectedButton(button.name)}
              >
                <Icon name={button.icon} size={30} color="#000" />
                <View style={[styles.buttonIndicator, selectedButton === 'Discord' && {backgroundColor: 'green'}]} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.menuRight}>
            {selectedButton ? (
              <>
                <Icon style={styles.iconeMenuRight} name={menuButtons.find(button => button.name === selectedButton).icon} size={30} color="#fff" />
                <Text style={styles.menuText}>{selectedButton}</Text>
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => {
                    setMenuVisible(false);
                    setSelectedButton(null);
                  }}
                >
                  <Text style={styles.menuButtonText}>Connect</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.noButtonSelectedText}>No button selected</Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    openMenuButton: {
      padding: 10,
      backgroundColor: 'lightgray',
      borderRadius: 5,
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
        backgroundColor: 'red',
      },
  });
  
  export default Dashboard;