import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";


export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> =>
 axiosInstance.post(Endpoints.AUTH.LOGIN, params)