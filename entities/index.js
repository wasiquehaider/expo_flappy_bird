import Matter from 'matter-js';
import Bird from '../components/Bird';
import Floor from '../components/Floor';
import Obstacle from '../components/Obstacle';

import { Dimensions } from 'react-native';
import { getPipeSizePosPair } from '../utils/random';
const windowsHeight = Dimensions.get('window').height;
const windowsWidth = Dimensions.get('window').width;

export default (restart) => {
  let obstacleImageBottom = require('../assets/pipe-green.png');
  let obstacleImageTop = require('../assets/pipe-green-opposite.png');
  let engine = Matter.Engine.create({ enableSleeping: false });

  engine.gravity.y = 0.6;
  let world = engine.world;

  const pipeSizePosA = getPipeSizePosPair();
  const pipeSizePosB = getPipeSizePosPair(windowsWidth * 0.9);

  return {
    physics: { engine, world },
    Bird: Bird(world, 'cyan', { x: 50, y: 300 }, { height: 40, width: 40 }),
    ObstacleTop1: Obstacle(
      world,
      'ObstacleTop1',
      'red',
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size,
      obstacleImageTop
    ),
    ObstacleBottom1: Obstacle(
      world,
      'ObstacleBottom1',
      '',
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size,
      obstacleImageBottom
    ),
    ObstacleTop2: Obstacle(
      world,
      'ObstacleTop2',
      'red',
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size,
      obstacleImageTop
    ),
    ObstacleBottom2: Obstacle(
      world,
      'ObstacleBottom2',
      '',
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size,
      obstacleImageBottom
    ),
    Floor: Floor(
      world,
      'green',
      { x: windowsWidth / 2, y: windowsHeight },
      { height: 150, width: windowsWidth }
    ),
  };
};
