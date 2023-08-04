import '../css/Header.css';

function Header() {
    return (
        <>
            <header>
                <h1 className="header-title">Numoria</h1>
                <a className="textButton" href="#">
                    <i className="fas fa-leaderboard"></i>
                </a>
                <a className="textButton" href="#">
                    <i className="fas fa-settings"></i>
                </a>
                <div></div>
                <div className="textButton">
                    <i className="fas fa-notification"></i>
                </div>
                <a className="textButton" href="#">
                    <i className="fas fa-unregistered"></i>
                </a>
            </header>
        </>
    );
}

export default Header;