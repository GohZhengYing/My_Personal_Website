import Navbar from './components/Navbar/Navbar';
import MainPicture from './components/MainPicture/MainPicture';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Links from './components/Contacts/Contacts';
import React from 'react'

function Home(){
    return(
        <>
        <Navbar/>
      <MainPicture/>
      <Skills/>
      <Projects/>
      <Links/>
        </>
    )
}

export default Home