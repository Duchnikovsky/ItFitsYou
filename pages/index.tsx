import Head from 'next/head'
import CSS from '../styles/Home.module.css'
import Image from "next/image";
import logo from '../assets/logo.png'
import Left from '../components/Left';
import { Inter } from 'next/font/google'
import Right from '../components/Right';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
          <Right />
        </div>
      </div>
    </div>
  )
}
