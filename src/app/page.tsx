import CSS from './page.module.css'
import Image from "next/image";
import logo from '../assets/logo.png'
import LeftPanel from '@/components/LeftPanel';
import RightPanel from '@/components/RightPanel';

export default function Home() {
  return (
    <main className={CSS.main}>
      <div className={CSS.header}>
        <Image src={logo} alt='logo' className={CSS.logo} priority={true}/>
      </div>
      <div className={CSS.content}>
        <LeftPanel />
        <RightPanel />
      </div>
    </main>
  )
}
