import { useState } from 'react'
import CSS from '../styles/CenterPanel.module.css'

export default function CenterPanel(props:any) {
  const [value, setValue] = useState('')
  const [data, setData] = useState([])
  const [serving, setServing] = useState(0)

  return (
    <>
      <div className={CSS.centerPanel}>
        {/* <div className={CSS.barDiv}>
          <input type='text' className={CSS.searchBar} autoComplete='no' spellCheck="false" placeholder='Search for products' maxLength={30} value={value} onChange={(e) => setValue(e.target.value)}></input>
          {value.length > 0 ? <button className={CSS.clearButton} onClick={() => setValue('')}>CLEAR</button> : <button className={CSS.clearButton} disabled>CLEAR</button>}
        </div>
        <div className={CSS.productsDiv}>
          <div className={CSS.productRow}>
            <div className={CSS.productName}>Chleb tostowy (Dan Cake)</div>
            <div className={CSS.kcalin100}>123 kcal in 100g</div>
          </div>
          <div className={CSS.productRow}>
            <div className={CSS.productName}>Chleb tostowy (Dan Cake)</div>
            <div className={CSS.kcalin100}>123 kcal in 100g</div>
          </div>
          <div className={CSS.productRow}>
            <div className={CSS.productName}>Chleb tostowy (Dan Cake)</div>
            <div className={CSS.kcalin100}>123 kcal in 100g</div>
          </div>
          <div className={CSS.productRow}>
            <div className={CSS.productName}>Chleb tostowy (Dan Cake)</div>
            <div className={CSS.kcalin100}>123 kcal in 100g</div>
          </div>
          <div className={CSS.productRow}>
            <div className={CSS.productName}>Chleb tostowy (Dan Cake)</div>
            <div className={CSS.kcalin100}>123 kcal in 100g</div>
          </div>
          <div className={CSS.productRow}>
            <div className={CSS.productName}>Chleb tostowy (Dan Cake)</div>
            <div className={CSS.kcalin100}>123 kcal in 100g</div>
          </div>
          <div className={CSS.productRow}>
            <div className={CSS.productName}>Chleb tostowy (Dan Cake)</div>
            <div className={CSS.kcalin100}>123 kcal in 100g</div>
          </div>
        </div> */}
        <div className={CSS.productDetailsDiv}>
          <div className={CSS.productDetailsName}>Chleb tostowy (Dan Cake)</div>
          <div className={CSS.lowerTextName}>Nutritional values for <b>100g</b> of the product:</div>
          <div className={CSS.kcalBox}>
            <div><b>132</b></div>
            <div className={CSS.lowerText}>CALORIES</div>
          </div>
          <div className={CSS.nutritionalBox}>
            <div className={CSS.carbohydratesBox}>
              <div className={CSS.nutrionalText}><b>32</b></div>
              <div className={CSS.lowerText}>CARBOHYDRATES</div>
            </div>
            <div className={CSS.fatsBox}>
              <div className={CSS.nutrionalText}><b>1</b></div>
              <div className={CSS.lowerText}>FATS</div>
            </div>
            <div className={CSS.proteinsBox}>
              <div className={CSS.nutrionalText}><b>8</b></div>
              <div className={CSS.lowerText}>PROTEINS</div>
            </div>
          </div>
          <div>
            <div className={CSS.lowerTextName}>Enter serving size(in grams):</div>
            <input type='number' name='quantity' className={CSS.input} pattern={'^[0-9]{1,4}$'} maxLength={4} value={serving} onChange={(e) => setServing(parseInt(e.target.value))}></input>
            <div className={CSS.kcalBox}>
              <div><b>{serving > 0 ? Math.ceil(serving*20) : 0}</b></div>
              <div className={CSS.lowerText}>CALORIES IN SERVING</div>
            </div>
            <button className={CSS.addButton}>+</button>
          </div>
        </div>
      </div> 
    </>
  )
}
