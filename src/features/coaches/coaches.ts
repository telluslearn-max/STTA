export interface Coach {
  id: string
  name: string
  title: string
  specialization: 'Juniors' | 'Elite' | 'Foundation'
  bio_short: string
  bio_full: string
  achievements: string[]
  email: string
}

export const coaches: Coach[] = [
  {
    id: '1',
    name: 'Coach Mwangi',
    title: 'Head Coach',
    specialization: 'Elite',
    bio_short: '15 years experience coaching at national level. Former national team player with extensive tournament experience. Specializes in advanced technique development and competitive match strategies.',
    bio_full: '15 years experience coaching at national level. Former national team player with extensive tournament experience. Specializes in advanced technique development and competitive match strategies. Has trained multiple national champions and represented Kenya in international competitions. Known for his strategic approach to match play and ability to develop players mental toughness.',
    achievements: [
      'EA Region Coach of the Year 2025',
      'Developed 3 National Champions',
      '15 Years National Level Coaching',
      'Former Kenya National Team Player'
    ],
    email: 'mwangi@stteresa.edu'
  },
  {
    id: '2',
    name: 'Coach Amina',
    title: 'Junior Development Coach',
    specialization: 'Juniors',
    bio_short: 'Former professional player turned coach with a passion for developing young talent. Creates engaging training sessions that build fundamental skills while keeping sessions fun.',
    bio_full: 'Former professional player turned coach with a passion for developing young talent. Creates engaging training sessions that build fundamental skills while keeping sessions fun. Holds certifications in youth sports development and specializes in creating structured yet enjoyable learning environments for players aged 8-16.',
    achievements: [
      'Kenya Youth Coach Certification',
      'Best Junior Program Award 2024',
      '100+ Players Developed',
      'Special Needs Training Certified'
    ],
    email: 'amina@stteresa.edu'
  },
  {
    id: '3',
    name: 'Coach Ochieng',
    title: 'Foundation Coach',
    specialization: 'Foundation',
    bio_short: 'Specializes in introducing table tennis to beginners of all ages. Patient teaching style helps new players build confidence and basic skills from the ground up.',
    bio_full: 'Specializes in introducing table tennis to beginners of all ages. Patient teaching style helps new players build confidence and basic skills from the ground up. Has developed comprehensive curriculum for new players focusing on proper technique, footwork, and game understanding. Perfect starting point for anyone new to the sport.',
    achievements: [
      'Foundation Level Certification',
      'Adult Beginner Specialist',
      '500+ Beginner Players Trained',
      'Community Outreach Lead'
    ],
    email: 'ochieng@stteresa.edu'
  },
  {
    id: '4',
    name: 'Coach Sarah',
    title: 'Assistant Coach',
    specialization: 'Elite',
    bio_short: 'Tactical specialist with expertise in match analysis and opponent scouting. Works closely with elite players to refine competitive strategies and mental preparation.',
    bio_full: 'Tactical specialist with expertise in match analysis and opponent scouting. Works closely with elite players to refine competitive strategies and mental preparation. Uses video analysis and statistical modeling to help players understand their game and identify improvement areas. Former competitive player with international tournament experience.',
    achievements: [
      'Match Analysis Certification',
      'Sports Psychology Training',
      'International Competition Experience',
      'Elite Player Development'
    ],
    email: 'sarah@stteresa.edu'
  }
]
