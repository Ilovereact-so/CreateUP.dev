import React from 'react'
import Review from './Review'
import Overview from './Overview'


const MenuOptions = ({elemets}) => {
  const tab = [<Overview/>, <Review/>, <Review/>]
    return (
    tab[elemets]
  )
}

export default MenuOptions