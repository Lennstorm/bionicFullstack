import axios from "axios";
import { MenuItems } from "../interfaces.ts";
import config from "../config";


const url: string = config.endpoints.menu.get;

const getMenu = async():Promise<MenuItems[]> =>{
   console.log('getMenu funktionen startar')
   try{
     const response = await axios.get(url)
     console.log('efter axios anrop,response',response.data)
     return response.data

   }catch(error) {
    console.error('Failed to get the menu', error)
    throw error
   }
    
    
}

export default getMenu