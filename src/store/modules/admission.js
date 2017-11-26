import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const CREATE_ADMISSION = 'api/CREATE_ADMISSION'
export const CREATE_ADMISSION_SUCCESS = 'api/CREATE_ADMISSION_SUCCESS'
export const CREATE_ADMISSION_FAIL = 'api/CREATE_ADMISSION_FAIL'
export const GET_ADMISSIONS = 'api/GET_ADMISSIONS'
export const GET_ADMISSIONS_SUCCESS = 'api/GET_ADMISSIONS_SUCCESS'
export const GET_ADMISSIONS_FAIL = 'api/GET_ADMISSIONS_FAIL'
export const DELETE_ADMISSION = 'api/DELETE_ADMISSION'
export const DELETE_ADMISSION_SUCCESS = 'api/DELETE_ADMISSION_SUCCESS'
export const DELETE_ADMISSION_FAIL = 'api/DELETE_ADMISSION_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function getAdmissions (page = 1, count = 10) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/admissions?page=${page}&count=${count}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_ADMISSIONS, GET_ADMISSIONS_SUCCESS, GET_ADMISSIONS_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function createAdmission (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/admission',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_ADMISSION,
          CREATE_ADMISSION_SUCCESS,
          CREATE_ADMISSION_FAIL]
      }
    })
  }
}

export function updateAdmission (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/admission',
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_ADMISSION,
          CREATE_ADMISSION_SUCCESS,
          CREATE_ADMISSION_FAIL]
      }
    })
  }
}

export function deleteAdmission (id) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/v1/admission/${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        types: [
          DELETE_ADMISSION,
          DELETE_ADMISSION_SUCCESS,
          DELETE_ADMISSION_FAIL]
      }
    })
  }
}

export const actions = {
  getAdmissions,
  createAdmission,
  deleteAdmission,
  updateAdmission
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ CREATE_ADMISSION ] = state => {
  return state.merge({
    creatingAdmission: true,
    creatingAdmissionSuccess: false,
    createAdmissionError: null,
    deletingAdmissionSuccess: false
  })
}

actionHandlers[ CREATE_ADMISSION_SUCCESS ] = (state, action) => {
  return state.merge({
    creatingAdmission: false,
    creatingAdmissionSuccess: true,
    createAdmissionError: null,
    admission: action.payload.data.admission
  })
}

actionHandlers[ CREATE_ADMISSION_FAIL ] = (state, action) => {
  return state.merge({
    creatingAdmission: false,
    creatingAdmissionSuccess: false,
    createAdmissionError: action.payload.response.error
  })
}

actionHandlers[ GET_ADMISSIONS ] = state => {
  return state.merge({
    fetchingAdmissions: true,
    fetchingAdmissionsSuccess: false,
    getAdmissionsError: null,
    creatingAdmissionSuccess: false,
    deletingAdmissionSuccess: false
  })
}

actionHandlers[ GET_ADMISSIONS_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingAdmissions: false,
    fetchingAdmissionsSuccess: true,
    getAdmissionsError: null,
    admissions: action.payload.data.admissions
  })
}

actionHandlers[ GET_ADMISSIONS_FAIL ] = (state, action) => {
  return state.merge({
    fetchingAdmissions: false,
    fetchingAdmissionsSuccess: false,
    getAdmissionsError: action.payload.response.error
  })
}

actionHandlers[ DELETE_ADMISSION ] = state => {
  return state.merge({
    deletingAdmission: true,
    deletingAdmissionSuccess: false,
    deleteAdmissionError: null
  })
}

actionHandlers[ DELETE_ADMISSION_SUCCESS ] = (state, action) => {
  return state.merge({
    deletingAdmission: false,
    deletingAdmissionSuccess: true,
    deleteAdmissionError: null
  })
}

actionHandlers[ DELETE_ADMISSION_FAIL ] = (state, action) => {
  return state.merge({
    deletingAdmission: false,
    deletingAdmissionSuccess: false,
    deleteAdmissionError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  admission: null,
  createAdmissionError: false,
  creatingAdmissionSuccess: false,
  admissions: null,
  getAdmissionsError: false,
  fetchingAdmissionSuccess: false,
  deleteAdmissionError: false,
  deletingAdmissionSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}
