export interface Session {
  id: string
  day: string
  time: string
  endTime: string
  duration: number // minutes
  program: 'Foundation' | 'Juniors' | 'Elite' | 'Competitive' | 'Open Play' | 'Private' | 'Tournament'
  coach: string
  maxCapacity: number
  booked: number
  isPrivate?: boolean
}

export const schedule: Session[] = [
  // Monday
  { id: '1', day: 'Monday', time: '6:00 AM', endTime: '7:00 AM', duration: 60, program: 'Foundation', coach: 'Coach Ochieng', maxCapacity: 8, booked: 4 },
  { id: '2', day: 'Monday', time: '5:00 PM', endTime: '6:00 PM', duration: 60, program: 'Juniors', coach: 'Coach Amina', maxCapacity: 10, booked: 8 },
  { id: '3', day: 'Monday', time: '6:00 PM', endTime: '8:00 PM', duration: 120, program: 'Competitive', coach: 'Coach Mwangi', maxCapacity: 6, booked: 4 },
  
  // Tuesday
  { id: '4', day: 'Tuesday', time: '6:00 AM', endTime: '7:00 AM', duration: 60, program: 'Foundation', coach: 'Coach Ochieng', maxCapacity: 8, booked: 6 },
  { id: '5', day: 'Tuesday', time: '5:00 PM', endTime: '7:00 PM', duration: 120, program: 'Elite', coach: 'Coach Mwangi', maxCapacity: 4, booked: 4 }, // Full
  
  // Wednesday
  { id: '6', day: 'Wednesday', time: '6:00 AM', endTime: '7:00 AM', duration: 60, program: 'Foundation', coach: 'Coach Ochieng', maxCapacity: 8, booked: 3 },
  { id: '7', day: 'Wednesday', time: '5:00 PM', endTime: '6:00 PM', duration: 60, program: 'Juniors', coach: 'Coach Amina', maxCapacity: 10, booked: 7 },
  { id: '8', day: 'Wednesday', time: '6:00 PM', endTime: '8:00 PM', duration: 120, program: 'Competitive', coach: 'Coach Mwangi', maxCapacity: 6, booked: 2 },
  
  // Thursday
  { id: '9', day: 'Thursday', time: '6:00 AM', endTime: '7:00 AM', duration: 60, program: 'Elite', coach: 'Coach Sarah', maxCapacity: 4, booked: 2 },
  { id: '10', day: 'Thursday', time: '5:00 PM', endTime: '7:00 PM', duration: 120, program: 'Elite', coach: 'Coach Mwangi', maxCapacity: 4, booked: 3 },
  
  // Friday
  { id: '11', day: 'Friday', time: '5:00 PM', endTime: '6:00 PM', duration: 60, program: 'Juniors', coach: 'Coach Amina', maxCapacity: 10, booked: 5 },
  { id: '12', day: 'Friday', time: '6:00 PM', endTime: '8:00 PM', duration: 120, program: 'Open Play', coach: 'Coach Sarah', maxCapacity: 12, booked: 8 },
  
  // Saturday
  { id: '13', day: 'Saturday', time: '9:00 AM', endTime: '10:00 AM', duration: 60, program: 'Foundation', coach: 'Coach Ochieng', maxCapacity: 8, booked: 6 },
  { id: '14', day: 'Saturday', time: '10:00 AM', endTime: '12:00 PM', duration: 120, program: 'Competitive', coach: 'Coach Mwangi', maxCapacity: 6, booked: 4 },
  { id: '15', day: 'Saturday', time: '2:00 PM', endTime: '4:00 PM', duration: 120, program: 'Private', coach: 'Coach Mwangi', maxCapacity: 1, booked: 0, isPrivate: true },
  
  // Sunday
  { id: '16', day: 'Sunday', time: '10:00 AM', endTime: '1:00 PM', duration: 180, program: 'Tournament', coach: 'All Coaches', maxCapacity: 16, booked: 12 },
  { id: '17', day: 'Sunday', time: '3:00 PM', endTime: '5:00 PM', duration: 120, program: 'Private', coach: 'Coach Sarah', maxCapacity: 1, booked: 0, isPrivate: true },
]

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const programColors: Record<string, { bg: string; text: string; border: string }> = {
  'Foundation': { bg: 'rgba(59, 130, 246, 0.15)', text: '#3b82f6', border: 'rgba(59, 130, 246, 0.3)' },
  'Juniors': { bg: 'rgba(34, 197, 94, 0.15)', text: '#22c55e', border: 'rgba(34, 197, 94, 0.3)' },
  'Elite': { bg: 'rgba(255, 107, 53, 0.15)', text: 'var(--orange)', border: 'rgba(255, 107, 53, 0.3)' },
  'Competitive': { bg: 'rgba(168, 85, 247, 0.15)', text: '#a855f7', border: 'rgba(168, 85, 247, 0.3)' },
  'Open Play': { bg: 'rgba(236, 72, 153, 0.15)', text: '#ec4899', border: 'rgba(236, 72, 153, 0.3)' },
  'Private': { bg: 'rgba(234, 179, 8, 0.15)', text: '#eab308', border: 'rgba(234, 179, 8, 0.3)' },
  'Tournament': { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' },
}
