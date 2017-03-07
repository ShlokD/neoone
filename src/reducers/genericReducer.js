const genericReducer = (reducerMap, state, action) => {
  const { type } = action;
  if (Object.prototype.hasOwnProperty.call(reducerMap, type)) {
    return reducerMap[type].call(null, state, action);
  }
  return state;
};

export default genericReducer;
