const random = (min = 0, max = 1000) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export default random;
