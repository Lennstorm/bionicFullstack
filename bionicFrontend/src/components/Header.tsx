import '../components/styles/header.css'

function Header() {
    return (
        <div className='header -container'>
            <img className='header-logo' src="./bionicFrontend/src/assets/logo.svg" alt="company logo" />
            <h1 className="header-h1">TakewAway</h1>
            <img src="./bionicFrontend/src/asets/kundkorg.svg" alt="basket symbol" className="kundkorg" />
            <button className='login-btn'>login btn</button>

        </div>
    )
}

export default Header
