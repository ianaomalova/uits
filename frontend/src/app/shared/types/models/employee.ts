export interface IEmployee {
  id: number,
  avatar: string,
  first_name: string,
  last_name: string,
  patronymic: string,
  
  degree?: string,
  rank?: string,
  position: string,
  experience?: number,
  professional_experience?: number,
  
  phone_number?: string,
  email?: string,
  messenger?: string,
  
  education?: string,
  qualification?: string,
  
  bio?: string
}
