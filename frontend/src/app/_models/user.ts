export interface User{
     username: string,
     token: string,
     photoUrl: string,
     knownAs: string,
     gender: string,
     roles: string[]
}


export interface UserRoles{
     name: string,
     value: string,
     checked: boolean
}