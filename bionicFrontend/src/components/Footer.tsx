import '../components/styles/footer.css'

function Footer() {
    return (
        <div className='footer-container'>
            <section className='left-section'>
                <h3 className="footer-text">
                    Södra Torggatan 16
                </h3>
            </section>
            <section className='socials-section'>
                <img className='footer-icon' src="./src/assets/facebook.svg" alt="" />
                <img className='footer-icon' src="./src/assets/insta.svg" alt="" />
                <img className='footer-icon' src="./src/assets/e-post.svg" alt="" />
            </section>
            <section className='rightSection'>
                <img className='footer-telephone' src="./src/assets/telefon.svg" alt="" />
                <h3 className="footer-text">
                    010-4983020
                </h3>
            </section>

        </div>
    )
}

export default Footer
