'use client';

import Header from './components/Header'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Explorer from './components/Explorer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-black p-8 pt-28">
        <div className="max-w-6xl mx-auto">
          <div id="home"><Hero /></div>
          <div id="skills"><Skills /></div>
          <div id="explorer"><Explorer /></div>
          <div id="experience"><Experience /></div>
          <div id="projects"><Projects /></div>
          <div id="blog"><Blog /></div>
          <div id="contact"><Contact /></div>
        </div>
      </main>
    </>
  )
}
