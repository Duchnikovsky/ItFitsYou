import React, { useEffect, useState } from 'react'
import CSS from '../styles/LeftPanel.module.css'
import ProgressBar from './ProgressBar';
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

interface PropsTypes{
  values: number[]
}

export default function Summary(props:PropsTypes) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState<number[]>([0,0,0,0])
  const [goals, setGoals] = useState<number[]>([0,0,0,0,0,0,0])

  async function fetchData(email: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/summary`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      })
    })
    const result = await res.json()
    return result
  }

  useEffect(() => {
    async function fetchDataAndLogResult(){
      if (session && session.user) {
        const email = session.user.email!;
        const res = await fetchData(email);
        if(res.type === 1){
          const kcal = res.nutrients.kcal
          if(kcal !== null){
            const carbo = res.nutrients.carbohydrate.split(',')
            const fat = res.nutrients.fat.split(',')
            const protein = res.nutrients.protein.split(',')
            setGoals([kcal,carbo[0],carbo[1],fat[0],fat[1],protein[0],protein[1]])     
            setLoading(false)  
          }
        }
      }
    }
    fetchDataAndLogResult();
  }, [session])

  useEffect(() => {
    setValues(props.values)
  },[props.values])

  return (
    <>
      <b>SUMMARY</b>
      {loading ? <div>
        <FontAwesomeIcon icon={faRotate} spin className={CSS.spin} width={'30px'}/>
      </div> : <>
        <div className={CSS.kcalBox}>
          <span className={CSS.needHeader}><b>KCAL</b></span><br></br>
          <span className={CSS.needComp}>{values[0].toString()}<b>/</b>{goals[0].toString()}</span>
          <div className={CSS.progressBar}>
            <ProgressBar value={values[0]} maxValue={goals[0]} />
          </div>
        </div>
        <div className={CSS.needsBox}>
          <div className={CSS.needs}>
            <span className={CSS.needHeader}><b>CARBOHYDRATES</b></span><br></br>
            <span className={CSS.needComp}>{values[1].toString()}<b>/ </b><span className={CSS.needGoal}>{goals[1].toString()}-{goals[2].toString()}</span></span>
            <div className={CSS.needProgressBar}>
              <ProgressBar value={values[1]} maxValue={goals[1]} />
            </div>
          </div>
          <div className={CSS.needs}>
            <span className={CSS.needHeader}><b>FATS</b></span><br></br>
            <span className={CSS.needComp}>{values[2].toString()}<b>/ </b><span className={CSS.needGoal}>{goals[3].toString()}-{goals[4].toString()}</span></span>
            <div className={CSS.needProgressBar}>
              <ProgressBar value={values[2]} maxValue={goals[3]} />
            </div>
          </div>
          <div className={CSS.needs}>
            <span className={CSS.needHeader}><b>PROTEINS</b></span><br></br>
            <span className={CSS.needComp}>{values[3].toString()}<b>/ </b><span className={CSS.needGoal}>{goals[5].toString()}-{goals[6].toString()}</span></span>
            <div className={CSS.needProgressBar}>
              <ProgressBar value={values[3]} maxValue={goals[5]} />
            </div>
          </div>
        </div>
      </>}
    </>
  )
}
