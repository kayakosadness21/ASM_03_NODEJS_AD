import { useReducer, useCallback } from "react";

const reducerHTTP = (state, action) => {
  if (action.type === "SEND") {
    return {
      data: null,
      status: "pending",
      error: null,
    };
  }
  if (action.type === "SUCCESS") {
    return {
      data: action.resData,
      status: "completed",
      error: null,
    };
  }
  if (action.type === "ERROR") {
    return {
      data: null,
      status: "completed",
      error: action.errorMessage,
    };
  }
  if (action.type === "SET_INITIAL") {
    return { data: null, status: null, error: null };
  }
  return state;
};
const initial = {
  data: null,
  status: null,
  error: null,
};
const useHTTP = (requestFunction) => {
  const [httpState, dispatch] = useReducer(reducerHTTP, initial);

  const sendRequest = useCallback(
    async (reqData) => {
      dispatch({ type: "SEND" });
      try {
        const res = await requestFunction(reqData);
        dispatch({ type: "SUCCESS", resData: res });
      } catch (error) {
        dispatch({ type: "ERROR", errorMessage: error });
      }
    },
    [requestFunction]
  );
  const setData = () => {
    dispatch({ type: "SET_INITIAL" });
  };
  return { setData, sendRequest, ...httpState };
};

export default useHTTP;
