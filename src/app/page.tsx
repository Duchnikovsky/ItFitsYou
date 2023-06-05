import CSS from './page.module.css'
import Image from "next/image";
import logo from '../assets/logo.png'

export default function Home() {
  return (
    <main className={CSS.main}>
      <div className={CSS.header}>
        <Image src={logo} alt='logo' className={CSS.logo}/>
      </div>
      <div className={CSS.content}>

      </div>
    </main>
  )
}
