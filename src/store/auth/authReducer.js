import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  authData: {
    accessToken: string | null,
    id: number | null,
    refreshToken: string | null,
    isLoading: boolean,
    error:  string | null
  },
  profileData: {
    id: number,
    name: string,
    surname: string,
    managerId: number,
    expertId: number,
    dateOfNextAssessment: string,
    login: string,
    isLoading: boolean,
    error:  string | null
  },
  assessmentData: {
    data: []
  }
    
}

export interface ProfilePayload {
  id: number,
  accessToken: string,
  refreshToken: string
}

export interface ProfileData {
  id: number,
  name: string,
  surname: string,
  managerId: number,
  expertId: number,
  dateOfNextAssessment: string,
  login: string
}

export interface AssessmentData {
  id: number,
  ownAssessment: number,
  expertAssessment: number,
  managerAssessment: number,
  finalAssessment: number,
  dateOfAssessment: string,
  active: boolean
}

const initialState: AuthState = {
  authData: {
    accessToken: null,
    id: null,
    refreshToken: null,
    isLoading: false,
    error:  null,
  },
  profileData: {
    id: null,
    name: null,
    surname: null,
    managerId: null,
    expertId: null,
    dateOfNextAssessment: null,
    login: null,
    isLoading: false,
    error:  null,
  },
  assessmentData: {
    data: []
  }
}

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state): AuthState => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: true,
      }
    }),

    loginSucess: (state, action: PayloadAction<ProfilePayload>): AuthState => ({
      
      ...state,
      authData: {
        ...state.authData,
        accessToken: action.payload.accessToken,
        id: action.payload.id,
        refreshToken: action.payload.refreshToken,
        isLoading: false,
        error:  null,
      }
    
    
    }),
    loginFailure: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: false,
        error:  action.payload,
      }
    }),
    loadProfileStart: (state): AuthState => ({
      ...state,
      profileData: {
        ...state.profileData,
        isLoading: true,
      }
    }),
    loadProfileSucess: (state, action: PayloadAction<ProfileData>): AuthState => ({
      ...state,
      profileData: {
        ...state.profileData,
        id: action.payload.id,
        name: action.payload.name,
        surname: action.payload.surname,
        managerId: action.payload.managerId,
        expertId: action.payload.expertId,
        dateOfNextAssessment: action.payload.dateOfNextAssessment,
        login: action.payload.login,
        isLoading: false,
        error:  null,
      }
    }),
    loadProfileFailure: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      profileData: {
        ...state.profileData,
        isLoading: false,
        error:  action.payload,
      }
    }),
    loadAssessmentSucess: (state, action: PayloadAction<[]>): AuthState => ({
      ...state,
      assessmentData: {
        ...state.assessmentData,
        data: action.payload,
        isLoading: false,
        error:  null,
      }
    }),
    logoutSuccess: (): AuthState => initialState,
  },
})

export const { loadProfileStart, loadProfileSucess, loadProfileFailure, loginStart, loginSucess, loginFailure, logoutSuccess, loadAssessmentSucess} = authReducer.actions

export default authReducer.reducer