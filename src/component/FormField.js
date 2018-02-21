import React, { Component } from 'react'

InputField.prototype.setdata = function(){
  console.log(1)
}

export function InputField({ theader, type, ...params }) {
  // this.setdata()
  return (
    <div className="form-normal">
      <span className="t-header">{theader}</span>
      <input type={type?type:'text'} {...params}/>
    </div>
  )
}





export function SelectField ({ theader, data, ...params }) {
  var selectGroup = data.map( (item) => <option value={item.value} key={item.key}>{item.content}</option> )
 
  return (
    <div className="form-normal">
      <span className="t-header">{theader}</span>
      <select>
        <option value="initselect">請選擇</option>
        {selectGroup}
      </select>
    </div>
  )
}

export function RadioField ({ theader, data, inline = true, ...params }) {
  var radioGroup = data.item.map( (item) => 
    <div className={ inline ? 'radio-inline' : null } key={item.key}>
      <input type="radio" id={item.key} name={data.name} value={item.value} />
      <label htmlFor={item.key}>{item.content}</label>
    </div>
  )         
 
  return (
    <div className="form-normal">
      <span className="t-header">{theader}</span>
      {radioGroup}
    </div>
  )
}

export function TextareaField ({ theader, ...params }) {     
  return (
    <div className="form-normal">
      <span className="t-header">{theader}</span>
      <textarea {...params} />
    </div>
  )
}
