import React from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'

import 'react-select/dist/react-select.css'
import 'react-datepicker/dist/react-datepicker.css'

export function InputField ({ theader, ...params }) {
  return (
    <div className="form-row">
      <div className="form-col-right t-header">{theader}</div>
      <div className="form-col-left">
        <input type='text' {...params} />
      </div>
    </div>
  )
}

export function MultiInputField ({ theader, name, ...params }) {
  return (
    <div className="form-row">
      <div className="form-col-right t-header">{theader}</div>
      <div className="form-col-left input-g">
        <input type="text" name={ `${name}_0` } {...params} />
        <input type="text" name={ `${name}_1` } {...params} />
        <input type="text" name={ `${name}_2` } {...params} />
        <input type="text" name={ `${name}_3` } {...params} />
      </div>
    </div>
  )
}

export function SelectField ({ theader, name, id, otherInput, data, onchange, ...params }) {
  var selectGroup = data.map( item => <option value={item.value} key={item.key}>{item.content}</option>)

  return (
    <div className="form-row">
      <div className="form-col-right t-header">{theader}</div>
      <div className={ otherInput ? "form-col-left inline-input" : "form-col-left" }>
        <select name={name} id={id} onChange={onchange}>
          <option value='initselect'>請選擇</option>
          {selectGroup}
        </select>
        {
          otherInput ? <input type="text" placeholder={theader} /> : null
        }
      </div>
    </div>
  )
}

export function TextareaField ({ theader, ...params }) {
  return (
    <div className="form-row">
      <div className="form-col-right t-header">{theader}</div>
      <div className="form-col-left">
        <textarea {...params} />
      </div>
    </div>
  )
}

export function RadioField ({ theader, options, cssClass, ...params}) {
  return (
    <div className="form-row">
      <div className="form-col-right t-header">{theader}</div>
      <div className="form-col-left">
        {options.map((option, idx) => {
          return (
            <div className="form-radio" key={idx}>
              <input type='radio' id={option.label} value={option.value} {...params} />
              <label htmlFor={option.label}>{option.label}</label>
            </div>
          )
        })}
      </div>
    </div>
  )
}



export function DropdownSelectField ({ theader, ...params}) {
  return (
    <div className="form-row">
      <div className="form-col-right t-header">{theader}</div>
      <div className="form-col-left">
        <Select {...params} />
      </div>
    </div>
  )
}

export function DateField ({ theader, cssClass, ...params }) {
  return (
    <div className="form-row">
      <div className="form-col-right t-header">{theader}</div>
      <div className="form-col-left">
        <DatePicker {...params} />
      </div>
    </div>
  )
}
