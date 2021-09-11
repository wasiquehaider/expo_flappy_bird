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

const APP_WIDTH = Dimensions.get('window').width;
const APP_HEIGHT = Dimensions.get('window').height;

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
      <Text
        style={{
          textAlign: 'center',
          fontSize: 40,
          fontWeight: 'bold',
          margin: 20,
          zIndex: 999,
        }}
      >
        {currentPoints}
      </Text>
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
