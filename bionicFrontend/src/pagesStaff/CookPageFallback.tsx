import './styles/cookPage.css';
import StaffHeader from '../componentsStaff/StaffHeader';
import StaffNavComponent from '../componentsStaff/StaffNavComponent';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import RoundedButton from '../components/RoundedButton';


interface CookPageFallbackProps {
    onBackToStaff: () => void;
}

function CookPageFallback({ onBackToStaff }: CookPageFallbackProps) {
    return (
        <section className='cookPage--main'>
            <section className='cookPage--formContainer'>
                <section className='cookPage--form-rowOne'>
                    <section className='cookPage--leftInput'>
                        <label>Maträtt</label>
                        <input type="text" className='cookPage--leftInput-dish' value='' readOnly />
                    </section>
                    <section className='cookPage--rightInput'>
                        <label>ordernummer</label>
                        <input type="text" value='' className='cookPage--orderNumber' readOnly />
                    </section>
                </section>
                <section className='cookPage--form-rowTwo'>
                    <section className='cookPage--rowTwo-leftColumn'>
                        <label>Antal</label>
                        <input type="text" value='' className='cookPage--leftColumn-quantity' readOnly />
                    </section>
                    <section className='cookPage--rowTwo-middleColumn'>
                        <label>Orderstatus</label>
                        <input type="text" value='' className='cookPage--price' readOnly />
                    </section>
                    <section className='cookPage--rowTwo-rightColumn'></section>
                </section>
                <section className='cookPage--form-rowThree'>
                    <section className='cookPage--rowThree-comment'>
                        <label>Kommentar till kocken</label>
                        <textarea className='cookPage--chefComment' value='' readOnly />
                    </section>
                </section>
                <section className='button-container'>
                    <button className='cookPage--saveButton' disabled>
                        Spara Ändringarna
                    </button>
                </section>
            </section>

            <section className='cookPage--orderContainer'>
                <h4>Ingen order vald</h4>
                <p>Vänligen gå tillbaka till staff-sidan och välj en order.</p>
                <RoundedButton
                    text="Till ordrar!"
                    onClick={onBackToStaff}
                    color="green"
                    fontStyle="bold"
                   />

            </section>
        </section>
    );
}

export default CookPageFallback;