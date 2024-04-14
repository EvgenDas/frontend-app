import { Dispatch } from "@reduxjs/toolkit"
import api from "../../api"
import { ILoginRequest , ILoginResponse} from "../../api/auth/types"
import { loginStart, loginSucess, loginFailure, logoutSuccess, loadProfileStart, loadProfileSucess, loadProfileFailure, loadAssessmentSucess} from "./authReducer"
import { history } from '../../utils/history'
import { store } from "..";
import { isTokenExpired } from "../../utils/jwt"


export const loginUser =
  (data: ILoginRequest) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(loginStart())

        const res = await api.auth.login(data)
        
        
        const input = {
          id: res.data.id,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken
        };

        dispatch(loginSucess(input))
        dispatch(getProfile())
        console.debug(res.data)
        
      } catch (e) {
        console.error(e)

        dispatch(loginFailure(e.message))
      }
    }

export const logoutUser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
      try {

        dispatch(logoutSuccess())

        history.push('/')
      } catch (e) {
          console.error(e)
      }
  }

export const getProfile = () =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(loadProfileStart())

      
      const res = await api.auth.getProfile()
      const input = {
        id: res.data.id,
        name: res.data.name,
        surname: res.data.surname,
        managerId: res.data.managerId,
        expertId: res.data.expertId,
        dateOfNextAssessment: res.data.dateOfNextAssessment,
        login: res.data.login
      };

      dispatch(loadProfileSucess(input))
    } catch (e) {
      console.error(e)

      dispatch(loadProfileFailure(e.message))
    }
  }

  export const getAssessments = () =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      
      const res = await api.auth.getAssessments()


      dispatch(loadAssessmentSucess(res.data))
      console.error(res.data)
    } catch (e) {
      console.error(e)

    }
  }

  let refreshTokenRequest: AxiosPromise<ILoginResponse> | null = null
  
  export const getAccessToken =
    () =>
    async (dispatch: Dispatch<any>): Promise<string | null> => {
        try {
            const accessToken = store.getState().auth.authData.accessToken
            const refreshToken = store.getState().auth.authData.refreshToken


            if (!accessToken || isTokenExpired(accessToken)) {
              if (refreshTokenRequest === null) {
                refreshTokenRequest = api.auth.refreshToken(refreshToken)
              }

              const res = await refreshTokenRequest
              refreshTokenRequest = null

              const input = {
                id: res.data.id,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken
              };

              dispatch(loginSucess(input))

              return res.data.accessToken
            }
            console.error(store.getState().auth.authData.refreshToken)
            return accessToken
            
        } catch (e) {
            console.error(e)

            return null
        }
      }
