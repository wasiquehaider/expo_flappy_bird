import { StatusBar } from 'expo-status-bar';
import { use } from 'matter-js';
import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
import { getImageNumbers } from './utils/random';

const APP_WIDTH = Dimensions.get('window').width;
const APP_HEIGHT = Dimensions.get('window').height;

const images = {
  0: require('./assets/numbers/0.png'),
  1: require('./assets/numbers/1.png'),
  2: require('./assets/numbers/2.png'),
  3: require('./assets/numbers/3.png'),
  4: require('./assets/numbers/4.png'),
  5: require('./assets/numbers/5.png'),
  6: require('./assets/numbers/6.png'),
  7: require('./assets/numbers/7.png'),
  8: require('./assets/numbers/8.png'),
  9: require('./assets/numbers/9.png'),
};

const ShowImages = ({ points }) => {
  let imagesArr = getImageNumbers(points);
  return (
    <View
      style={{
        width: APP_WIDTH,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 999,
      }}
    >
      {imagesArr.map((item, index) => {
        return (
          <Image
            key={index}
            source={images[item]}
            style={{
              width: 24,
              height: 50,
            }}
            resizeMode='center'
          />
        );
      })}
    </View>
  );
};

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameType, setGameType] = useState('new_game');
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  useEffect(() => {
    setRunning(false);
    setGameType('new_game');
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/background.png')}
        style={{ width: APP_WIDTH, height: APP_HEIGHT, position: 'absolute' }}
      />
      <ShowImages points={currentPoints} />
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case 'game_over':
              setRunning(false);
              setGameType('game_over');
              gameEngine.stop();
              break;
            case 'new_point':
              setCurrentPoints(currentPoints + 1);
              break;
          }
        }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <StatusBar style='auto' hidden />
      </GameEngine>
      {!running && gameType === 'new_game' ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <TouchableOpacity
            onPress={() => {
              setCurrentPoints(0);
              setRunning(true);
              gameEngine.swap(entities());
            }}
          >
            <Image source={require('./assets/message.png')} />
          </TouchableOpacity>
        </View>
      ) : !running && gameType === 'game_over' ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <TouchableOpacity
            onPress={() => {
              setCurrentPoints(0);
              setRunning(true);
              gameEngine.swap(entities());
            }}
          >
            <Image source={require('./assets/gameover.png')} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
