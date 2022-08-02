import React from 'react'
import '../css/error.css'

const ErrorMessage = ({ message }) => {
  return <div className="err-msg">{message ? message : null}</div>
}

export default ErrorMessage
