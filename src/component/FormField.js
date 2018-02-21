import React from 'react'
import is from 'is_js'
import DatePicker from 'react-datepicker'
import Select from 'react-select'

import 'react-select/dist/react-select.css'
import 'react-datepicker/dist/react-datepicker.css'

export function InputField ({ text, type, name, autonewline = true, cssClass, csslogin, ...params }) {
  let br = is.truthy(autonewline) && <br />
  if (!params.value) { params.value = '' }
  return (
    <div className={csslogin || cssClass ? 'formItem ' + cssClass : 'formItem'}>
      <label>{text}</label>
      <input type={type} name={name} {...params} />
      {br}
      <span />
    </div>
  )
}

export function SelectField ({ text, type, name, opt, options, autonewline = true, cssClass, ...params }) {
  let br = is.truthy(autonewline) && <br />
  return (
    <div className={cssClass ? 'formItem ' + cssClass : 'formItem'}>
      <label>{text}</label>
      <select name={name} {...params}>
        <option key={-1} value={opt.value}>{opt.text}</option>
        {options.map((option, idx) => {
          return <option key={idx} value={option.value}>{option.text}</option>
        })}
      </select>
      {br}
      <span />
    </div>
  )
}

export function DateField ({ text, cssClass, ...params }) {
  return (
    <div className={cssClass ? 'formItem ' + cssClass : 'formItem'}>
      <label>{text}</label>
      <DatePicker {...params} />
      <span />
    </div>
  )
}

export function DropdownSelectField ({text, cssClass, ...params}) {
  return (
    <div>
      <label>{text}</label>
      <Select {...params} />
    </div>
  )
}

export function RadioField ({text, options, cssClass, ...params}) {
  return (
    <div>
      <label>{text}</label>
      {options.map((option, idx) => {
        return (
          <div key={idx}>
            <input type='radio' id={option.label} value={option.value} {...params} />
            <label htmlFor={option.label}>{option.label}</label>
          </div>
        )
      })}
    </div>
  )
}
