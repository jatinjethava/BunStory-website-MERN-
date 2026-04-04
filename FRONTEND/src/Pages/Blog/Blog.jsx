import React, { useState, useEffect } from 'react'
import './Blog.css'

const Blog = () => {
    const [burgers, setBurgers] = useState([]);
    const [featuredBurger, setFeaturedBurger] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sample burger data
    useEffect(() => {
        const sampleBurgers = [
            {
                id: 1,
                title: "Classic Cheeseburger",
                image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
                excerpt: "Our timeless classic with juicy beef patty, melted cheddar, fresh lettuce, tomato, and signature sauce.",
                content: "The Classic Cheeseburger is the foundation of burger perfection. Made with 100% Angus beef, flame-grilled to perfection, topped with aged cheddar cheese that melts just right. Fresh iceberg lettuce, ripe tomatoes, red onions, and pickles complete this American icon. Served on a toasted brioche bun with our house-made special sauce.",
                date: "2024-01-15",
                category: "Classic",
                rating: 4.8
            },
            {
                id: 2,
                title: "Spicy BBQ Brisket Burger",
                image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop",
                excerpt: "Slow-smoked brisket, spicy BBQ sauce, jalapeños, and pepper jack cheese for the bold flavor seekers.",
                content: "For those who crave heat and smoke, our Spicy BBQ Brisket Burger delivers. Tender brisket smoked for 12 hours, slathered in our house-made spicy BBQ sauce, topped with pepper jack cheese, fresh jalapeños, crispy onion rings, and a touch of chipotle mayo. This burger bites back!",
                date: "2024-01-20",
                category: "BBQ",
                rating: 4.9
            },
            {
                id: 3,
                title: "Truffle Mushroom Swiss",
                image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400&h=300&fit=crop",
                excerpt: "Gourmet blend of wild mushrooms, truffle aioli, and melted Swiss cheese on a grass-fed beef patty.",
                content: "Elevate your burger experience with our Truffle Mushroom Swiss. Fresh wild mushrooms sautéed with garlic and thyme, finished with luxurious truffle aioli. Topped with melted Swiss cheese on our premium grass-fed beef patty. Served with arugula and caramelized onions on a pretzel roll.",
                date: "2024-01-25",
                category: "Gourmet",
                rating: 4.7
            },
            {
                id: 4,
                title: "Vegan Beyond Burger",
                image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
                excerpt: "Plant-based perfection with Beyond Meat patty, vegan cheese, and all the classic toppings.",
                content: "Our Vegan Beyond Burger proves burgers don't need meat to be delicious. The Beyond Meat patty grills up with the perfect texture and flavor, topped with Follow Your Heart vegan cheese, fresh avocado, sprouts, tomato, and our vegan special sauce. Served on a whole wheat bun.",
                date: "2024-01-28",
                category: "Vegan",
                rating: 4.6
            }
        ];

        setBurgers(sampleBurgers);
        setFeaturedBurger(sampleBurgers[0]);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading delicious content...</p>
            </div>
        );
    }

    return (
        <>
            <div className="burger-blog">
                {/* Hero Section */}
                <header className="hero-section">
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <h1 className="hero-title">Burger Blog</h1>
                        <p className="hero-subtitle">Discover the art of the perfect burger</p>
                    </div>
                </header>

                {/* Featured Burger */}
                <section className="featured-section">
                    <div className="container">
                        <h2 className="section-title">Featured Burger</h2>
                        {featuredBurger && (
                            <article className="featured-burger">
                                <div className="featured-image">
                                    <img src={featuredBurger.image} alt={featuredBurger.title} />
                                </div>
                                <div className="featured-content">
                                    <span className="category-badge">{featuredBurger.category}</span>
                                    <h3>{featuredBurger.title}</h3>
                                    <div className="rating">
                                        ★ {featuredBurger.rating}/5
                                    </div>
                                    <p>{featuredBurger.content}</p>
                                    <div className="burger-meta">
                                        <span>{new Date(featuredBurger.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </article>
                        )}
                    </div>
                </section>

                {/* Burger Grid */}
                <section className="burgers-grid-section">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">Latest Burger Reviews</h2>
                            <p className="section-subtitle">Fresh from the grill</p>
                        </div>
                        <div className="burgers-grid">
                            {burgers.map(burger => (
                                <article key={burger.id} className="burger-card">
                                    <div className="burger-image">
                                        <img src={burger.image} alt={burger.title} />
                                        <div className="image-overlay">
                                            <span className="category">{burger.category}</span>
                                        </div>
                                    </div>
                                    <div className="burger-content">
                                        <h3>{burger.title}</h3>
                                        <p>{burger.excerpt}</p>
                                        <div className="burger-footer">
                                            <div className="rating">★ {burger.rating}</div>
                                            <span className="date">
                                                {new Date(burger.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
export default Blog