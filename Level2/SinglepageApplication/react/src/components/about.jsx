export default function About(){
    return(<>
        <section className="about" id="about">
        <div className="container">
            <div className="about-content">
                <div className="about-text">
                    <h2>Innovation Meets Excellence</h2>
                    <p>With over a decade of experience in digital transformation, we've helped thousands of businesses achieve their goals through innovative technology solutions.</p>
                    <p>Our team of experts combines creativity with technical expertise to deliver solutions that not only meet today's challenges but anticipate tomorrow's opportunities.</p>
                    <a href="#contact" className="cta-button" style={{background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", marginTop: "1rem"}}>Get Started Today</a>
                </div>
                <div className="about-image">
                    <div className="about-image-placeholder">
                        📊 Interactive Dashboard Preview
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>)
}