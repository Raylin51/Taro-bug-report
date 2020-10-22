import Taro from '@tarojs/taro'
import {
  ADD,
  MINUS,
  GETTHEME
} from '../constants/counter'
import { Dispatch } from 'redux'

export const add = () => {
  return {
    type: ADD
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}

export const getTheme = () => {
  return async (dispatch: Dispatch) => {
    const res = await Taro.request({
      url: 'http://192.168.10.150:9527/api/theme',
      method: 'GET',
      mode: 'cors'
    })
    dispatch({
      type: GETTHEME,
      payload: {
        theme: res.data
      }
    })
  }
}

// 异步的action
export function asyncAdd () {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}
