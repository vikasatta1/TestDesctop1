import axios, {AxiosResponse} from 'axios';
import {UserType} from "../store/reducers/auth/authReducers";
export default class UserService{
    static async  getUsers():Promise<AxiosResponse<UserType[]>>{
       return  axios.get<UserType[]>('./user.json')
   }
}