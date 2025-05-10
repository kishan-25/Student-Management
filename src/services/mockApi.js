
const mockStudents = [
  {
    id: 1001,
    name: 'John Smith',
    email: 'john.smith@example.com',
    course: 'Computer Science',
    phone: '+1-123-456-7890',
    address: '123 College St, University City',
    enrollmentDate: '2024-09-01'
  },
  {
    id: 1002,
    name: 'Emma Johnson',
    email: 'emma.j@example.com',
    course: 'Mathematics',
    phone: '+1-234-567-8901',
    address: '456 Scholar Ave, Knowledge Town',
    enrollmentDate: '2024-08-15'
  },
  {
    id: 1003,
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    course: 'Physics',
    phone: '+1-345-678-9012',
    address: '789 Academy Rd, Learning City',
    enrollmentDate: '2024-09-05'
  },
  {
    id: 1004,
    name: 'Sophia Rodriguez',
    email: 'sophia@example.com',
    course: 'Chemistry',
    phone: '+1-456-789-0123',
    address: '101 Research Blvd, Science Park',
    enrollmentDate: '2024-08-20'
  },
  {
    id: 1005,
    name: 'Aiden Kumar',
    email: 'aiden.k@example.com',
    course: 'Biology',
    phone: '+1-567-890-1234',
    address: '202 Study Lane, Education Heights',
    enrollmentDate: '2024-09-10'
  },
  {
    id: 1006,
    name: 'Olivia Taylor',
    email: 'olivia.t@example.com',
    course: 'Computer Science',
    phone: '+1-678-901-2345',
    address: '303 Data Drive, Programming Place',
    enrollmentDate: '2024-08-25'
  },
];


const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchStudents = async () => {
 
  await delay();
  
  
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch students data');
  }
  
  return [...mockStudents];
};

export const addStudent = async (student) => {

  await delay();

  if (Math.random() < 0.1) {
    throw new Error('Failed to add student');
  }
  

  const newStudent = {
    ...student,
    id: student.id || Math.floor(1000 + Math.random() * 9000)
  };

  mockStudents.push(newStudent);
  
  return newStudent;
};