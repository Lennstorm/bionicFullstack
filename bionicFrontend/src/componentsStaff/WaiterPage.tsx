
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
                        <input type="text" id="edit-dish" className='edit-dish'></input>
                    </section>
                    <section className='right-input'>
                        <label>
                            <h5>ordernummer</h5>
                        </label>
                        <input type="text" id="order-number"className='order-number'></input>
                    </section>
                </section>
                <section className='form-row-two'>
                    <section className='left-column'>
                        <label>
                            <h5>Redigera antal</h5>
                        </label>
                        <input type="text" id="edit-quantity" className='edit-quantity'></input>
                    </section>
                    <section className='middle-column'>
                        <label>
                            <h5>Redigera pris</h5>
                        </label>
                        <input type="text" id="edit-price" className='edit-price'></input>
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
                <input type="text-area" id="comment-chef" className='comment-chef'></input>
                </section>
               </section>
            <section className='button-container'>
            <button>Spara Ändringarna</button>
            </section>
            </section>
            <section className='order-container'>
            <h4>Order #65497</h4>
            <section className='order-window'>
            

            </section>
            <section className='send-to-kitchen-btn'>
            <button>Skicka till köket</button>    
            </section>               
            </section>
        
        </section>
    )
}

export default WaiterPage
