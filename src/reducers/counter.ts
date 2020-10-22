import { ADD, MINUS, GETTHEME } from '../constants/counter'

const INITIAL_STATE = {
  num: 0,
  theme: {
    primary: '#fff',
    liner: '#fff',
    red: '#fff',
    blue: '#fff',
  }
}

export default function counter(state = INITIAL_STATE, action: { type: string; payload: any }) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
    case MINUS:
      return {
        ...state,
        num: state.num - 1
      }
    case GETTHEME:
      return {
        ...state,
        theme: action.payload.theme
      }
    default:
      return state
  }
}
