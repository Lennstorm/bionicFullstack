import './styles/menu-item.css'

function MenuItem() {
 
 
 
 
    
    return (
    <>
    <section className="menu-container">
    <section className="menu-image">
      <img src="./src/assets/kottbullar.webp"/>  
    </section>
    <article className="menu-header-text">
    <h1>Köttgryta</h1>
    <h2>Pris : 130 kr</h2>
    </article>
    <article className="menu-description">
     <h3>buljong - en smakrik</h3>
    <h3>klassiker som värmer och mättar</h3>
    </article>
    <button>Information</button>
    
    <section className='menu-order-buttons'>
     <button className ="menu-option-button"> V    G     Ä</button>
     <button className="menu-order-button">Beställ</button>     
    </section>
    </section>
   
    </>
)
}

export default MenuItem
