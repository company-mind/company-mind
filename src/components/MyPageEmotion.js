const emotion = (props) => {
  const { score } = props;
  if (score > 0 && score <= 1) {
    return '😡';
  } else if (score > 1 && score <= 2) {
    return '😭';
  } else if (score > 2 && score <= 3) {
    return '😄';
  } else if (score > 3 && score <= 4) {
    return '😍';
  }
  return '❔';
};

export default emotion;
