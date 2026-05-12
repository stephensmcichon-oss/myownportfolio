"use client";

import React, { useCallback, useMemo, useState } from "react";
import styles from "./portfolio.module.css";

type NavItem = { id: string; label: string };

const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "testimonials", label: "Testimonials" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const onNavigate = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  }, []);

  const items = useMemo(() => navItems, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <a className={styles.logo} href="#home" onClick={onNavigate}>
          Stephen<span>Cichon</span>
        </a>

        <button
          className={styles.menuBtn}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>

        <ul className={styles.navLinks}>
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={onNavigate}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile */}
        <ul
          className={[
            styles.mobileLinks,
            open ? styles.mobileLinksOpen : "",
          ].join(" ")}
        >
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={onNavigate}>
                {item.label}
              </a>
            </li>
          ))}

          <li>
            <a
              href="#contact"
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={onNavigate}
            >
              <i className="fas fa-paper-plane" aria-hidden="true" /> Hire me
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
