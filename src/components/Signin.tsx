"use client";
import { FormEvent, useState } from 'react'
import CSS from '../styles/Auth.module.css'
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Signin(props:any) {
  const [values, setValues]:any = useState({
    email: '',
    password: '',
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
    }
  ]

  function redirect(){
    props.redirectAuth()
  }

  async function handleSubmit(e:FormEvent){
    e.preventDefault()
    // setFormDisabled(true)
    // setNoti('')
    // try{
    //   setFormDisabled(false)
    //   const result = await getUser(values)
    //   // const result = await createUser(values)
    //   // if(result.type === 1){
    //   //   setNoti(result.message)
    //   //   setTimeout(() => {
    //   //     props.redirectAuth()
    //   //   },2500)
    //   // }else{
    //   //   setNoti(result.message)
    //   //   setTimeout(() => {
    //   //     setNoti('')
    //   //   },1500)
    //   // }
    // } catch(error:any){
    //   console.error(error)
    // }
  }
  
  return (
    <div className={CSS.main}>
      <form onSubmit={handleSubmit}>
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
      {formDisabled ? <button className={CSS.button} disabled>Sign in</button> : <button className={CSS.button}>Sign in</button>}
      </form>
      <div className={CSS.redirection}>Don't have account? <b className={CSS.hover} onClick={redirect}>sign up</b></div>
    </div>
  )
}
