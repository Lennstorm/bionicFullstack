
import '../componentsStaff/styles/waiterPage.css'

function WaiterPage() {
    return (
        <section className='waiter-container'>
            <section className='form-container'>
                <section className='form-row-one'>
                    <section className='left-input'>
                        <label>
                            <h5>Redigera Maträtt</h5>
                        </label>
                        <input type="text" id="edit-dish" value='Fläsk med löksås' className='edit-dish'></input>
                    </section>
                    <section className='right-input'>
                        <label>
                            <h5>ordernummer</h5>
                        </label>
                        <input type="text" id="order-number" value="#884574587-8" className='order-number'></input>
                    </section>
                </section>
                <section className='form-row-two'>
                    <section className='left-column'>
                        <label>
                            <h5>Redigera antal</h5>
                        </label>
                        <input type="text" id="edit-quantity" value='1' className='edit-quantity'></input>
                    </section>
                    <section className='middle-column'>
                        <label>
                            <h5>Redigera pris</h5>
                        </label>
                        <input type="text" id="edit-price" value='120' className='edit-price'></input>
                    </section>
                    
                    <section className='right-column'>
                    <label>
                        <h5>Beställning Klar</h5>
                    </label>
                    <input type="text" id="order-ready" className='order-ready'></input>
                    </section>
                </section>


                <section className='form-row-three'>
                <section className='comment-from-chef'>
                <label>
                <h5>Kommentar till kocken</h5>
                </label>
                <input type="text-area" id="comment-chef" value='Ingen lök i såsen' className='comment-chef'></input>
                </section>
               </section>
            <section className='button-container'>
            <button>Spara Ändringarna</button>
            </section>
            </section>
            <section className='order-container'>
            <h4>Order #65497</h4>
            <section className='order-window'>
            <section className='order-dishes'>
             <h1># Maträtt</h1>
             <p>1 Fisk med löksås</p>
             <p>2 Pannkakor</p>
             <p>3 Rårakor med lingon</p>
             <p>4 Pannbiff med lök och potatis</p>
             <p>5 Korv och Mos</p>
             <p>6 Fisk med löksås</p>

             <p></p>
            </section>

            </section>
            <section className='send-to-kitchen-btn'>
            <button>Skicka till köket</button>    
            </section>               
            </section>
        
        </section>
    )
}

export default WaiterPage
