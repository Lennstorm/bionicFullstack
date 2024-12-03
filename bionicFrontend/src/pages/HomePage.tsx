import { MenuItems } from '../interfaces.ts';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import axios from 'axios';
import './styles/homePage.css';
import MenuItem from '../components/MenuItem.tsx';
import MenuSortComponent from '../components/MenuSortComponent.tsx';
import { Link } from 'react-router-dom';

const url: string = 'https://xicc2u4jn5.execute-api.eu-north-1.amazonaws.com/api/get-menu' //Peters url. 
// Det här skulle behöva importeras från en separat fil istället så vi enkelt kan ändra när man byter stack-adress!!

/* const url: string = 'https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/get-menu' */

const HomePage = () => {
  const [menuItems, setMenuItems] = useState<MenuItems[]>([])

  useEffect(() => {

    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(url)
        console.log(response.data)
        setMenuItems(response.data.data)
      } catch (error) {

        console.log('failed to get the menu', error)
      }

    }

    fetchMenuItems()
  }, [])

  return (

    <div className='page homePage--wrapper'>
      <Header />

      <main >
        <h3 className='about-link
      '>
          Läs mer om Hemkocken 
          <Link className='link-text' to="/about">här</Link>
        </h3>
        <MenuSortComponent />
        <section className='content-container'>
          {menuItems.map((item) => (

            <MenuItem key={item.popularIndex} item={item} />
          ))}
        </section>


      </main>
      <Footer />
    </div>

  )
}

export default HomePage;






/* Författare: Andreas
* Alistair
* Peter
* 
* 
* 
*/