import CSS from '../styles/Right.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollHorizontal, faRotate } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

interface Props {
  results: Number[],
}

export default function CalculatorResult({results}:Props) {
  const { data:session } = useSession()
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [updated, setUpdated] = useState(false)
  const router = useRouter()
  
  async function handleAssign(){
    setButtonDisabled(true)
    setUpdated(false)
    if(session && session.user){
      const user = session.user
      const res = await fetch('/api/calculator',{
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body:JSON.stringify({
          email: user.email,
          kcal: results[0],
          carbohydrate: `${results[1]},${results[2]}`,
          fat: `${results[3]},${results[4]}`,
          protein: `${results[5]},${results[6]}`,
        })
      })
      const result = await res.json()
      if(result.type === 0){
        setButtonDisabled(false)
      }else{
        setUpdated(true)
        setTimeout(() => {
          router.refresh()
        },1500)
      }
    }
  }

  return (
  <>
    <div className={CSS.resultHeader}>
      <div className={CSS.icon}><FontAwesomeIcon icon={faSquarePollHorizontal}/></div>
      <div>To gain weight you must eat</div>
      </div>
    <div className={CSS.kcalBox}>
      <div><b>{results[0].toString()}</b></div>
      <div className={CSS.lowerText}>KCAL</div>
    </div>
    <div className={CSS.nutritionalBox}>
      <div className={CSS.carbohydratesBox}>
        <div><b>{results[1].toString()}-{results[2].toString()}</b></div>
        <div className={CSS.lowerText}>CARBOHYDRATES</div>
      </div>
      <div className={CSS.fatsBox}>
        <div><b>{results[3].toString()}-{results[4].toString()}</b></div>
        <div className={CSS.lowerText}>FATS</div>
      </div>
      <div className={CSS.proteinsBox}>
        <div><b>{results[5].toString()}-{results[6].toString()}</b></div>
        <div className={CSS.lowerText}>PROTEINS</div>
      </div>
    </div>
      <div className={CSS.info}>You can assign result to your account to control your diet</div>
    <div className={CSS.saveBox}>
      {(session && session.user)
        ?<>{buttonDisabled ? <button className={CSS.button} disabled>{updated ? 'ASSIGNED' : <FontAwesomeIcon icon={faRotate} spin className={CSS.spin}/>}</button> : <button className={CSS.button} onClick={handleAssign}>ASSIGN</button>}</>
        :<button className={CSS.button} disabled>NOT LOGGED</button>
      }
    </div>
  </>
  )
}
