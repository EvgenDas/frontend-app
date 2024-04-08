import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import { store } from "../../store";
import { AxiosPromise } from "axios";


export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> =>
 axiosInstance.post(Endpoints.AUTH.LOGIN, params)


export const getProfile = (): AxiosPromise<IProfileResponse> =>
    axiosInstance.get(Endpoints.AUTH.PROFILE + store.getState().auth.authData.id)

export const refreshToken = (params: string): AxiosPromise<ILoginResponse> =>
 axiosInstance.post(Endpoints.AUTH.REFRESH, params)