import { useState } from 'react'
import profilePhoto from './assets/profile-photo.png'
import './App.css'

const skillIcons = {
  Python: 'Py',
  Java: 'Ja',
  'C++': 'C+',
  Dart: 'D',
  Kotlin: 'Kt',
  'JavaScript (ES6+)': 'JS',
  'HTML5 & CSS3': '5',
  JavaScript: 'JS',
  React: '⚛',
  Laravel: 'L',
  'Backend Development': 'BE',
  'RESTful API Design': 'API',
  'Full-Stack Architecture': 'FS',
  Flutter: 'Fl',
}

function ContactIcon({ type }) {
  const iconPaths = {
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    phone: (
      <path d="M7.2 3.5 10 7.8 8.3 9.5c1.1 2.2 2.8 3.9 5 5l1.7-1.7 4.3 2.8-.8 3.1c-.2.7-.9 1.2-1.7 1.2C9.2 19.5 4.5 14.8 4.1 7.2c0-.8.5-1.5 1.2-1.7l1.9-.5Z" />
    ),
    location: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2.2" />
      </>
    ),
  }

  return (
    <svg
      className="contact-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[type]}
    </svg>
  )
}

// This reusable component displays a profile using the values passed as props.
function ProfileCard({ name, course, skill, skills, contact }) {
  // useState remembers the availability status when the button is clicked.
  const [available, setAvailable] = useState(true)

  return (
    <article className="profile-card">
      <div className="profile-banner" aria-hidden="true" />

      <header className="profile-intro">
        <img className="avatar" src={profilePhoto} alt={`${name} profile`} />
        <h1>{name}</h1>
        <p className="main-skill">{skill}</p>
        <p className="course">{course}</p>
      </header>

      <section className="skills-section" aria-labelledby="skills-heading">
        <h2 id="skills-heading">Competencies</h2>
        <div className="skills-groups">
          {skills.map((group) => (
            <section className="skill-group" key={group.category}>
              <h3>{group.category}</h3>
              <ul className="skills-list">
                {group.items.map((item, index) => (
                  <li key={item}>
                    <span
                      className={`skill-icon skill-icon-${(index % 5) + 1}`}
                      aria-hidden="true"
                    >
                      {skillIcons[item] ?? item.slice(0, 2)}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <p className="profile-summary">
        BS Computer Science student focused on web, full-stack, and mobile
        development.
      </p>

      <section className="contact-section" aria-labelledby="contact-heading">
        <h2 id="contact-heading">Contact Information</h2>
        <div className="contact-grid">
          <a className="contact-item" href={`mailto:${contact.email}`}>
            <ContactIcon type="email" />
            <span>{contact.email}</span>
          </a>
          <a className="contact-item" href={`tel:${contact.phone}`}>
            <ContactIcon type="phone" />
            <span>{contact.phone}</span>
          </a>
          <div className="contact-item">
            <ContactIcon type="location" />
            <span>{contact.address}</span>
          </div>
        </div>
      </section>

      <footer className="profile-footer">
        <div className="availability-copy">
          <span className={available ? 'status-dot available' : 'status-dot busy'} />
          <div>
            <p className="availability-title">
              {available ? 'Available' : 'Busy'}
            </p>
            <p className="availability-message">
              {available
                ? 'Open to projects and collaboration.'
                : 'Not available right now.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="availability-button"
          onClick={() => setAvailable(!available)}
        >
          {available ? 'Set Busy' : 'Set Available'}
        </button>
      </footer>
    </article>
  )
}

export default function App() {
  return (
    <main className="app">
      <ProfileCard
        name="Ayesha Bibi"
        course="BS Computer Science"
        skill="Web & Full-Stack Development"
        contact={{
          phone: '03260426248',
          email: 'ayshanasir234@gmail.com',
          address: 'Vehari, Pakistan',
        }}
        skills={[
          {
            category: 'Programming Languages',
            items: ['Python', 'Java', 'C++', 'Dart', 'Kotlin', 'JavaScript (ES6+)'],
          },
          {
            category: 'Web & Full-Stack Development',
            items: [
              'HTML5 & CSS3',
              'JavaScript',
              'React',
              'Laravel',
              'Backend Development',
              'RESTful API Design',
              'Full-Stack Architecture',
            ],
          },
          {
            category: 'Mobile Development',
            items: ['Flutter', 'Dart'],
          },
        ]}
      />
    </main>
  )
}
