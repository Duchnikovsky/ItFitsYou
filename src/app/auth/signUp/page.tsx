"use client";
import { useState } from 'react'
import CSS from '../../../styles/Auth.module.css'
import { faCircleCheck, faCircleInfo, faKey, faRotate, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from "next/image";
import logo from "../../../assets/logo.png"
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const [values, setValues]:any = useState({
    email: '',
    password: '',
    rep_password: ''
  })
  const [formDisabled, setFormDisabled] = useState(false)
  const [noti, setNoti] = useState('')

  const inputs = [
    {
        id: 1,
        type: 'email',
        name: 'email',
        label: 'E-mail',
        error: 'Email should match email pattern',
        pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
        maxlenght: 50,
        icon: faUser
    },
    {
        id: 2,
        type: 'password',
        name: 'password',
        label: 'Password',
        error: 'Password should be 8-18 characters of letters and numbers',
        pattern: '^[A-Za-z0-9]{8,18}$',
        maxlenght: 18,
        icon: faKey
    },
    {
      id: 3,
      type: 'password',
      name: 'rep_password',
      label: 'Repeat password',
      error: 'Password should be 8-18 characters of letters and numbers',
      pattern: '^[A-Za-z0-9]{8,18}$',
      maxlenght: 18,
      icon: faKey
  }
  ]

  async function submitHandler(e:any){
    e.preventDefault()
    setFormDisabled(true)
    const email = values.email
    const password = values.password
    const rep_password = values.rep_password
    if(typeof email === "string" && email.length > 3 && email.length <= 50 && email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')){
      if(typeof password === "string" && password.length >= 8 && password.length <= 18){
        if(typeof rep_password === "string" && password === rep_password){
          const res = await fetch("http://localhost:3000/api/register",{
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body:JSON.stringify({
              email: email,
              password: password,
              rep_password: rep_password,
            })
          })
          const data = await res.json();
          if(data.type === 0){
            setNoti(data.message)
            setTimeout(()=>{
              setNoti('')
            },1500)
          }else if(data.type === 1){
            setNoti(data.message)
            setTimeout(()=>{
              setNoti('')
              router.push('/auth/signIn')
            },1500)
          }
          setFormDisabled(false)
        }else{
          setNoti('Passwords do not match each other')
          setTimeout(()=>{
            setNoti('')
          },1500)
          setFormDisabled(false)
        }
      }else{
        setNoti('Password do not match requirements')
        setTimeout(()=>{
          setNoti('')
        },1500)
        setFormDisabled(false)
      }
    }else{
      setNoti('Email do not match requirements')
      setTimeout(()=>{
        setNoti('')
      },1500)
      setFormDisabled(false)
    }
  }

  return (
    <div className={CSS.main}>
      <div className={CSS.header}>
        <Image src={logo} alt='logo' className={CSS.logo} priority={true} onClick={() => router.push('/')}/>
      </div>
      <form onSubmit={submitHandler}>
      {
      inputs.map((e, index)=>(
        <div key={index} className={CSS.inputBox}>
          <span className={CSS.label}>{e.label}</span><br></br>
          <input type={e.type} name={e.name} value={values[e.name]} required pattern={e.pattern} maxLength={e.maxlenght}  className={CSS.input} onChange={(e)=> setValues({...values, [e.target.name]: e.target.value})}></input>
          <i><FontAwesomeIcon icon={e.icon}/></i>
          <div className={CSS.inputError}>
            <span>{e.error}</span>
          </div>
        </div>
      ))
      }
      {formDisabled ? <button className={CSS.button} disabled><FontAwesomeIcon icon={faRotate} spin className={CSS.spin}/></button> : <button className={CSS.button}>Sign up</button>}
      </form>
      <div className={CSS.redirection}>Go back to <b className={CSS.hover} onClick={()=> router.push('/auth/signIn')}>sign in</b></div>
      {noti.length > 0 && <>
      {noti === "Sucessfully created account" ? <div><FontAwesomeIcon icon={faCircleCheck} beat className={CSS.icon}/><div className={CSS.noti}>{noti}</div></div> : <div><FontAwesomeIcon icon={faCircleInfo} beat className={CSS.icon}/><div className={CSS.noti}>{noti}</div></div>}
      </>}
    </div>
  )
}
