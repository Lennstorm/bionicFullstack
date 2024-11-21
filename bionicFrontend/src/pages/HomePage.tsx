import { MenuItems } from '../interfaces.ts';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import axios from 'axios';
import './styles/homePage.css';
import MenuItem from '../components/MenuItem.tsx';
const url:string  = 'https://xicc2u4jn5.execute-api.eu-north-1.amazonaws.com/api/get-menu'

const HomePage = () => {
    const [menuItems, setMenuItems] = useState<MenuItems[]>([])
    
    
    useEffect(()=>{

        const fetchMenuItems = async () =>{
            try{
              const response = await axios.get(url)
              console.log(response.data)
              setMenuItems(response.data.data)
            } catch (error){
        
              console.log('failed to get the menu',error)        
            }
        
            }
    
      fetchMenuItems()
    },[])
    
      
        return (
      
        <div className='homePage--wrapper'>
            <Header />
            <main className='content-container'>
             {menuItems.map((item) => (
              
              <MenuItem key={item.popularIndex} item={item} />
               ))}
            </main>
            <Footer />
            </div>
           
   )
}

export default HomePage;






/* Författare: Andreas
* Alistair
* 
* 
* 
* 
*/