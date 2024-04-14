import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import { store } from "../../store";
import { AxiosPromise } from "axios";


export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> =>
 axiosInstance.post(Endpoints.AUTH.LOGIN, params)

export const getProfile = (): AxiosPromise<IProfileResponse> =>
    axiosInstance.get(Endpoints.AUTH.PROFILE + store.getState().auth.authData.id)

export const getManagerStaff = (): AxiosPromise<IProfileResponse> =>
    axiosInstance.get(Endpoints.AUTH.PROFILE + store.getState().auth.authData.id + '/staff')

export const getExpertStaff = (): AxiosPromise<IProfileResponse> =>
    axiosInstance.get(Endpoints.AUTH.PROFILE + store.getState().auth.authData.id + '/staff/expertise')

export const getAssessments = (): AxiosPromise<IProfileAssessments[]> =>
    axiosInstance.get(Endpoints.AUTH.PROFILE + store.getState().auth.authData.id + '/assessments')

export const refreshToken = (params: string): AxiosPromise<ILoginResponse> =>
 axiosInstance.post(Endpoints.AUTH.REFRESH, params)