import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import styles from './blog.module.css';
import HeaderBlog from '../../components/HeaderBlog/HeaderBlog';
import FooterBlog from '../../components/FooterBlog/FooterBlog'
import AgingBiology from './blogs/aging-biology';


function Blog() {
    const blogData = [
      {
        id: 1,
        category:"Aging",
        title: "approaching aging biology",
        author:"Intern",
        date:"November, 26",
        path: "aging-biology",
        component: <AgingBiology />,
      },

    ];
  
    return (
      <>
  
        <HeaderBlog />
        <div className={styles.blog_main_container}>
          {/* Navigation */}
          <nav className={styles.blog_navigation}>
            <div className={styles.glowBorderr}></div>
            <h3>Articles</h3>
            <ul className={styles.blog_navigation_ui}>
              {blogData.map((blog) => (
                <li key={blog.id} className={styles.blog_navigation_li}>
                  <Link
                    to={`/blog/${blog.path}`}
                    className={styles.blog_link}
                  >
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
                        <div className={styles.blog_article_date}>⚕ {blog.date}
                        </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
  
          {/* Content */}
          <div className={styles.blog_content_main_container}>
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
  


