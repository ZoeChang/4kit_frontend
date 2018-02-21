import React from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'

import 'react-select/dist/react-select.css'
import 'react-datepicker/dist/react-datepicker.css'

InputField.prototype.setdata = function () {
  console.log(1)
}

export function InputField ({ theader, type, ...params }) {
  return (
    <div className='form-normal'>
      <span className='t-header'>{theader}</span>
      <input type={type || 'text'} {...params} />
    </div>
  )
}

export function SelectField ({ theader, data, ...params }) {
  var selectGroup = data.map((item) => <option value={item.value} key={item.key}>{item.content}</option>)

  return (
    <div className='form-normal'>
      <span className='t-header'>{theader}</span>
      <select>
        <option value='initselect'>請選擇</option>
        {selectGroup}
      </select>
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

export function TextareaField ({ theader, ...params }) {
  return (
    <div className='form-normal'>
      <span className='t-header'>{theader}</span>
      <textarea {...params} />
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

export function DateField ({ text, cssClass, ...params }) {
  return (
    <div className={cssClass ? 'formItem ' + cssClass : 'formItem'}>
      <label>{text}</label>
      <DatePicker {...params} />
      <span />
    </div>
  )
}
