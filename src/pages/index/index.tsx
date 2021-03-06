import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Button, Text } from '@tarojs/components'
import { styled } from 'linaria/react'

import { add, minus, asyncAdd, getTheme } from '../../actions/counter'

import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number,
    theme: any
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
  getTheme: () => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  text: React.RefObject<HTMLParagraphElement>
  props: IProps;
}

const PText = styled(Text)<{color: string}>`
  color: ${props => props.color}
`;

@connect(({ counter }) => ({
  counter,
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  },
  getTheme () {
    dispatch(getTheme())
  }
}))
class Index extends Component {
  constructor(props) {
    super(props)
    this.text = React.createRef()
  }
  componentDidMount () {
    this.props.getTheme()
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidUpdate(preProps: IProps) {
    console.log(this.props.counter.theme)
    console.log(preProps.counter.theme)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const style = {
      fontWeight: 600,
      '--test': 'blue',
      color: 'var(--test)',
    } as React.CSSProperties
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text className='text' style={style}>Hello, World</Text></View>
      </View>
    )
  }
}

export default Index

