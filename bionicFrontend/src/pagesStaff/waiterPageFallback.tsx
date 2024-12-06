import '../pagesStaff/styles/waiterPage.css'

interface WaiterPageFallbackProps {
  onBackToStaff: () => void;
}

function WaiterPageFallback({ onBackToStaff }: WaiterPageFallbackProps) {
  return (

      <section className='waiter-container'>
        <section className='form-container'>
          <section className='form-row-one'>
            <section className='left-input'>
              <label>Maträtt</label>
              <input type="text" className='edit-dish' value='' readOnly />
            </section>
            <section className='right-input'>
              <label>ordernummer</label>
              <input type="text" value='' className='order-number' readOnly />
            </section>
          </section>
          <section className='form-row-two'>
            <section className='left-column'>
              <label>Antal</label>
              <input type="text" value='' className='edit-quantity' readOnly />
            </section>
            <section className='middle-column'>
              <label>Orderstatus</label>
              <input type="text" value='' className='edit-price' readOnly />
            </section>
            <section className='right-column'></section>
          </section>
          <section className='form-row-three'>
            <section className='comment-from-chef'>
              <label>Kommentar till kocken</label>
              <input type="text" className='comment-chef' value='' readOnly />
            </section>
          </section>
          <section className='button-container'>
            <button disabled>Spara Ändringarna</button>
          </section>
        </section>
        
        <section className='order-container'>
          <h4>Ingen order vald</h4>
          <p>Vänligen gå tillbaka till staff-sidan och välj en order.</p>
          <section className='send-to-kitchen-btn'>
                        <button
                        onClick={onBackToStaff}
                        >Till Ordrar</button>
                    </section>
        </section>
      </section>

  );
}

export default WaiterPageFallback;