import './styles/cookPage.css';
import RoundedButton from '../components/RoundedButton';
import { CookPageFallbackProps } from '../../interface/interface'


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

                </div>
            </aside>

            <aside className='cookPage--aside-right'>
                <div className='cookPage--right-heading'>
                    <h4>Order #</h4>
                </div>

                <div className='cookPage--right-orderTable'>
                    <p className="cookPage--orderWindow-itemsList">
                       Ingen order vald. 
                    </p>
                </div>
            </aside>

            <aside className='cookPage--main-leftBtnArea'>

            </aside>
            <aside className='cookPage--main-rightBtnArea'>
                <RoundedButton
                    text="Till ordrar"
                    onClick={onBackToStaff}
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
* 18/12 Ally har varit inne och flyttat interfaces till interface.tsx
* 
*/