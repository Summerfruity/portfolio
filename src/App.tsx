import { useEffect, useState } from 'react'
import { education, profile, projects } from './data/portfolio'
import type { Language, Localized, Project } from './data/portfolio'

function localAsset(path: string) {
  return /^(https?:|mailto:|data:)/.test(path)
    ? path
    : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

function PixelArrow() {
  return <span className="pixel-arrow" aria-hidden="true">↗</span>
}

function ProjectEntry({
  project,
  language,
}: {
  project: Project
  language: Language
}) {
  const t = (value: Localized) => value[language]
  const isZh = language === 'zh'

  return (
    <article className="project-entry" id={project.id}>
      <div className="project-visual">
        <div className="visual-bar" aria-hidden="true">
          <span>{`PROJECT_${project.number}.IMG`}</span>
          <span className="window-controls">■ ■ ■</span>
        </div>
        <img
          src={localAsset(project.image)}
          alt={t(project.imageAlt)}
          loading="eager"
          width="960"
          height="600"
        />
        <span className="project-stamp">{project.number}</span>
      </div>

      <div className="project-copy">
        <div className="project-meta">
          <span>{`[${project.number}]`}</span>
          <span>{t(project.categoryLabel)}</span>
          <span>{project.year}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-summary">{t(project.summary)}</p>

        <div className="tag-row" aria-label={isZh ? '项目技术' : 'Project technologies'}>
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>

        <dl className="project-stats">
          {project.stats.map((stat) => (
            <div key={stat.value}>
              <dt>{t(stat.label)}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>

        <p className="project-description">{t(project.description)}</p>
        <ul className="project-highlights">
          {project.highlights.map((highlight, index) => (
            <li key={index}><span aria-hidden="true">+</span>{t(highlight)}</li>
          ))}
        </ul>

        <a className="pixel-button project-link" href={project.repositoryUrl} target="_blank" rel="noreferrer">
          {isZh ? '查看源代码' : 'VIEW SOURCE'}
          <PixelArrow />
        </a>
      </div>
    </article>
  )
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'zh'
    } catch {
      return 'zh'
    }
  })

  const isZh = language === 'zh'
  const t = (value: Localized) => value[language]
  const say = (zh: string, en: string) => isZh ? zh : en

  useEffect(() => {
    document.documentElement.lang = isZh ? 'zh-CN' : 'en'
    document.title = isZh
      ? '夏果 — 计算机图形学 / GPU 编程'
      : 'Xia Guo — Computer Graphics / GPU Programming'
    document.querySelector('meta[name="description"]')?.setAttribute('content', t(profile.introduction))
    try {
      localStorage.setItem('portfolio-language', language)
    } catch {
      // Language switching still works when storage is unavailable.
    }
  }, [language])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">{say('跳至主要内容', 'Skip to content')}</a>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" aria-label={say('返回首页', 'Back to home')}>
            <span className="brand-icon" aria-hidden="true">XG</span>
            <span className="brand-path">~/graphics/portfolio</span>
          </a>

          <nav className="navigation" aria-label={say('主导航', 'Main navigation')}>
            <a href="#work">{say('项目', 'WORK')}</a>
            <a href="#about">{say('关于', 'ABOUT')}</a>
            {profile.resumeUrl && <a href={localAsset(profile.resumeUrl)} target="_blank" rel="noreferrer">CV</a>}
          </nav>

          <div className="header-actions">
            <button
              className="language-toggle"
              type="button"
              onClick={() => setLanguage(isZh ? 'en' : 'zh')}
              aria-label={isZh ? 'Switch to English' : '切换为中文'}
            >
              <span className={isZh ? 'active' : ''}>中</span>
              <span>/</span>
              <span className={!isZh ? 'active' : ''}>EN</span>
            </button>
            <a className="github-link" href={profile.githubUrl} target="_blank" rel="noreferrer">
              GITHUB <PixelArrow />
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero container" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="command-line"><span aria-hidden="true">&gt;</span> PORTFOLIO.INIT <span className="cursor" aria-hidden="true" /></p>
            <h1 id="hero-title">
              <span>{isZh ? '夏果' : 'XIA GUO'}</span>
              <small>{isZh ? 'XIA GUO' : '夏果'}</small>
            </h1>
            <p className="hero-role">{t(profile.role)}</p>
            <div className="hero-focus" aria-label={say('研究方向', 'Research focus')}>
              <span className="focus-label">{say('研究方向', 'FOCUS')}</span>
              <div>
                {profile.researchInterests.map((interest) => <span key={interest.en}>{t(interest)}</span>)}
              </div>
            </div>
            <p className="hero-description">{t(profile.introduction)}</p>
            <div className="hero-actions">
              <a className="pixel-button pixel-button-primary" href="#work">
                {say('查看项目', 'VIEW PROJECTS')} <span aria-hidden="true">↓</span>
              </a>
              <a className="text-link" href={profile.githubUrl} target="_blank" rel="noreferrer">
                github.com/Summerfruity <PixelArrow />
              </a>
            </div>
          </div>

          <div className="index-panel" aria-label={say('项目索引', 'Project index')}>
            <div className="panel-heading">
              <span>[ PORTFOLIO_INDEX ]</span>
              <span className="online"><i /> ONLINE</span>
            </div>
            <div className="index-list">
              {projects.map((project) => (
                <a key={project.id} href={`#${project.id}`}>
                  <span>{project.number}</span>
                  <strong>{project.title}</strong>
                  <em>{t(project.categoryLabel)}</em>
                  <span aria-hidden="true">→</span>
                </a>
              ))}
            </div>
            <div className="panel-footer">
              <span>{String(projects.length).padStart(2, '0')} {say('个项目', 'PROJECTS')}</span>
              <span>2025—2026</span>
            </div>
          </div>
        </section>

        <div className="system-strip" aria-hidden="true">
          <div className="container">
            <span>CUDA</span><i />
            <span>COMPUTER GRAPHICS</span><i />
            <span>GPU PROGRAMMING</span><i />
            <span>PARALLEL ALGORITHMS</span>
          </div>
        </div>

        <section className="work-section container" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="section-code">[ 01 / SELECTED_WORK ]</p>
            <h2 id="work-title">{say('项目', 'PROJECTS')}</h2>
            <p>{say('实现、结果与性能数据。', 'Implementations, results, and measured performance.')}</p>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <ProjectEntry key={project.id} project={project} language={language} />
            ))}
          </div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="container">
            <div className="section-heading about-heading">
              <p className="section-code">[ 02 / PROFILE.TXT ]</p>
              <h2 id="about-title">{say('关于', 'ABOUT')}</h2>
            </div>

            <div className="about-grid">
              <div className="profile-card">
                <div className="terminal-title"><span>PROFILE.TXT</span><span>READ_ONLY</span></div>
                <dl>
                  <div><dt>NAME</dt><dd>{t(profile.name)} / {isZh ? 'Xia Guo' : '夏果'}</dd></div>
                  <div><dt>ROLE</dt><dd>{t(profile.role)}</dd></div>
                  <div><dt>LOCATION</dt><dd>{t(profile.location)}</dd></div>
                  <div><dt>FOCUS</dt><dd>{profile.researchInterests.map((interest) => t(interest)).join(isZh ? ' · ' : ' / ')}</dd></div>
                </dl>
              </div>

              <div className="about-copy">
                <p>{t(profile.introduction)}</p>
                {education.map((item) => (
                  <div className="education-row" key={item.institution.en}>
                    <span>{t(item.period)}</span>
                    <div><strong>{t(item.institution)}</strong><p>{t(item.degree)}</p></div>
                  </div>
                ))}
                <div className="tech-block">
                  <span>{say('项目中使用', 'USED IN PROJECTS')}</span>
                  <div>{profile.technologies.map((item) => <code key={item}>{item}</code>)}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section container" aria-labelledby="contact-title">
          <p className="section-code">[ 03 / LINKS ]</p>
          <h2 id="contact-title">{say('继续查看代码。', 'KEEP READING THE CODE.')}</h2>
          <a className="contact-link" href={profile.githubUrl} target="_blank" rel="noreferrer">
            <span>github.com/Summerfruity</span>
            <PixelArrow />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <span>© {new Date().getFullYear()} XIA GUO</span>
          <span>{say('重庆 · 中国', 'CHONGQING · CHINA')}</span>
          <a href="#home">TOP ↑</a>
        </div>
      </footer>
    </div>
  )
}
