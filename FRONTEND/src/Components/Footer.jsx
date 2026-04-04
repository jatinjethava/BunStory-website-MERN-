import React from 'react'

const Footer = () => {
    return (
        <>
            <section className="newsletter-section">
                <div className="container">
                    <div className="newsletter-content">
                        <h2>Burger Updates in Your Inbox</h2>
                        <p>Get the latest burger news, recipes, and special offers</p>
                        <form className="newsletter-form">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                            />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Footer