import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Rectangle from '../../components/Draggable/Draggable.js';

const Dashboard = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [currentBlocType, setCurrentBlocType] = useState("action_blocs");
  const [boxes, setBoxes] = useState([]);
  const [finalSchema, setFinalSchema] = useState([]);
  const [listSlot, setListSlot] = useState([
    { name: 1, top: 100, },
    { name: 2, top: 210, },
    { name: 3, top: 320, },
    { name: 4, top: 430, },
    { name: 5, top: 540, },
    { name: 6, top: 650, },
  ]);
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

  const validateButton = () => {
    console.log(boxes)
  }

  return (
    <View style={styles.container}>
      <>
        <TouchableOpacity onPress={() => {
          setMenuVisible(true)}}>
          <View style={styles.openMenuButton}>
            <Icon name={"bars"} size={19} color={"black"}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {validateButton()}}>
          <View style={styles.validateMenuButton}>
            <Icon name={"play"} size={19} color={"red"}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setBoxes([]);
        }}>
          <View style={styles.binMenuButton}>
            <Icon name={"trash"} size={19} color={"black"}/>
          </View>
        </TouchableOpacity>
        {boxes.map(box => (
          <Rectangle key={box.key} title={box.title} color={box.color} listSlot={listSlot} box={box} boxes={boxes} setBoxes={setBoxes}></Rectangle>
          ))}
        {listSlot.map(slot => (
          <View key={slot.name} style={[styles.slotDelimiter, {top: slot.top}]}></View>
        ))}
      </>
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
                <View style={[styles.buttonIndicator, { backgroundColor: button.login ? 'green' : 'red' }]} />
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => {
              setMenuVisible(false)}}>
              <View style={styles.closeMenuButton}>
              <Icon name={"times"} size={19} color={"black"}/>
              </View>
            </TouchableOpacity>
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
                      style={[styles.actionButton, { backgroundColor: currentBlocType === "action_blocs" ? 'white' : 'lightgray'}]}
                      onPress={() => {
                        setCurrentBlocType("action_blocs");
                      }}
                      >
                        <Text style={styles.actionReactionButtonText} >Action</Text>
                      </TouchableOpacity>
                      <TouchableOpacity class="reactionButton"
                      style={[styles.reactionButton, { backgroundColor: currentBlocType === "reaction_blocs" ? 'white' : 'lightgray'}]}
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
                        setBoxes(boxes => [...boxes, {key: boxes.length+1, title: defineBlocType(), color: menuButtons.find(button => button.name === selectedButton).color, x: 0, y: 0}])
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
      position: 'absolute',
      top: 315,
      left: -180,
      padding: 10,
      backgroundColor: 'lightgray',
      borderRadius: 5,
    },
    closeMenuButton: {
      position: 'absolute',
      top: 231,
      left: 6,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 5,
    },
    validateMenuButton: {
      position: 'absolute',
      top: 315,
      left: -20,
      padding: 10,
      backgroundColor: 'lightgray',
      borderRadius: 5,
    },
    binMenuButton: {
      position: 'absolute',
      top: 315,
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

  export default Dashboard;