import React, { useRef, useState } from "react";
import styles from "../blog.module.css";

function ImageWithMagnifier({ src, alt, note }) {
  const imgRef = useRef(null);

  // State for the magnifier's style
  const [magnifierStyle, setMagnifierStyle] = useState({
    display: "none",
    left: "0px",
    top: "0px",
    backgroundPosition: "0px 0px",
  });

  // Constants for magnifier settings
  const magnifierSize = 100; // Diameter of the magnifier circle
  const zoomLevel = 2; // Magnification level

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();

    // Get mouse coordinates relative to the image
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Ensure the mouse is within the bounds of the image
    if (x < 0 || y < 0 || x > width || y > height) {
      setMagnifierStyle({ ...magnifierStyle, display: "none" });
      return;
    }

    // Calculate background position to center the magnified area
    const backgroundX = -(x * zoomLevel - magnifierSize / 2) + "px";
    const backgroundY = -(y * zoomLevel - magnifierSize / 2) + "px";

    // Update the magnifier's position and background
    setMagnifierStyle({
      display: "block",
      left: `${x - magnifierSize / 2}px`,
      top: `${y - magnifierSize / 2}px`,
      backgroundPosition: `${backgroundX} ${backgroundY}`,
    });
  };

  const handleMouseLeave = () => {
    setMagnifierStyle({ ...magnifierStyle, display: "none" });
  };

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      {/* Original Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={styles.blog_image_medium}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ width: "300px", height: "auto", cursor: "crosshair" }}
      />

      {/* Magnifier */}
      <div
        style={{
          ...magnifierStyle,
          position: "absolute",
          width: `${magnifierSize}px`,
          height: `${magnifierSize}px`,
          borderRadius: "50%",
          border: "1px solid #ccc",
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${imgRef.current?.width * zoomLevel}px ${imgRef.current?.height * zoomLevel}px`,
          pointerEvents: "none", // Prevent interfering with mouse events
        }}
      ></div>

      {/* Footer Note */}
      <p style={{ marginTop: "10px", fontSize: "14px", fontStyle: "italic" }}>
        {note}
      </p>
    </div>
  );
}

export default ImageWithMagnifier;
