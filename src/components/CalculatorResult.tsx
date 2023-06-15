import CSS from '../styles/RightPanel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface Props {
  results: Number[],
}

export default function CalculatorResult({results}:Props) {
  const { data:session } = useSession()
  const [buttonDisabled, setButtonDisabled] = useState(false)
  
  async function handleAssign(){
    if(session && session.user){
      const user = session.user
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
        ?<>{buttonDisabled ? <button className={CSS.button} disabled>ASSIGN</button> : <button className={CSS.button} onClick={handleAssign}>ASSIGN</button>}</>
        :<button className={CSS.button} disabled>NOT LOGGED</button>
      }
    </div>
  </>
  )
}
