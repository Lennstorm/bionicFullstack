import '../components/styles/header.css'

function Header() {
    return (
        <div className='header -container'>
            <img className='header-logo' src="./bionicFrontend/src/assets/logo.svg" alt="company logo" />
            <img className='header-image' src="./bionicFrontend/src/assets/headerImg.png" alt="header image" />
            <h1 className="header-h1">TakewAway</h1>
            <img src="./bionicFrontend/src/asets/kundkorg.svg" alt="basket symbol" className="kundkorg" />

            <button>login</button>

        </div>
    )
}

export default Header
