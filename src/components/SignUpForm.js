import styles from '../styles/Home.module.css'
import { useState } from 'react'

const MAX_DIGITS_FOR_CARDNUMBER = 19 // 16 digits 3 of which are white spaces

function isCreditCardNumberValid(creditCardNumber) {
  // Check that the input is a string and contains only digits, ignoring whitespace
  if (typeof creditCardNumber !== 'string' || !/^\d+$/.test(creditCardNumber.replace(/\s/g, ''))) {
    return false;
  }

  return true;
}

function isEmpty (value) {
  if(value) {
    return false
  } else {
    return true
  }
}

function SignUpForm ({form, setForm}) {

  const updateForm = (e) => {
    const property = e.target.id
    let newValue = e.target.value

    if (property === 'cardNumber') {
      newValue = newValue.replace(/[\s-]/g, '');
      newValue = newValue.replace(/(\d{4})/g, '$1 ').trim();
    }

    setForm({...form, [property]: newValue})
  }

  const isCardNumberValid = isCreditCardNumberValid(form.cardNumber)
  const isNameValid = !isEmpty(form.name)
  const isExpMonthValid = !isEmpty(form.expMonth)
  const isExpYearValid = !isEmpty(form.expYear)
  const isCvcValid = !isEmpty(form.cvc)

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({...form, submitted: true})
  }

  return ( <form onSubmit={handleSubmit}>
              <div className={styles.form}>

                <label>CARDHOLDER NAME</label>
                <input onChange={updateForm} className={isNameValid ? styles.name : styles.nameinvalid } type="text" id="name" name="name" placeholder="e.g. Jane Appleseed"/>
                { isNameValid ? "" : <span className={styles.error}>Can&apos;t be blank </span>}

                <label>CARD NUMBER</label>
                <input onChange={updateForm} className={ isCardNumberValid ? styles.cardnumber : styles.cardnumberinvalid} type="text" id="cardNumber" name="number" placeholder="e.g. 1234 5678 9123 0000" maxLength={MAX_DIGITS_FOR_CARDNUMBER} value={form.cardNumber === "0000 0000 0000 0000" ? "" : form.cardNumber}/>

                { isCardNumberValid ? "" : <span className={styles.error}>Wrong format, numbers only</span>}

                <div className={styles.expcontainer}>
                  <div className={styles.exp}>
                    <label>EXP. DATE (MM/YY)</label>

                    <div className={styles.monthyearcontainer}>
                      <input onChange={updateForm} type="text" id="expMonth" name="exp-month" placeholder="MM" maxLength={2} className={isExpMonthValid ? styles.expMonth : styles.expMonthinvalid}/>
                      <input onChange={updateForm} type="text" id="expYear" name="exp-year" placeholder="YY" maxLength={2} className={isExpYearValid ? styles.expYear : styles.expYearinvalid}/>
                    </div>
                    { isExpMonthValid && isExpYearValid ? "" : <span className={styles.error}>Can&apos;t be blank</span>}

                  </div>
                  <div className={styles.cvc}>
                    <label>CVC</label>
                    <input onChange={updateForm} type="text" id="cvc" name="cvc" placeholder="e.g. 123" maxLength={4} className={isCvcValid ? styles.cvc : styles.cvcInvalid}/>
                    { isCvcValid ? "" : <span className={styles.error}>Can&apos;t be blank</span>}
                  </div>


                </div>

                <button className={styles.submit} type="submit">Confirm</button>
              </div>
            </form>)
}

export default SignUpForm
