import { useState } from "react";
import posts from "./data/posts.json";
import BlogCard from "./components/BlogCard";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [...new Set(posts.map((post) => post.category))];

  const query = searchTerm.trim().toLowerCase();

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    const matchesSearch =
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleCategoryChange = (event) => setSelectedCategory(event.target.value);
  const handleClearSearch = () => setSearchTerm("");
  const handleResetAll = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  const countLabel = `${filteredPosts.length} ${
    filteredPosts.length === 1 ? "article" : "articles"
  }`;

  return (
    <>
      <header className="site-header">
        <nav className="nav" aria-label="Main navigation">
          <a className="nav__brand" href="#top">
            INK<span>SPACE</span>
          </a>
          <ul className="nav__links">
            <li><a href="#top">Home</a></li>
            <li><a href="#articles">Articles</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>

        <section className="hero" id="top">
          <div className="hero__text">
            <p className="hero__eyebrow">The Editorial · Issue 01</p>
            <h1 className="hero__title">
              Ideas Worth <em>Sharing.</em>
            </h1>
            <p className="hero__intro">
              Short, thoughtful reads on technology, code, design and everyday
              life, written by students and makers who love explaining things.
            </p>
            <a className="hero__cta" href="#articles">
              Start reading
            </a>
          </div>

          <aside className="hero__stats" aria-label="Site statistics">
            <div className="stat">
              <span className="stat__number">{posts.length}</span>
              <span className="stat__label">Articles</span>
            </div>
            <div className="stat">
              <span className="stat__number">{categories.length}</span>
              <span className="stat__label">Topics</span>
            </div>
          </aside>
        </section>
      </header>

      <main className="container" id="articles">
        <section className="toolbar" aria-labelledby="articles-heading">
          <div className="toolbar__heading">
            <h2 id="articles-heading">Latest Articles</h2>
            <p className="toolbar__count" aria-live="polite">
              {countLabel} found
            </p>
          </div>

          <form
            className="filters"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="field field--search">
              <label htmlFor="search">Search articles</label>
              <div className="search-box">
                <input
                  id="search"
                  type="text"
                  placeholder="Try “react”, “design” or an author…"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  autoComplete="off"
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="search-box__clear"
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="field field--category">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </section>

        {filteredPosts.length > 0 ? (
          <section className="grid" aria-label="Blog posts">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </section>
        ) : (
          <section className="empty" aria-live="polite">
            <p className="empty__mark" aria-hidden="true">∅</p>
            <h3>No articles match your search</h3>
            <p>
              We couldn’t find anything for “{searchTerm.trim() || selectedCategory}”.
              Check your spelling, try a shorter keyword, or browse every
              category.
            </p>
            <button type="button" className="btn" onClick={handleResetAll}>
              Reset search and filters
            </button>
          </section>
        )}
      </main>

      <footer className="site-footer" id="about">
        <div className="site-footer__inner">
          <div>
            <p className="site-footer__brand">
              INK<span>SPACE</span>
            </p>
            <p className="site-footer__tagline">Ideas Worth Sharing.</p>
          </div>
          <p className="site-footer__about">
            INKSPACE is a college mini project built with React, Vite and plain
            CSS to demonstrate components, props, state and events.
          </p>
          <p className="site-footer__copy">© 2026 INKSPACE. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
