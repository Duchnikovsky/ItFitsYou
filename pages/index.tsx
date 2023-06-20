import Head from 'next/head'
import CSS from '../styles/Home.module.css'
import Image from "next/image";
import logo from '../assets/logo.png'
import Left from '../components/Left';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // async function fetchData(){
  //   const res = await fetch('/api/signup',{
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body:JSON.stringify({
  //       email: "filipduchnik@outlook.com",
  //       password: "Pain272727",
  //     })
  //   })
  //   const data = await res.json()
  //   console.log(data)
  // }

  return (
    <div className={CSS.main}>
      <Head>
        <title>ItFitsYou</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={CSS.header}>
        <Image src={logo} alt='logo' className={CSS.logo} priority={true} />
      </div>
      <div className={inter.className}>
        <div className={CSS.content}>
          <Left />
        </div>
      </div>
    </div>
  )
}
