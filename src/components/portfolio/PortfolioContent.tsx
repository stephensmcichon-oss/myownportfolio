"use client";

import React, { useEffect } from "react";
import Interactive2DScene from "../Interactive2DScene/Interactive2DScene";
import NavBar from "./NavBar";
import styles from "./portfolio.module.css";

function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add(styles.fadeInActive);
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.12 }
    );

    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, []);
}

export default function PortfolioContent() {
  useScrollReveal();

  return (
    <div className={styles.pageRoot}>
      <Interactive2DScene />
      <NavBar />

      {/* HERO */}
      <section id="home" className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div
              className={[styles.fadeIn].join(" ")}
              data-reveal
            >
              <div className={styles.heroBadge}>
                <i className="fas fa-bolt" aria-hidden="true" />
                High-ROI ads + fast, SEO-optimized websites
              </div>

              <h1 className={styles.heroTitle}>
                Hi, {"I\u0027m"} <span>Stephen S. Cichon</span>
              </h1>

              <p className={styles.heroSub}>
                Digital Marketing Specialist & WordPress/Shopify Developer.
                I help brands increase conversions through high-performing
                ads + fast websites.
              </p>

              <div className={styles.heroActions}>
                <a
                  className={[styles.btn, styles.btnPrimary].join(" ")}
                  href="/resume.pdf"
                  download
                >
                  <i className="fas fa-briefcase" aria-hidden="true" />
                  Download Resume
                </a>

                <a
                  className={[styles.btn, styles.btnOutline].join(" ")}
                  href="#contact"
                >
                  <i className="fas fa-envelope" aria-hidden="true" />
                  Contact Me
                </a>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div
              className={[styles.heroCard, styles.fadeIn].join(" ")}
              data-reveal
            >
              <div className={styles.profileRow}>
                <img
                  className={styles.profileImg}
                  src="/profile.jpg.jpg"
                  alt="Stephen S. Cichon"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
                <div>
                  <div className={styles.profileName}>Stephen S. Cichon</div>
                  <div className={styles.profileMeta}>
                    <span className={styles.pill}>
                      <i className="fas fa-circle" aria-hidden="true" />{" "}
                      Available
                    </span>
                    <span className={styles.pill}>
                      <i className="fas fa-code" aria-hidden="true" /> 12+ years
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt22" style={{ position: "relative" }}>
                <div style={{ fontWeight: 950, marginBottom: 10 }}>
                  Technical Toolbox
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span className={styles.tag}>
                    <i className="fab fa-google" aria-hidden="true" /> Google Ads
                  </span>
                  <span className={styles.tag}>
                    <i className="fas fa-tags" aria-hidden="true" /> GTM/GA4
                  </span>
                  <span className={styles.tag}>
                    <i className="fab fa-shopify" aria-hidden="true" /> Liquid
                  </span>
                  <span className={styles.tag}>
                    <i className="fab fa-wordpress" aria-hidden="true" /> WP/Woo
                  </span>
                  <span className={styles.tag}>
                    <i className="fab fa-php" aria-hidden="true" /> PHP/Laravel
                  </span>
                </div>

                <div style={{ marginTop: 14, color: "rgba(247,247,251,0.78)" }}>
                  <i className="fas fa-bullseye" aria-hidden="true" />{" "}
                  Results-driven: A/B testing, conversion audits, performance tuning.
                </div>
              </div>
            </div>

            <div
              className={[styles.heroCard, styles.fadeIn].join(" ")}
              data-reveal
              style={{ maxWidth: 520 }}
            >
              <div style={{ fontWeight: 950, marginBottom: 10 }}>
                Quick wins
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className={styles.card} style={{ minHeight: 0 }}>
                  <div className={styles.cardTitle} style={{ fontSize: 22 }}>
                    98%
                  </div>
                  <div className={styles.cardBody}>Retention</div>
                </div>
                <div className={styles.card} style={{ minHeight: 0 }}>
                  <div className={styles.cardTitle} style={{ fontSize: 22 }}>
                    150+
                  </div>
                  <div className={styles.cardBody}>Projects</div>
                </div>
                <div className={styles.card} style={{ minHeight: 0 }}>
                  <div className={styles.cardTitle} style={{ fontSize: 22 }}>
                    4.9
                  </div>
                  <div className={styles.cardBody}>Rating</div>
                </div>
                <div className={styles.card} style={{ minHeight: 0 }}>
                  <div className={styles.cardTitle} style={{ fontSize: 22 }}>
                    ROAS
                  </div>
                  <div className={styles.cardBody}>↑ Measured growth</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionTitle} data-reveal>
            What I Do
          </div>
          <div className={styles.sectionSub} data-reveal>
            Specialized services to scale your business globally
          </div>

          <div className="mt22" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 14 }}>
            {[
              {
                icon: "fab fa-google",
                title: "Google Ads",
                body: "High-ROI campaign management, keyword research, A/B testing for US, SG & AU markets.",
                tags: ["Search Ads", "Shopping"],
              },
              {
                icon: "fab fa-wordpress",
                title: "WordPress Development",
                body: "Custom themes/plugins, speed optimization, WooCommerce solutions for global e-commerce.",
                tags: ["PHP", "WooCommerce"],
              },
              {
                icon: "fab fa-shopify",
                title: "Shopify Development",
                body: "Theme customization, Liquid coding, app integration, performance tuning.",
                tags: ["Liquid", "Speed"],
              },
              {
                icon: "fas fa-chart-line",
                title: "CRO & Analytics",
                body: "GA4, GTM, heatmaps, A/B testing, conversion audits to maximize revenue.",
                tags: ["GA4", "Hotjar"],
              },
            ].map((s) => (
              <div
                key={s.title}
                className={[styles.card, styles.fadeIn].join(" ")}
                data-reveal
                style={{ minHeight: 210 }}
              >
                <div className={styles.cardIcon} aria-hidden="true">
                  <i className={s.icon} />
                </div>
                <div className={styles.cardTitle}>{s.title}</div>
                <div className={styles.cardBody}>{s.body}</div>
                <div className={styles.tagsRow}>
                  {s.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section
        id="portfolio"
        className={styles.section}
        style={{ background: "rgba(17,18,26,0.9)" }}
      >
        <div className={styles.sectionInner}>
          <div className={styles.sectionTitle} data-reveal>
            Featured Projects
          </div>
          <div className={styles.sectionSub} data-reveal>
            Case studies: from challenge to measurable ROI
          </div>

          <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
            {[
              {
                icon: "fas fa-chart-simple",
                title: "Global E-commerce ROAS Boost",
                items: [
                  ["Challenge", "US outdoor retailer low ROAS (2.5x) across US/SG/AU."],
                  ["Action", "Geo-targeted campaigns, tROAS bidding, local feed optimization."],
                  ["Result", "ROAS ↑ 4.2x, CPA ↓32% in 3 months."],
                ],
                badge: "+68% ROAS",
                badgeIcon: "fas fa-globe",
                tags: ["Google Ads", "International"],
              },
              {
                icon: "fas fa-graduation-cap",
                title: "Custom WordPress LMS (APAC)",
                items: [
                  ["Challenge", "Australian client needed scalable LMS for 5k+ users."],
                  ["Action", "Built LearnDash + custom PHP, Zoom API, AWS CDN."],
                  ["Result", "5,200+ users, course completion ↑40%."],
                ],
                badge: "5,200+ learners",
                badgeIcon: "fas fa-users",
                tags: ["WordPress", "LMS"],
              },
              {
                icon: "fas fa-rocket",
                title: "Shopify Performance Overhaul",
                items: [
                  ["Challenge", "US beauty brand: 45 Lighthouse score, high bounce."],
                  ["Action", "Removed bloat, WebP, lazy loading, Liquid optimization."],
                  ["Result", "Lighthouse 45→94, CVR ↑28%, revenue +$340K/yr."],
                ],
                badge: "94 Score | +28% CVR",
                badgeIcon: "fas fa-tachometer-alt",
                tags: ["Shopify", "Speed"],
              },
            ].map((p) => (
              <div
                key={p.title}
                className={[styles.card, styles.fadeIn].join(" ")}
                data-reveal
                style={{ position: "relative" }}
              >
                <div className={styles.cardIcon} aria-hidden="true">
                  <i className={p.icon} />
                </div>
                <div className={styles.cardTitle}>{p.title}</div>

                <div style={{ marginTop: 10, color: "rgba(247,247,251,0.78)", fontWeight: 800, fontSize: 13, lineHeight: 1.6 }}>
                  {p.items.map(([label, text]) => (
                    <div key={label} style={{ marginTop: 6 }}>
                      <span style={{ color: "rgba(255,157,77,0.95)" }}>
                        <strong>{label}:</strong>
                      </span>{" "}
                      {text}
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <span
                    className={styles.tag}
                    style={{
                      borderColor: "rgba(230,126,34,0.5)",
                      background: "rgba(230,126,34,0.14)",
                      fontSize: 12,
                      fontWeight: 950,
                    }}
                  >
                    <i className={p.badgeIcon} aria-hidden="true" /> {p.badge}
                  </span>
                </div>

                <div className={styles.tagsRow}>
                  {p.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionTitle} data-reveal>
            Trusted by Global Brands
          </div>
          <div className={styles.sectionSub} data-reveal>
            Real feedback from United States, Singapore & Australia
          </div>

          <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }}>
            {[
              {
                quote:
                  "Stephen's Google Ads expertise transformed our revenue. Delivered 158% ROI increase within 90 days.",
                author: "Jessica Martinez",
                meta: "CMO, LuxeStyle Co. (USA) 🇺🇸",
                rating: "★★★★★",
                initials: "JM",
              },
              {
                quote:
                  "Our Shopify store was bleeding customers. Stephen cut load times by 65% and boosted conversions 32%.",
                author: "Wei-Lin Tan",
                meta: "Founder, Omni Retail SG 🇸🇬",
                rating: "★★★★★",
                initials: "WL",
              },
              {
                quote:
                  "Custom WordPress LMS serves 7,000+ students across AU/NZ. Flawless security and UX.",
                author: "Dr. Priya Sharma",
                meta: "Director, EduFuture Academy 🇦🇺",
                rating: "★★★★½",
                initials: "PS",
              },
              {
                quote:
                  "CRO audit uncovered $200k opportunities. GA4 setup gave crystal-clear insights.",
                author: "Michael K.",
                meta: "E-comm Director, Vitality Brands 🇺🇸",
                rating: "★★★★★",
                initials: "MK",
              },
            ].map((t) => (
              <div
                key={t.author}
                className={[styles.card, styles.fadeIn].join(" ")}
                data-reveal
                style={{ minHeight: 190 }}
              >
                <div style={{ fontStyle: "italic", color: "rgba(247,247,251,0.88)", fontWeight: 900, lineHeight: 1.55 }}>
                  “{t.quote}”
                </div>

                <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid rgba(230,126,34,0.18)", paddingTop: 12 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 999,
                      background: "rgba(230,126,34,0.2)",
                      border: "2px solid rgba(230,126,34,0.45)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 950,
                    }}
                  >
                    {t.initials}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <div style={{ fontWeight: 950 }}>{t.author}</div>
                    <div style={{ color: "rgba(247,247,251,0.75)", fontWeight: 800, fontSize: 13 }}>
                      {t.meta}
                    </div>
                    <div style={{ color: "rgba(255,157,77,0.95)", letterSpacing: 1, fontSize: 12, marginTop: 3 }}>
                      {t.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={styles.section} style={{ background: "transparent" }}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionTitle} data-reveal>
            About
          </div>
          <div className={styles.sectionSub} data-reveal>
            Digital Marketing & Dev Expert — bridging creative + technical execution
          </div>

          <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 14 }}>
            <div
              className={[styles.card, styles.fadeIn].join(" ")}
              data-reveal
              style={{
                background: "rgba(17,18,26,0.95)",
                borderColor: "rgba(230,126,34,0.25)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <img className={styles.profileImg} src="/profile.jpg.jpg" alt="Stephen" />
                <div>
                  <div className={styles.profileName} style={{ fontSize: 22 }}>Stephen S. Cichon</div>
                  <div className={styles.profileMeta}>
                    <span className={styles.pill}>
                      <i className="fas fa-certificate" aria-hidden="true" /> Digital Marketing & Dev Expert
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
                {[
                  ["12+", "Years Exp"],
                  ["98%", "Retention"],
                  ["150+", "Projects"],
                  ["4.9", "Rating"],
                ].map(([n, label]) => (
                  <div key={label} style={{ padding: 14, borderRadius: 16, border: "2px solid rgba(230,126,34,0.18)", background: "rgba(230,126,34,0.06)" }}>
                    <div style={{ fontWeight: 950, fontSize: 28 }}>{n}</div>
                    <div style={{ color: "rgba(247,247,251,0.75)", fontWeight: 900, fontSize: 13 }}>{label}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16 }}>
                <div style={{ fontWeight: 950, marginBottom: 10 }}>
                  Technical Toolbox
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <span className={styles.tag}><i className="fab fa-google" aria-hidden="true" /> Google Ads</span>
                  <span className={styles.tag}><i className="fas fa-tags" aria-hidden="true" /> GTM/GA4</span>
                  <span className={styles.tag}><i className="fab fa-shopify" aria-hidden="true" /> Liquid</span>
                  <span className={styles.tag}><i className="fab fa-wordpress" aria-hidden="true" /> WP/Woo</span>
                  <span className={styles.tag}><i className="fab fa-php" aria-hidden="true" /> PHP/Laravel</span>
                </div>
              </div>
            </div>

            <div
              className={[styles.card, styles.fadeIn].join(" ")}
              data-reveal
              style={{ background: "rgba(17,18,26,0.75)" }}
            >
              <div style={{ fontWeight: 950, fontSize: 16 }}>Results-driven</div>
              <div style={{ marginTop: 10, color: "rgba(247,247,251,0.78)", fontWeight: 850, lineHeight: 1.65 }}>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ color: "rgba(255,157,77,0.95)" }}>
                    Results-driven Digital Marketing Specialist
                  </span>{" "}
                  with 12+ years boosting ROI via Google Ads, Meta Ads, and data-driven web development.
                </div>
                <div>
                  Skilled in A/B testing, landing page optimization, and full-stack dev
                  (WordPress/Shopify). I bridge creative & technical expertise for global brands.
                </div>
              </div>

              <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
                {[
                  ["Experience", "12+ Years (Freelance & Agency) — E-commerce, SaaS, Corporate"],
                  ["Education", "BS IT, WMSU (2008) | Certified Digital Marketing Strategist"],
                  ["Location", "Negros Oriental, Philippines (Remote: US/SG/AU/EU)"],
                  ["Availability", "Open for freelance & full-time remote"],
                ].map(([k, v]) => (
                  <div key={k} style={{ padding: 12, borderRadius: 16, border: "2px solid rgba(230,126,34,0.12)", background: "rgba(230,126,34,0.05)" }}>
                    <div style={{ fontWeight: 950 }}>{k}</div>
                    <div style={{ color: "rgba(247,247,251,0.78)", fontWeight: 850, marginTop: 4, fontSize: 13 }}>
                      {v}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a className={[styles.btn, styles.btnPrimary].join(" ")} href="#contact">
                  <i className="fas fa-paper-plane" aria-hidden="true" /> Hire me
                </a>
                <a
                  className={[styles.btn, styles.btnOutline].join(" ")}
                  href="https://wa.me/639611214870?text=Hi%20Stephen,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-whatsapp" aria-hidden="true" /> WhatsApp
                </a>
                <button
                  className={[styles.btn, styles.btnOutline].join(" ")}
                  type="button"
                  onClick={() => alert("📧 stephen.tfe@gmail.com | Let’s talk on a quick 15-min call!")}
                >
                  <i className="fas fa-calendar-check" aria-hidden="true" /> 15-min call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={styles.section} style={{ background: "rgba(17,18,26,0.9)" }}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionTitle} data-reveal>
            Keep In Touch
          </div>
          <div className={styles.sectionSub} data-reveal>
            Available for freelance projects and full-time roles — worldwide
          </div>

          <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className={[styles.fadeIn].join(" ")} data-reveal>
              {[
                ["Email", "stephen.tfe@gmail.com", "fas fa-envelope", "mailto:stephen.tfe@gmail.com", "#e67e22"],
                ["WhatsApp", "+63 961 121 4870", "fab fa-whatsapp", "https://wa.me/639611214870?text=Hi%20Stephen,%20I%20saw%20your%20portfolio", "#25D366"],
                ["LinkedIn", "linkedin.com/in/stephensmcichon", "fab fa-linkedin", "https://www.linkedin.com/in/stephensmcichon/", "#e67e22"],
                ["GitHub", "github.com/stephensmcichon-oss", "fab fa-github", "https://github.com/stephensmcichon-oss", "#e67e22"],
              ].map(([label, value, icon, href, color]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: 16, border: "2px solid rgba(230,126,34,0.16)", background: "rgba(230,126,34,0.05)", marginBottom: 10 }}>
                  <div style={{ fontSize: 20, color }}>
                    <i className={icon as string} aria-hidden="true" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 950 }}>{label}</div>
                    <div style={{ fontWeight: 850, color: "rgba(247,247,251,0.88)", marginTop: 4, fontSize: 13 }}>
                      <a href={href as string} target={String(href).startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ color }}>
                        {value as string}
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 10, textAlign: "center", padding: 14, borderRadius: 18, border: "2px solid rgba(230,126,34,0.35)", background: "rgba(230,126,34,0.12)" }}>
                <i className="fas fa-clock" aria-hidden="true" /> Response within 12 hours | Global timezones
              </div>
            </div>

            <div className={[styles.fadeIn].join(" ")} data-reveal>
              <form
                action="https://formsubmit.co/stephen.tfe@gmail.com"
                method="POST"
              >
                <input type="hidden" name="_next" value="https://stephensmcichon-oss.github.io/myownportfolio/" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="_honey" style={{ display: "none" }} />

                <div style={{ position: "relative", marginBottom: 12 }}>
                  <div style={{ position: "absolute", left: 14, top: 14, color: "rgba(247,247,251,0.55)" }}>
                    <i className="fas fa-user" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    style={{
                      width: "100%",
                      padding: "14px 14px 14px 44px",
                      borderRadius: 999,
                      border: "2px solid rgba(230,126,34,0.25)",
                      background: "rgba(17,18,26,0.6)",
                      color: "rgba(247,247,251,0.95)",
                      fontWeight: 850,
                      outline: "none",
                    }}
                  />
                </div>

                <div style={{ position: "relative", marginBottom: 12 }}>
                  <div style={{ position: "absolute", left: 14, top: 14, color: "rgba(247,247,251,0.55)" }}>
                    <i className="fas fa-envelope" aria-hidden="true" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    style={{
                      width: "100%",
                      padding: "14px 14px 14px 44px",
                      borderRadius: 999,
                      border: "2px solid rgba(230,126,34,0.25)",
                      background: "rgba(17,18,26,0.6)",
                      color: "rgba(247,247,251,0.95)",
                      fontWeight: 850,
                      outline: "none",
                    }}
                  />
                </div>

                <div style={{ position: "relative", marginBottom: 12 }}>
                  <div style={{ position: "absolute", left: 14, top: 14, color: "rgba(247,247,251,0.55)" }}>
                    <i className="fab fa-whatsapp" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Your WhatsApp (optional)"
                    style={{
                      width: "100%",
                      padding: "14px 14px 14px 44px",
                      borderRadius: 999,
                      border: "2px solid rgba(230,126,34,0.25)",
                      background: "rgba(17,18,26,0.6)",
                      color: "rgba(247,247,251,0.95)",
                      fontWeight: 850,
                      outline: "none",
                    }}
                  />
                </div>

                <div style={{ position: "relative", marginBottom: 12 }}>
                  <div style={{ position: "absolute", left: 14, top: 14, color: "rgba(247,247,251,0.55)" }}>
                    <i className="fas fa-globe" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    placeholder="Your Country"
                    style={{
                      width: "100%",
                      padding: "14px 14px 14px 44px",
                      borderRadius: 999,
                      border: "2px solid rgba(230,126,34,0.25)",
                      background: "rgba(17,18,26,0.6)",
                      color: "rgba(247,247,251,0.95)",
                      fontWeight: 850,
                      outline: "none",
                    }}
                  />
                </div>

                <div style={{ position: "relative", marginBottom: 14 }}>
                  <div style={{ position: "absolute", left: 14, top: 14, color: "rgba(247,247,251,0.55)" }}>
                    <i className="fas fa-comment" aria-hidden="true" />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project & goals..."
                    required
                    style={{
                      width: "100%",
                      padding: "14px 14px 14px 44px",
                      borderRadius: 18,
                      border: "2px solid rgba(230,126,34,0.25)",
                      background: "rgba(17,18,26,0.6)",
                      color: "rgba(247,247,251,0.95)",
                      fontWeight: 850,
                      outline: "none",
                      minHeight: 120,
                      resize: "vertical",
                    }}
                  />
                </div>

                <button className={[styles.btn, styles.btnPrimary].join(" ")} type="submit" style={{ width: "100%", justifyContent: "center" }}>
                  <i className="fas fa-paper-plane" aria-hidden="true" /> Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: 32, textAlign: "center", color: "rgba(247,247,251,0.85)", background: "rgba(17,18,26,0.98)" }}>
        <div style={{ fontWeight: 950, marginBottom: 6 }}>
          &copy; 2026 Stephen S. Cichon. All rights reserved.
        </div>
        <div style={{ fontWeight: 850, marginBottom: 14 }}>
          Digital Marketing Specialist | WordPress Developer | Shopify Expert
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 18, flexWrap: "wrap" }}>
          <a href="https://www.linkedin.com/in/stephensmcichon/" target="_blank" rel="noreferrer" style={{ color: "rgba(247,247,251,0.95)" }}>
            <i className="fab fa-linkedin" aria-hidden="true" />
          </a>
          <a href="https://github.com/stephensmcichon-oss" target="_blank" rel="noreferrer" style={{ color: "rgba(247,247,251,0.95)" }}>
            <i className="fab fa-github" aria-hidden="true" />
          </a>
          <a href="https://wa.me/639611214870?text=Hi%20Stephen,%20I%20saw%20your%20portfolio" target="_blank" rel="noreferrer" style={{ color: "rgba(247,247,251,0.95)" }}>
            <i className="fab fa-whatsapp" aria-hidden="true" />
          </a>
          <a href="#" style={{ color: "rgba(247,247,251,0.95)" }}>
            <i className="fab fa-upwork" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  );
}
