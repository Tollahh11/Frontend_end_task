export default function Header(){
    return(<>
        <nav id="navbar">
        <div className="nav-container">
            <div className="logo">InnovateTech</div>
            <ul className="nav-links" id="navLinks">
                <li><a href="#home">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div className="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>
    <section className="hero" id="home">
        <div className="hero-content">
            <h1>Transform Your Digital Future</h1>
            <p>Cutting-edge solutions that revolutionize the way businesses operate in the digital landscape. Experience innovation like never before.</p>
            <a href="#features" className="cta-button">Discover More</a>
        </div>
    </section>
    </>)
}