import { Dimensions } from 'react-native';
const windowsHeight = Dimensions.get('window').height;
const windowsWidth = Dimensions.get('window').width;

export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getPipeSizePosPair = (addToPosX = 0) => {
  let yPosTop = -getRandom(300, windowsHeight - 100);

  const pipeTop = {
    pos: { x: windowsWidth + addToPosX, y: yPosTop },
    size: { height: windowsHeight * 2, width: 75 },
  };
  const pipeBottom = {
    pos: { x: windowsWidth + addToPosX, y: windowsHeight * 2 + 200 + yPosTop },
    size: { height: windowsHeight * 2, width: 75 },
  };

  return { pipeTop, pipeBottom };
};
