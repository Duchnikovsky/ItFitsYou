import { faCircleCheck, faCircleInfo, faKey, faRotate, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormEvent, useState } from "react"
import Image from "next/image";
import logo from '../assets/logo.png'
import { useRouter } from 'next/navigation'
import CSS from '../styles/Auth.module.css'
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function Signin() {
  const router = useRouter()
  const [values, setValues]: any = useState({
    email: '',
    password: '',
  })
  const [formDisabled, setFormDisabled] = useState(false)
  const [noti, setNoti] = useState('')

  // const inputs = [
  //   {
  //     id: 1,
  //     type: 'email',
  //     name: 'email',
  //     label: 'E-mail',
  //     error: 'Email should match email pattern',
  //     pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
  //     maxlenght: 50,
  //     icon: faUser
  //   },
  //   {
  //     id: 2,
  //     type: 'password',
  //     name: 'password',
  //     label: 'Password',
  //     error: 'Password should be 8-18 characters of letters and numbers',
  //     pattern: '^[A-Za-z0-9]{8,18}$',
  //     maxlenght: 18,
  //     icon: faKey
  //   }
  // ]

  // async function submitHandler(e:any){
  //   e.preventDefault()
  //   setFormDisabled(true)
  //   const email = values.email
  //   const password = values.password
  //   if(typeof email === 'string' && email.length > 3 && email.length <= 50 && email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')){
  //     if(typeof password === "string" && password.length >= 8 && password.length <= 18){
  //       const res = await signIn('credentials',{
  //         redirect: false,
  //         email: email,
  //         password: password,
  //       })
  //       if(res){
  //         if(res.error === null){
  //           setNoti('Successfully logged in')
  //           setTimeout(()=>{
  //             setNoti('')
  //             router.push('/')
  //           },1500)
  //         }else{
  //           setNoti('Incorrect login data')
  //           setTimeout(()=>{
  //             setNoti('')
  //           },1500)
  //         }
  //       }
  //       setFormDisabled(false)
  //     }else{
  //       setNoti('Password do not match requirements')
  //       setTimeout(()=>{
  //         setNoti('')
  //       },1500)
  //       setFormDisabled(false)
  //     }
  //   }else{
  //     setNoti('Email do not match requirements')
  //     setTimeout(()=>{
  //       setNoti('')
  //     },1500)
  //     setFormDisabled(false)
  //   }
  // }

  return (
    <>
    </>
    // <div className={CSS.main}>
    //   <div className={CSS.header}>
    //     <Image src={logo} alt='logo' className={CSS.logo} priority={true} onClick={() => router.push('/')} />
    //   </div>
    //   <form>
    //     {
    //       inputs.map((e, index) => (
    //         <div key={index} className={CSS.inputBox}>
    //           <span className={CSS.label}>{e.label}</span><br></br>
    //           <input type={e.type} name={e.name} value={values[e.name]} required pattern={e.pattern} maxLength={e.maxlenght} className={CSS.input} onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}></input>
    //           <i><FontAwesomeIcon icon={e.icon} /></i>
    //           <div className={CSS.inputError}>
    //             <span>{e.error}</span>
    //           </div>
    //         </div>
    //       ))
    //     }
    //     {formDisabled ? <button className={CSS.button} disabled><FontAwesomeIcon icon={faRotate} spin className={CSS.spin} /></button> : <button className={CSS.button}>Sign in</button>}
    //   </form>
    //   <div className={CSS.redirection}>Don't have account? <b className={CSS.hover}><Link href='/signin' className={CSS.link}>sign up</Link></b></div>
    //   {noti.length > 0 && <>
    //     {noti === "Successfully logged in" ? <div><FontAwesomeIcon icon={faCircleCheck} beat className={CSS.icon} /><div className={CSS.noti}>{noti}</div></div> : <div><FontAwesomeIcon icon={faCircleInfo} beat className={CSS.icon} /><div className={CSS.noti}>{noti}</div></div>}
    //   </>}
    // </div>
  )
}