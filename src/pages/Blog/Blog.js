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
        title: "A complex systems approach to aging biology",
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
            <h3>Blog</h3>
            <ul className={styles.blog_navigation_ui}>
              {blogData.map((blog) => (
                <li key={blog.id} className={styles.blog_navigation_li}>
                  <Link
                    to={`/blog/${blog.path}`}
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    className={styles.blog_link}
                  >
                    {blog.title}
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
  


