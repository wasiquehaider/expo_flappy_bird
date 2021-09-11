import React from 'react';
import { View, Image } from 'react-native';
import Matter from 'matter-js';

const Obstacle = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;
  const imageName = props.imageName;

  return (
    <View
      style={{
        backgroundColor: color,
        borderStyle: 'solid',
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    >
      <Image
        source={imageName}
        style={{ width: widthBody }}
        resizeMode='stretch'
      />
    </View>
  );
};

export default (world, label, color, pos, size, imageName) => {
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label, isStatic: true }
  );
  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    color,
    pos,
    imageName,
    renderer: <Obstacle />,
  };
};
