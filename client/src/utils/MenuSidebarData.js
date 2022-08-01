import React from 'react'
import { FaHome } from 'react-icons/fa'
import { GiClothes } from 'react-icons/gi'
import { AiOutlinePlus } from 'react-icons/ai'

export const MenuSidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <FaHome />,
    className: 'nav-text',
  },
  {
    title: 'Create set',
    path: '/createSet',
    icon: <AiOutlinePlus />,
    className: 'nav-text',
  },
  {
    title: 'Your sets',
    path: '/yourSets',
    icon: <GiClothes />,
    className: 'nav-text',
  },
]
