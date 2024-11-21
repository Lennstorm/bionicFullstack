import './styles/menu-item.css'
import { MenuItems } from '../interfaces.ts';

interface MenuItemProps {
  item: MenuItems
}

function MenuItem({ item }: MenuItemProps) {

  return (
    <>
      <section className="menu-container">
        <section className="menu-image">
          <img src={item.image} />
        </section>
        <article className="menu-header-text">
          <h1>{item.articleName}</h1>
          <h2>Pris : {item.price}</h2>
        </article>
        <article className="menu-description">
          <h3>{item.description}</h3>

        </article>
        <section className='menu-information-btn'>
          <button>Information</button>
        </section>
        <section className='menu-order-buttons'>
          <button className="menu-option-button"> V    G     Ä</button>
          <button className="menu-order-button">Beställ</button>
        </section>
      </section>

    </>
  )
}

export default MenuItem
