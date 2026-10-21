import { useState } from "react";

function BlogCard({ post }) {
  const [imageFailed, setImageFailed] = useState(false);
  const { title, description, category, author, date, image } = post;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <article className="blog-card">
      <div className="blog-card__media">
        {imageFailed ? (
          <div
            className="blog-card__fallback"
            role="img"
            aria-label={`Placeholder image for ${title}`}
          >
            {category}
          </div>
        ) : (
          <img
            src={image}
            alt={`Cover image for the article: ${title}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}
        <span className="blog-card__category">{category}</span>
      </div>

      <div className="blog-card__body">
        <h3 className="blog-card__title">{title}</h3>
        <p className="blog-card__description">{description}</p>

        <footer className="blog-card__meta">
          <span className="blog-card__author">By {author}</span>
          <time dateTime={date}>{formattedDate}</time>
        </footer>
      </div>
    </article>
  );
}

export default BlogCard;
