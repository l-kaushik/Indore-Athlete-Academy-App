// ─── USERS ─────────────────────────────────────────────────────────────────
// Demo credentials: any email below + password "password123"
export const MOCK_USERS = [
  { id: 1, username: 'rahul_s', first_name: 'Rahul', last_name: 'Sharma', emailId: 'student@iaa.com', date_of_birth: '2000-05-15', role: 'STUDENT', createdAt: '2024-01-10' },
  { id: 2, username: 'vikram_t', first_name: 'Vikram', last_name: 'Singh', emailId: 'trainer@iaa.com', date_of_birth: '1990-08-20', role: 'TRAINER', createdAt: '2023-11-01' },
  { id: 3, username: 'admin_iaa', first_name: 'Admin', last_name: 'IAA', emailId: 'admin@iaa.com', date_of_birth: '1985-03-10', role: 'ADMIN', createdAt: '2023-01-01' },
]

// ─── STUDENTS (for trainer/admin views) ──────────────────────────────────────
export const MOCK_STUDENTS = [
  { id: 1,  username: 'rahul_s',  first_name: 'Rahul',  last_name: 'Sharma', emailId: 'rahul@iaa.com',  role: 'STUDENT', workoutsCompleted: 12, activeAssignments: 2, joinedAt: '2024-01-10' },
  { id: 4,  username: 'priya_k',  first_name: 'Priya',  last_name: 'Kapoor', emailId: 'priya@iaa.com',  role: 'STUDENT', workoutsCompleted: 8,  activeAssignments: 1, joinedAt: '2024-02-03' },
  { id: 5,  username: 'arjun_m',  first_name: 'Arjun',  last_name: 'Mehra',  emailId: 'arjun@iaa.com',  role: 'STUDENT', workoutsCompleted: 20, activeAssignments: 3, joinedAt: '2023-12-14' },
  { id: 6,  username: 'sneha_p',  first_name: 'Sneha',  last_name: 'Patel',  emailId: 'sneha@iaa.com',  role: 'STUDENT', workoutsCompleted: 5,  activeAssignments: 1, joinedAt: '2024-03-01' },
  { id: 7,  username: 'ravi_d',   first_name: 'Ravi',   last_name: 'Dubey',  emailId: 'ravi@iaa.com',   role: 'STUDENT', workoutsCompleted: 16, activeAssignments: 2, joinedAt: '2024-01-22' },
]

export const ALL_USERS = [
  ...MOCK_STUDENTS,
  { id: 2, username: 'vikram_t', first_name: 'Vikram', last_name: 'Singh',  emailId: 'trainer@iaa.com', role: 'TRAINER', workoutsCompleted: 0, activeAssignments: 0, joinedAt: '2023-11-01' },
  { id: 8, username: 'anita_t',  first_name: 'Anita',  last_name: 'Verma',  emailId: 'anita@iaa.com',   role: 'TRAINER', workoutsCompleted: 0, activeAssignments: 0, joinedAt: '2024-01-05' },
  { id: 3, username: 'admin_iaa',first_name: 'Admin',  last_name: 'IAA',    emailId: 'admin@iaa.com',   role: 'ADMIN',   workoutsCompleted: 0, activeAssignments: 0, joinedAt: '2023-01-01' },
]

// ─── EXERCISE MASTER ─────────────────────────────────────────────────────────
export const MOCK_EXERCISES = [
  { id: 1, name: 'Push-up',            type: 'count_based', default_unit: 'reps',    muscle_group: 'chest',    equipment_needed: 'none',     description: 'Classic bodyweight chest exercise' },
  { id: 2, name: 'Squat',              type: 'count_based', default_unit: 'reps',    muscle_group: 'legs',     equipment_needed: 'none',     description: 'Fundamental lower body compound movement' },
  { id: 3, name: 'Plank',              type: 'time_based',  default_unit: 'seconds', muscle_group: 'core',     equipment_needed: 'none',     description: 'Core stability isometric hold' },
  { id: 4, name: 'Dumbbell Curl',      type: 'count_based', default_unit: 'reps',    muscle_group: 'shoulder', equipment_needed: 'dumbbell', description: 'Bicep isolation with dumbbell' },
  { id: 5, name: 'Barbell Bench Press',type: 'count_based', default_unit: 'reps',    muscle_group: 'chest',    equipment_needed: 'barbell',  description: 'Heavy compound chest press' },
  { id: 6, name: 'Lunges',             type: 'count_based', default_unit: 'reps',    muscle_group: 'legs',     equipment_needed: 'none',     description: 'Unilateral leg strength exercise' },
  { id: 7, name: 'Shoulder Press',     type: 'count_based', default_unit: 'reps',    muscle_group: 'shoulder', equipment_needed: 'dumbbell', description: 'Overhead pressing for shoulder strength' },
  { id: 8, name: 'Mountain Climbers',  type: 'time_based',  default_unit: 'seconds', muscle_group: 'core',     equipment_needed: 'none',     description: 'Dynamic core + cardio combination' },
  { id: 9, name: 'Deadlift',           type: 'count_based', default_unit: 'reps',    muscle_group: 'legs',     equipment_needed: 'barbell',  description: 'Posterior chain compound movement' },
  { id: 10,name: 'Tricep Dips',        type: 'count_based', default_unit: 'reps',    muscle_group: 'chest',    equipment_needed: 'bench',    description: 'Bodyweight tricep and chest exercise' },
]

// ─── WORKOUT TEMPLATES ───────────────────────────────────────────────────────
export const MOCK_TEMPLATES = [
  {
    id: 1, trainer_id: 2, name: 'Beginner Full Body', created_at: '2024-01-15',
    description: 'Balanced full-body workout for beginners. Focuses on form, endurance, and building a solid foundation.',
    exercises: [
      { id: 1, exercise_id: 1, exercise: MOCK_EXERCISES[0], order_index: 1 },
      { id: 2, exercise_id: 2, exercise: MOCK_EXERCISES[1], order_index: 2 },
      { id: 3, exercise_id: 3, exercise: MOCK_EXERCISES[2], order_index: 3 },
    ],
  },
  {
    id: 2, trainer_id: 2, name: 'Upper Body Power', created_at: '2024-02-01',
    description: 'Intense upper body session targeting chest, shoulders and arms. Requires access to weights.',
    exercises: [
      { id: 4, exercise_id: 5, exercise: MOCK_EXERCISES[4], order_index: 1 },
      { id: 5, exercise_id: 7, exercise: MOCK_EXERCISES[6], order_index: 2 },
      { id: 6, exercise_id: 4, exercise: MOCK_EXERCISES[3], order_index: 3 },
      { id: 7, exercise_id: 10,exercise: MOCK_EXERCISES[9], order_index: 4 },
    ],
  },
  {
    id: 3, trainer_id: 2, name: 'Core Blast', created_at: '2024-02-20',
    description: 'High-intensity core focused workout. Builds stability, endurance, and functional strength.',
    exercises: [
      { id: 8,  exercise_id: 3, exercise: MOCK_EXERCISES[2], order_index: 1 },
      { id: 9,  exercise_id: 8, exercise: MOCK_EXERCISES[7], order_index: 2 },
      { id: 10, exercise_id: 6, exercise: MOCK_EXERCISES[5], order_index: 3 },
    ],
  },
  {
    id: 4, trainer_id: 8, name: 'Leg Day', created_at: '2024-03-05',
    description: 'Complete lower body destruction. Squats, lunges, and deadlifts to build powerful legs.',
    exercises: [
      { id: 11, exercise_id: 2, exercise: MOCK_EXERCISES[1], order_index: 1 },
      { id: 12, exercise_id: 6, exercise: MOCK_EXERCISES[5], order_index: 2 },
      { id: 13, exercise_id: 9, exercise: MOCK_EXERCISES[8], order_index: 3 },
    ],
  },
]

// ─── WORKOUT ASSIGNMENTS ─────────────────────────────────────────────────────
export const MOCK_ASSIGNMENTS = [
  {
    id: 1, template_id: 1, student_id: 1, trainer_id: 2,
    template: MOCK_TEMPLATES[0],
    assigned_at: '2024-03-01', status: 'completed',
    exercises: [
      { id: 1, exercise_id: 1, exercise: MOCK_EXERCISES[0], target_reps: 20, target_duration: null, order_index: 1 },
      { id: 2, exercise_id: 2, exercise: MOCK_EXERCISES[1], target_reps: 15, target_duration: null, order_index: 2 },
      { id: 3, exercise_id: 3, exercise: MOCK_EXERCISES[2], target_reps: null,target_duration: 60,  order_index: 3 },
    ],
  },
  {
    id: 2, template_id: 2, student_id: 1, trainer_id: 2,
    template: MOCK_TEMPLATES[1],
    assigned_at: '2024-03-10', status: 'in_progress',
    exercises: [
      { id: 4, exercise_id: 5, exercise: MOCK_EXERCISES[4], target_reps: 10, target_duration: null, order_index: 1 },
      { id: 5, exercise_id: 7, exercise: MOCK_EXERCISES[6], target_reps: 12, target_duration: null, order_index: 2 },
      { id: 6, exercise_id: 4, exercise: MOCK_EXERCISES[3], target_reps: 15, target_duration: null, order_index: 3 },
    ],
  },
  {
    id: 3, template_id: 3, student_id: 1, trainer_id: 2,
    template: MOCK_TEMPLATES[2],
    assigned_at: '2024-03-20', status: 'assigned',
    exercises: [
      { id: 7, exercise_id: 3, exercise: MOCK_EXERCISES[2], target_reps: null, target_duration: 90, order_index: 1 },
      { id: 8, exercise_id: 8, exercise: MOCK_EXERCISES[7], target_reps: null, target_duration: 45, order_index: 2 },
      { id: 9, exercise_id: 6, exercise: MOCK_EXERCISES[5], target_reps: 20,   target_duration: null,order_index: 3 },
    ],
  },
]

// ─── EXERCISE LOGS (completed sets) ──────────────────────────────────────────
export const MOCK_EXERCISE_LOGS = [
  { id: 1, workout_id: 1, assignment_exercise_id: 1, set_number: 1, reps: 18, duration: null, weight: null, created_at: '2024-03-01T09:05:00' },
  { id: 2, workout_id: 1, assignment_exercise_id: 1, set_number: 2, reps: 20, duration: null, weight: null, created_at: '2024-03-01T09:08:00' },
  { id: 3, workout_id: 1, assignment_exercise_id: 2, set_number: 1, reps: 15, duration: null, weight: null, created_at: '2024-03-01T09:15:00' },
]
