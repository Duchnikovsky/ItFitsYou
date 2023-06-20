import CSS from '../styles/Right.module.css'
import Calculator from './Calculator';
import Auth from './Auth';

export default function RightPanel() {
  return (
    <div className={CSS.rightPanel}>
      <Calculator />
      <Auth />
    </div>
  )
}
