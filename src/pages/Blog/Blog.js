import React from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import styles from './blog.module.css';
import HeaderBlog from '../../components/HeaderBlog/HeaderBlog';
import FooterBlog from '../../components/FooterBlog/FooterBlog';
import BryanJohnson from './blogs/bryan_johnson';
import BlogMatrixEffect from './components_blog/BlogMatrixEffect'

function Blog() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const blogData = [
    {
      id: 1,
      category: "Live Forever",
      title: "Is Bryan Johnson behind DrPepe.ai? The conspiracy…",
      author: "Intern",
      date: "November, 24",
      path: "is-bryan-johnson-behind-drpepeai",
      component: <BryanJohnson />,
    },
  ];

  // Check if the current path matches any blog's path
  const isViewingArticle = blogData.some(blog => `/blog/${blog.path}` === location.pathname);

  return (
    <>
      <HeaderBlog />
      <div className={styles.blog_main_container}>
        {/* Back to Blog button */}
        {isViewingArticle && (
          <button
            className={styles.blog_back_button}
            onClick={() => navigate('/blog')}
          >
            ← Back to Blog
          </button>
        )}

        {/* Conditionally render navigation */}
        {!isViewingArticle && (
          <nav className={styles.blog_navigation}>
            <div className={styles.glowBorderr}></div>
            <h3>Articles</h3>
            <ul className={styles.blog_navigation_ui}>
              {blogData.map((blog) => (
                <li key={blog.id} className={styles.blog_navigation_li}>
                  <Link to={`/blog/${blog.path}`} className={styles.blog_link}>
                    <div className={styles.blog_article_category}>
                      {blog.category}
                    </div>
                    <div className={styles.blog_article_title}>
                      {blog.title}
                    </div>
                    <div className={styles.blog_article_author_date_container}>
                      <div className={styles.blog_article_author}>
                        By {blog.author}
                      </div>
                      <div className={styles.blog_article_date}>⚕ {blog.date}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Content */}
        <div className={styles.blog_content_main_container}>
          {location.pathname.startsWith('/blog') && ( 
            <div className={styles.blog_custom_container}>
              <BlogMatrixEffect />
            </div>
          )}
          <Routes>
            {blogData.map((blog) => (
              <Route
                key={blog.id}
                path={blog.path}
                element={blog.component || <p>{blog.content}</p>}
              />
            ))}
            <Route path="/" />
          </Routes>
        </div>  
      </div>
      <FooterBlog />
    </>
  );
}

export default Blog;
