"use client";
import { useState } from 'react'
import CSS from '../page.module.css'
import Image from "next/image";
import logo from '../../assets/logo.png'
import Signin from '@/components/Signin';
import Signup from '@/components/Signup';

export default function page() {
  const [operation, setOperation] = useState('signin')

  function redirectAuth(){
    if(operation === 'signin'){
      setOperation('signup')
    }else{
      setOperation('signin')
    }
  }
  
  return (
  <main className={CSS.main}>
    <div className={CSS.header}>
      <Image src={logo} alt='logo' className={CSS.logo}/>
    </div>
    <div className={CSS.content}>
      {operation === 'signin' ? <Signin redirectAuth={redirectAuth}/> : <Signup redirectAuth={redirectAuth} />}
    </div>
    </main>
  )
}
