import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Rectangle from '../../components/Draggable/Draggable.js';
import { menuButtons } from './blocData.js';
import { styles } from './styles.js';

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
 
  const defineBlocType = (type) => {
    if (type === "title") {
      if (currentBlocType === "action_blocs") {
        return menuButtons.find(button => button.name === selectedButton).action_blocs.find(item => item.title).title;
      } else if (currentBlocType === "reaction_blocs") {
        return menuButtons.find(button => button.name === selectedButton).reaction_blocs.find(item => item.title).title;
      }
    } else if (type === "id") {
      if (currentBlocType === "action_blocs") {
        return menuButtons.find(button => button.name === selectedButton).action_blocs.find(item => item.id).id;
      } else if (currentBlocType === "reaction_blocs") {
        return menuButtons.find(button => button.name === selectedButton).reaction_blocs.find(item => item.id).id;
      }
    }
    return null;
  }

  const checkSlot = (coord1, coord2, slot) => {
    let isSolo = false;
    boxes.forEach(box => {
      if (box.y > coord1 && box.y < coord2) {
        if (isSolo === true) {
          console.log("Wrong schema : 2 blocs in the same slot")
          setFinalSchema([]);
          return false;
        } else {
          setFinalSchema(finalSchema => [...finalSchema, {id: box.id, slot: slot}])
          isSolo = true;
        }
      }
    })
    return true;
  }

  const validateButton = () => {
    setFinalSchema([]);
    checkSlot(0, 100, 1);
    checkSlot(100, 210, 2);
    checkSlot(210, 320, 3);
    checkSlot(320, 430, 4);
    checkSlot(430, 540, 5);
    checkSlot(540, 650, 6);
  }

  return (
    <View style={styles.container}>
      <>
        <TouchableOpacity onPress={() => {
          setMenuVisible(true)}}>
          <View style={styles.openMenuButton}>
            <Icon name={"bars"} size={25} color={"black"}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {validateButton()
        console.log(finalSchema)}}>
          <View style={styles.validateMenuButton}>
            <Icon name={"play"} size={25} color={"red"}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setBoxes([]);
        }}>
          <View style={styles.binMenuButton}>
            <Icon name={"trash"} size={25} color={"black"}/>
          </View>
        </TouchableOpacity>
        {boxes.map(box => (
          <Rectangle key={box.key} title={box.title} color={box.color} listSlot={listSlot} box={box} boxes={boxes} setBoxes={setBoxes}></Rectangle>
          ))}
        {listSlot.map(slot => (
            <View key={slot.name} style={[styles.slotDelimiter, {top: slot.top}]}></View>
          ))}
        <Icon name={"flag-checkered"} size={30} color={"lightgreen"} style={[styles.flag, {top: 40}]}/>
        <Icon name={"flag-checkered"} size={30} color={"red"} style={[styles.flag, {top: 590}]}/>
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
              <Icon name={"times"} size={25} color={"black"}/>
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
                        setBoxes(boxes => [...boxes, {key: boxes.length+1, title: defineBlocType("title"), id: defineBlocType("id"), color: menuButtons.find(button => button.name === selectedButton).color, x: 0, y: 0}])
                      }}
                      >
                        <Text style={styles.actionReactionButtonText}>{defineBlocType("title")}</Text>
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

export default Dashboard;