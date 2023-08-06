import '../css/Header.css';
import { useAuth } from '../hooks/useAuth.jsx';

function Header() {
    const { username } = useAuth().authUser;
    const auth = useAuth();
    return (
        <>
            <header>
                <a href='/'><h1 className="header-title">Numoria</h1></a>
                <a className="textButton" href="#">
                    <i className="fas fa-leaderboard"></i>
                </a>
                <a className="textButton" href="#">
                    <i className="fas fa-settings"></i>
                </a>
                <div></div>
                {username && (
                    <a className="textButton" href="/profile">
                        <p>{username}</p>
                    </a>

                )}
                <div className="textButton">
                    <i className="fas fa-notification"></i>
                </div>
                {!username ? (
                    <a className="textButton" href="/login">
                        <i className="fas fa-unregistered"></i>
                    </a>
                ) : (
                    <div className="textButton" onClick={auth.logout}>
                        <i className="fas fa-logout"></i>
                    </div>
                )}

            </header>
        </>
    );
}

export default Header;