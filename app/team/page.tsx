'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  Mail,
} from 'lucide-react'

import styles from './team.module.css'

const teamMembers = [
  {
    name: 'Arpan Das',
    contribution: 'Team Lead & Data Fetching',
    gmail: 'arpandas90075@gmail.com',
    github: 'https://github.com/arpandas90075',
    githubName: 'arpandas90075',
    image: '/images/team/arpan-das.jpeg',
    bio: 'Currently studying in BCA 2nd Year at Techno International New Town. Project Leader and Founder of the Bengali Foundation, with a passion for technology, leadership, and building impactful initiatives.',
  },
  {
    name: 'Atanu Das',
    contribution: 'Police Station Data',
    gmail: 'atanudas9009@gmail.com',
    github: 'https://github.com/Atanu919',
    githubName: 'Atanu919',
    image: '/images/team/atanu-das.jpeg',
    bio: 'Currently pursuing a BCA in my 2nd year at Techno International Newtown. Contributed to the app by researching, collecting, and compiling comprehensive data on police stations, helping ensure accurate and useful information for its users.',
  },
  {
    name: 'Sayan Das',
    contribution: 'Washroom Data',
    gmail: 'sayan45187das@gmail.com',
    github: '',
    githubName: '',
    image: '/images/team/sayan-das.jpeg',
    bio: 'Currently studying in 2nd year of BCA at Techno International Newtown. Sayan Das contributed to the app by fetching and providing the washroom data, helping improve the availability and usefulness of the app’s information.',
  },
  {
    name: 'Soumyadipta Dey',
    contribution: 'Petrol Pump Data',
    gmail: 'soumyodiptadey20@gmail.com',
    github: 'https://github.com/soumyodiptadey',
    githubName: 'soumyodiptadey',
    image: '/images/team/soumyadipta-dey.jpeg',
    bio: 'Currently studying at Techno International New Town and pursuing a Bachelor of Computer Applications (BCA), 2nd Year. Soumyadipta Dey contributed to the project by collecting and compiling data on petrol pumps and accurately locating them on the map.',
  },
  {
    name: 'Sohini Mukherjee',
    contribution: 'Logo Design & Pandal Data',
    gmail: 'sohini301295@gmail.com',
    github: '',
    githubName: '',
    image: '/images/team/sohini-mukherjee.jpeg',
    bio: 'Currently studying at Techno International New Town, pursuing a Bachelor of Computer Applications (BCA) and currently in 2nd Year. Designed the app logo and added pandal locations to help users easily find and explore nearby pandals.',
  },
  {
    name: 'Amit Mistry',
    contribution: 'Restaurants & Café Data',
    gmail: 'mistryamit2006@gmail.com',
    github: 'https://github.com/amitmistry26',
    githubName: 'amitmistry26',
    image: '/images/team/amit-mistry.jpeg',
    bio: 'Currently pursuing a BCA (2nd Year) at Techno International Newtown. Amit Mistry contributes to the app by adding and updating information about restaurants and cafés, helping users discover new places to visit, explore, and enjoy.',
  },
  {
    name: 'Sounak Kumar Guru',
    contribution: 'Hotel & Pandal Data',
    gmail: 'sounakguru25@gmail.com',
    github: 'https://github.com/sounakguru25-debug',
    githubName: 'sounakguru25-debug',
    image: '/images/team/sounak-kumar-guru.jpeg',
    bio: 'Currently studying in Techno International Newtown, pursuing BCA (1st year). Contributed to the app by fetching and compiling data on hotels and pandals, helping improve the availability and accuracy of information for users.',
  },
  {
    name: 'Rupsha Howladar',
    contribution: 'Medical Store Data',
    gmail: 'rupshahowladar07@gmail.com',
    github: 'https://github.com/rupshha86',
    githubName: 'rupshha86',
    image: '/images/team/rupsha-howladar.jpeg',
    bio: 'Currently pursuing a BCA (1st Year) at Techno International Newtown, she is an enthusiastic learner interested in exploring technology through real-world projects. As a member of the project team, she contributed to the research and collection of medical store data, including location-related information, helping create a useful and reliable dataset for the project.',
  },
  {
    name: 'Shreedyuti Mondal',
    contribution: 'Pandal Data, Design & Photography',
    gmail: 'mondalshreedyuti@gmail.com',
    github: '',
    githubName: '',
    image: '/images/team/shreedyuti-mondal.jpeg',
    bio: 'Currently studying in the 2nd Year of BCA at Techno International Newtown. Shreedyuti Mondal is a key contributor to the app, responsible for fetching and organizing Pandal Data, along with designing the app and curating the photographs featured in it. With an interest in photography, creativity, and visual design, she contributes to making the app attractive and user-friendly.',
  },
]

export default function TeamPage() {
  const [openMember, setOpenMember] = useState<number | null>(null)

  const toggleMember = (index: number) => {
    setOpenMember((current) =>
      current === index ? null : index
    )
  }

  return (
    <main className={styles.teamPage}>

      {/* HEADER */}

      <header className={styles.header}>
        <a href="/" className={styles.logo}>
          <span className={styles.logoBengali}>
            ঢাকের তাল
          </span>

          <span className={styles.logoEnglish}>
            DHAKER TAL
          </span>
        </a>

        <a href="/" className={styles.backLink}>
          <ArrowLeft />
          <span>Back to Dhaker Tal</span>
        </a>
      </header>


      {/* HERO */}

      <section className={styles.hero}>
        <p className={styles.kicker}>
          THE PEOPLE BEHIND DHAKER TAL
        </p>

        <p className={styles.bengali}>
          আমাদের দল
        </p>

        <h1>
          Meet the
          <br />
          <em>team.</em>
        </h1>

        <p className={styles.description}>
          The people who came together to build Dhaker Tal
          and bring the rhythm of Kolkata Pujo to life.
        </p>
      </section>


      {/* TEAM MEMBERS */}

      <section className={styles.teamList}>

        {teamMembers.map((member, index) => {
          const isOpen = openMember === index

          return (
            <article
              key={member.name}
              className={`${styles.member} ${
                isOpen ? styles.memberOpen : ''
              }`}
            >

              {/* MEMBER ROW */}

              <button
                type="button"
                className={styles.memberButton}
                onClick={() => toggleMember(index)}
                aria-expanded={isOpen}
                aria-controls={`member-details-${index}`}
              >
                <span className={styles.memberNumber}>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className={styles.memberInfo}>
                  <strong>
                    {member.name}
                  </strong>

                  <small>
                    {member.contribution}
                  </small>
                </span>

                <span className={styles.arrow}>
                  <ChevronDown />
                </span>
              </button>


              {/* EXPANDED DETAILS */}

              <div
                id={`member-details-${index}`}
                className={`${styles.details} ${
                  isOpen ? styles.detailsOpen : ''
                }`}
              >
                <div className={styles.detailsInner}>

                  {/* LEFT — PHOTO */}

                  <div className={styles.profileArea}>

                    <div className={styles.profileImageWrap}>
                      <img
                        src={member.image}
                        alt={`${member.name} - Dhaker Tal team member`}
                        className={styles.profileImage}
                      />
                    </div>

                  </div>


                  {/* RIGHT — BIO + CONTACT */}

                  <div className={styles.infoArea}>

                    {/* BIO */}

                    <div className={styles.bio}>
                      <p>
                        {member.bio}
                      </p>
                    </div>


                    {/* CONTACT */}

                    <div className={styles.contactArea}>

                      <p className={styles.contactKicker}>
                        CONNECT
                      </p>

                      <div className={styles.contactLinks}>

                        {/* GMAIL */}

                        <a
                          href={`mailto:${member.gmail}`}
                          className={styles.detailLink}
                        >
                          <span className={styles.detailIcon}>
                            <Mail />
                          </span>

                          <span className={styles.detailText}>
                            <small>GMAIL</small>

                            <strong>
                              {member.gmail}
                            </strong>
                          </span>

                          <ArrowUpRight
                            className={styles.externalIcon}
                          />
                        </a>


                        {/* GITHUB */}

                        {member.github ? (

                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.detailLink}
                          >
                            <span className={styles.detailIcon}>
                              <span className={styles.githubText}>
                                GH
                              </span>
                            </span>

                            <span className={styles.detailText}>
                              <small>GITHUB</small>

                              <strong>
                                {member.githubName}
                              </strong>
                            </span>

                            <ArrowUpRight
                              className={styles.externalIcon}
                            />
                          </a>

                        ) : (

                          <div
                            className={`${styles.detailLink} ${styles.disabledLink}`}
                          >
                            <span className={styles.detailIcon}>
                              <span className={styles.githubText}>
                                GH
                              </span>
                            </span>

                            <span className={styles.detailText}>
                              <small>GITHUB</small>

                              <strong>
                                Not provided
                              </strong>
                            </span>
                          </div>

                        )}

                      </div>

                    </div>

                  </div>

                </div>
              </div>

            </article>
          )
        })}

      </section>


      {/* BOTTOM MESSAGE */}

      <section className={styles.bottomSection}>

        <p className={styles.bottomKicker}>
          MADE BY THE PEOPLE OF DHAKER TAL
        </p>

        <h2>
          One team.
          <br />
          <em>One rhythm.</em>
        </h2>

        <a
          href="/"
          className={styles.homeButton}
        >
          Back to home
          <ArrowUpRight />
        </a>

      </section>


      {/* FOOTER */}

      <footer className={styles.footer}>
        <span>
          DHAKER TAL • PUJA 2026
        </span>

        <span>
          KOLKATA, INDIA
        </span>
      </footer>

    </main>
  )
}