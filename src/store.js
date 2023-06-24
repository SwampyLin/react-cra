import { createContext } from 'react'

function calculateTotalPrice(cartList) {
  return cartList
    .map((item) => item.quantity * item.price)
    .reduce((acc, cur) => acc + cur, 0)
}

export const cartInit = {
  cartList: [],
  number: 1
}

export const cartReducer = (state, action) => {
  const cartList = [...state.cartList]
  const index = cartList.findIndex((item) => item.id === action.payload.id)
  switch (action.type) {
    case 'CHANGE_QUANTITY':
      console.log('觸發CHANGE_QUANTITY')
      console.log(state, action)
      state.number = action.payload.number
      return {
        ...state
      }

    case 'ADD_TO_CART':
      if (index === -1) {
        console.log(state.number)
        const orderNumber = state.number
        action.payload.quantity = orderNumber
        cartList.push(action.payload)
      } else {
        const orderNumber = state.number
        cartList[index].quantity += orderNumber
      }
      return {
        ...state,
        cartList,
        total: calculateTotalPrice(cartList)
      }
    case 'CHANGE_CART_QUANTITY':
      cartList[index].quantity = action.payload.quantity
      return {
        ...state,
        cartList,
        total: calculateTotalPrice(cartList)
      }
    case 'REMOVE_CART_ITEM':
      cartList.splice(index, 1)
      return {
        ...state,
        cartList,
        total: calculateTotalPrice(cartList)
      }

    default:
      return state
  }
}

export const CartContext = createContext({})
