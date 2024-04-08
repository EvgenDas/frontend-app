// login

export interface ILoginRequest {
    login: string,
    password: string
}

export interface ILoginResponse {
    accessToken: string,
    id: number,
    refreshToken: string
}

export interface IProfileResponce {
  id: number,
  name: string,
  surname: string,
  managerId: number,
  expertId: number,
  dateOfNextAssessment: string,
  login: string
}