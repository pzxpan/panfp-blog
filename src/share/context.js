//dva占用基本上所有的文件夹，所以无赖之举放在这里,
export const initialState = {
  value: 1
}

export function reducer(state=  initialState , action) {
  switch (action.type) {
    case 'UPDATE_CATEGORY':
      return { ...state, value: action.payload.value };
    default:
      throw new Error("Don't understand action");
  }
}
