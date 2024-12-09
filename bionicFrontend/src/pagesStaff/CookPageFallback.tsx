import './styles/cookPage.css';
import { useState } from 'react';
import RoundedButton from '../components/RoundedButton';


interface CookPageFallbackProps {
    onBackToStaff: () => void;
}

function CookPageFallback({ onBackToStaff }: CookPageFallbackProps) {
    return (
        <main className='cookPage--main'>
            <aside className='cookPage--aside-left'>
                <div className='cookPage--left-row1'>
                    <div className='cookPage--row1-field'>
                        <label>Maträtt</label>
                        <input
                            type="text"
                            value=""
                        />
                    </div>
                    <div className="cookPage--row1-field">
                        <label>Ordernummer</label>
                        <input
                            type="text"
                            value=""
                            readOnly
                        />
                    </div>
                </div>

                <div className='cookPage--left-row2'>
                    <div className='cookPage--row2-field'>
                        <label>Antal</label>
                        <input
                            type="number"
                            value=""
                        />
                    </div>

                    <div className='cookPage--row2-field'>
                        <label>Orderstatus</label>
                        <input
                            type="text"
                            value=""
                        />
                    </div>
                </div>

                <div className='cookPage--left-row3'>
                    <div className='cookPage--row3-field'>
                        <label>Kommentar till kocken</label>
                        <textarea
                            value=""
                        />
                    </div>
                    <RoundedButton
                        text="Läst!"
                        onClick={() => console.log('Rounded Button!')}
                        color="blue"
                        fontStyle="bold"
                    />
                </div>
            </aside>

            <aside className='cookPage--aside-right'>
                <div className='cookPage--right-heading'>
                    <h4>Order #</h4>
                </div>

                <div className='cookPage--right-orderTable'>
                    <ul className="cookPage--orderWindow-itemsList">
                        {/* Lista med artiklar tas bort */}
                    </ul>
                </div>
            </aside>

            <aside className='cookPage--main-leftBtnArea'>
                {/* Kommenterad knapp */}
                {/* <RoundedButton
            text="Matlagning påbörjad"
            onClick={() => console.log('Rounded Button!')}
            color="green"
            fontStyle="bold"
        /> */}
            </aside>
            <aside className='cookPage--main-rightBtnArea'>
                <RoundedButton
                    text="Ordern Tillagad!"
                    onClick={() => console.log('Order tillagad!')}
                    color="green"
                    fontStyle="bold"
                />
            </aside>
        </main>

    );
}

export default CookPageFallback;

/* 
*   Författare Andreas
*
* 
* 
*/