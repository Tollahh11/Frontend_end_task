export default  function Contact(){
    return(<>
        <section className="contact" id="contact">
            <div>
                <h1>Send us a message</h1>
                <form action="">
                    <label for="email">Email</label><br/>
                    <input type="email" name="email" id="mail"/><br/><br/>
                    <label for="number">Phone Number</label><br/>
                    <input type="number" name="number" id="number"/><br/><br/>
                    <label for="message">Send Message</label><br/>
                    <textarea name="message" id="message"></textarea><br/><br/>
                    <button type="submit" id="Login">Send</button>            
                </form>
            </div>
        </section>
    </>)
}