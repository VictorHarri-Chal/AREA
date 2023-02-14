import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Dashboard = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [currentBlocType, setCurrentBlocType] = useState("action_blocs");

  const [menuButtons, setMenuButtons] = useState([
    {
      name: "Discord",
      icon: "discord",
      color: "#7289da",
      login: false,
      action_blocs : "Get a private message",
      reaction_blocs : "Send a private message"
    },
    {
      name: "Github",
      icon: "github",
      color: "#99aab5",
      login: false,
      action_blocs : "New commit",
      reaction_blocs : "Create an issue"
    },
    {
      name: "Twitter",
      icon: "twitter",
      color: "#00acee",
      login: false,
      action_blocs : "New tweet",
      reaction_blocs : "Send a tweet"
    },
    {
      name: "Spotify",
      icon: "spotify",
      color: "#1ed760",
      login: false,
      action_blocs : "New stream",
      reaction_blocs : "Create a playlist"
    },
    {
      name: "Youtube",
      icon: "youtube",
      color: "#fe0000",
      login: false,
      action_blocs : "New youtube video",
      reaction_blocs : "Post a commentary"
    },
    {
      name: "Twitch",
      icon: "twitch",
      color: "#6441a5",
      login: false,
      action_blocs : "New stream on Twitch",
      reaction_blocs : "Post a commentary"
    },
  ]);

  const defineBlocType = () => {
    if (currentBlocType === "action_blocs") {
      return menuButtons.find(button => button.name === selectedButton).action_blocs;
    } else if (currentBlocType === "reaction_blocs") {
      return menuButtons.find(button => button.name === selectedButton).reaction_blocs;
    }
    return null;
  }

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
                <Icon name={button.icon} size={30} color={button.color} />
                {console.log(menuButtons)}
                <View style={[styles.buttonIndicator, { backgroundColor: button.login ? 'green' : 'red' }]} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.menuRight}>
            {selectedButton ? (
              <>
                <Icon style={styles.iconeMenuRight} name={menuButtons.find(button => button.name === selectedButton).icon} size={30} color={menuButtons.find(button => button.name === selectedButton).color}/>
                <Text style={styles.menuText}>{selectedButton}</Text>
                {menuButtons.find(button => button.name === selectedButton).login === false ? (
                  <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => {
                    setSelectedButton(null);
                    menuButtons.find(button => button.name === selectedButton).login = true;
                    setMenuButtons(menuButtons);
                  }}
                  >
                    <Text style={styles.menuButtonText}>Connect</Text>
                  </TouchableOpacity>
                  ) : (
                    <>
                      <TouchableOpacity class="actionButton"
                      style={styles.actionButton}
                      onPress={() => {
                        setCurrentBlocType("action_blocs");
                      }}
                      >
                        <Text style={styles.actionReactionButtonText} >Action</Text>
                      </TouchableOpacity>
                      <TouchableOpacity class="reactionButton"
                      style={styles.reactionButton}
                      onPress={() => {
                        setCurrentBlocType("reaction_blocs");
                      }}
                      >
                        <Text style={styles.actionReactionButtonText} >Reaction</Text>
                      </TouchableOpacity>
                      <TouchableOpacity class="rectangleButton"
                      style={[styles.rectangleButton, { backgroundColor: menuButtons.find(button => button.name === selectedButton).color}]}
                      onPress={() => {
                        setMenuVisible(false);
                      }}
                      >
                        <Text style={styles.actionReactionButtonText}>{defineBlocType()}</Text>
                      </TouchableOpacity>
                    </>
                  )}
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
      },
    actionButton: {
      position: 'absolute',
      top: 90,
      left: 40,
      padding: 7,
      backgroundColor: 'lightgray',
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

  export default Dashboard;