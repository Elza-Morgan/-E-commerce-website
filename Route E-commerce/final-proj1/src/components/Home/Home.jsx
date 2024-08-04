import React, { useContext } from 'react'
import Style from './Home.module.css'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {


  return (<>
        <MainSlider />
        <CategoriesSlider />
        <FeatureProducts />
    </>
  )
}
