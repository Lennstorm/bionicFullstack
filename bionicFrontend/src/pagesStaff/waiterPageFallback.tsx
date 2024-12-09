import '../pagesStaff/styles/waiterPage.css'

interface WaiterPageFallbackProps {
  onBackToStaff: () => void;
}

function WaiterPageFallback({ onBackToStaff }: WaiterPageFallbackProps) {
  return (

      <section className='waiterPage--main'>
        <section className='waiterPage--formContainer'>
          <section className='waiterPage--form-rowOne'>
            <section className='waiterPage--leftInput'>
              <label>Maträtt</label>
              <input type="text" className='waiterPage--leftInput-dish' value='' readOnly />
            </section>
            <section className='waiterPage--rightInput'>
              <label>ordernummer</label>
              <input type="text" value='' className='waiterPage--orderNumber' readOnly />
            </section>
          </section>
          <section className='waiterPage--form-rowTwo'>
            <section className='waiterPage--rowTwo-leftColumn'>
              <label>Antal</label>
              <input type="text" value='' className='waiterPage--leftColumn-quantity' readOnly />
            </section>
            <section className='waiterPage--rowTwo-middleColumn'>
              <label>Orderstatus</label>
              <input type="text" value='' className='waiterPage--price' readOnly />
            </section>
            <section className='waiterPage--rowTwo-rightColumn'></section>
          </section>
          <section className='waiterPage--form-rowThree'>
            <section className='waiterPage--rowThree-comment'>
              <label>Kommentar till kocken</label>
              <input type="text" className='waiterPage--chefComment' value='' readOnly />
            </section>
          </section>
          <section className='button-container'>
            <button className='waiterPage--saveButton' disabled >Spara Ändringarna</button>
          </section>
        </section>
        
        <section className='waiterPage--orderContainer'>
          <h4>Ingen order vald</h4>
          <p>Vänligen gå tillbaka till staff-sidan och välj en order.</p>
          
                        <button className='waiterPage--sendButton'
                        onClick={onBackToStaff}
                        >Till Ordrar</button>
          
        </section>
      </section>

  );
}

export default WaiterPageFallback;