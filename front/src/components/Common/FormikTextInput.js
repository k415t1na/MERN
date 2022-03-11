import React from 'react'
import {useField} from 'formik'


const FormikTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return(
      <div className="mb-3">
        <label className="form-label">{label}</label>
        <input type='text' className='form-control' label={label}  {...field} {...props} />
        {/* <br/> */}
        {meta.touched && meta.error ? (<div className='validation-error'>{meta.error}</div> ): null}
      </div>
    );
  }

export default FormikTextInput;