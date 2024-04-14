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

export interface IProfileResponse {
  id: number,
  name: string,
  surname: string,
  managerId: number,
  expertId: number,
  dateOfNextAssessment: string,
  login: string
}

export interface IProfileAssessments {
  id: number,
  ownAssessment: number,
  expertAssessment: number,
  managerAssessment: number,
  finalAssessment: number,
  dateOfAssessment: string,
  active: boolean
}