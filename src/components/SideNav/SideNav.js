import React from "react";
import styles from "./SideNav.module.css";

const documentSections = [
  {
    id: "abstract",
    title: "Abstract",
    content: `
      For the first time in humans, clinical research shows the ability to reverse human aging 
      exponentially with the capacity for immortality via intermittent hyperoxia...`,
  },
  {
    id: "introduction",
    title: "Introduction - A Complex Systems Approach to Aging Biology",
    content: `
      In the recent paper, A Complex Systems Approach to Aging Biology, aging is generally quantified 
      in the following computationally efficient way: ...`,
  },
  {
    id: "mechanism",
    title: "Mechanism of Action",
    content: `
      The following is a brief high-level outline of how intermittent hyperoxia causes systemic rejuvenation 
      of the human body, which is followed by a full analysis...`,
  },
  {
    id: "systemic-regeneration",
    title: "Systemic Regeneration Cascade",
    content: `
      The cumulative effects of intermittent hyperoxia can initiate a systemic regeneration cascade, 
      promoting stem cell mobilization and enhanced tissue repair mechanisms...`,
  },
  {
    id: "risks",
    title: "Risks",
    content: `
      Intermittent hyperoxia presents specific risks for individuals with diabetes and cancer...`,
  },
  {
    id: "oxidative-stress",
    title: "Oxidative Stress",
    content: `
      Oxidative stress is an imbalance between reactive oxygen species (ROS) production and the body's ability 
      to neutralize them with antioxidants...`,
  },
  {
    id: "telomere-regulation",
    title: "Telomere Regulation",
    content: `
      Telomeres are specialized structures at chromosome ends, crucial for genomic stability and cellular longevity...`,
  },
];

function SideNav() {
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.container}>
      {/* Sidebar Navigation */}
      <nav className={styles.sidenav}>
        <h1 className={styles.logo}>Immortality</h1>
        <ul className={styles.nav_list}>
          {documentSections.map((section) => (
            <li key={section.id} className={styles.nav_item}>
              <button
                onClick={() => handleScroll(section.id)}
                className={styles.navlink}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Scrollable Content */}
      <main className={styles.content}>
        {documentSections.map((section) => (
          <section key={section.id} id={section.id} className={styles.section}>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </section>
        ))}
      </main>
    </div>
  );
}

export default SideNav;
