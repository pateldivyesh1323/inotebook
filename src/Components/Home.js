import React from 'react'
import Notes from './Notes'
import './style.css'

export default function Home({showAlert}) {

  return (
    <div>
      <Notes showAlert={showAlert}/>
    </div>
  )
}
