import CSS from '../styles/RightPanel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons';

export default function CalculatorResult() {
  return (
  <>
    <div className={CSS.resultHeader}>
      <div className={CSS.icon}><FontAwesomeIcon icon={faSquarePollHorizontal}/></div>
      <div>To gain weight you must eat</div>
      </div>
    <div className={CSS.kcalBox}>
      <div><b>2733</b></div>
      <div className={CSS.lowerText}>KCAL</div>
    </div>
    <div className={CSS.nutritionalBox}>
      <div className={CSS.carbohydratesBox}>
        <div><b>308-479</b></div>
        <div className={CSS.lowerText}>CARBOHYDRATES</div>
      </div>
      <div className={CSS.fatsBox}>
        <div><b>76-91</b></div>
        <div className={CSS.lowerText}>FATS</div>
      </div>
      <div className={CSS.proteinsBox}>
        <div><b>82-137</b></div>
        <div className={CSS.lowerText}>PROTEINS</div>
      </div>
    </div>
      <div className={CSS.info}>You can assign result to your account to control your diet</div>
    <div className={CSS.saveBox}>
      <button className={CSS.button}>ASSIGN</button>
    </div>
  </>
  )
}
