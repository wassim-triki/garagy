const typeOptionsStyles = {
  color: "#F4B251",
  "&.Mui-checked": {
    color: "#F4B251",
  },
};
const handleTypeChange = (e, type, setType) =>
  e.target.checked
    ? setType([...type, e.target.value])
    : setType(type.filter((t) => t !== e.target.value));

export { typeOptionsStyles, handleTypeChange };
