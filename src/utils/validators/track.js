import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateInput (data) {
  let errors = {}

  if (Validator.isNull(data.trackName)) {
    errors.trackName = 'Name is required'
  }

  if (Validator.isNull(data.active)) {
    errors.active = 'Please specify if active or not'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
