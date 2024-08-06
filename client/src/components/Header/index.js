import './Header.css'
import { Row, Col } from 'react-bootstrap'


const Header = () => {
    return (
        <section id="header">

            <div className="mt-3 d-flex col-6 justify-content-left">

                <img
                    src="/ECNFM.png"
                    alt="Empire Cheesecake Logo"
                    height="80px" />

            </div>

        </section>
    );
};

export default Header;
