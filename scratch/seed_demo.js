async function seed() {
  const api = 'http://localhost:5000/api';

  // Login recruiter
  let token;
  const loginRes = await fetch(`${api}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'recruiter@example.com', password: 'Password123!' })
  });

  const loginData = await loginRes.json();
  if (loginData.token) {
    token = loginData.token;
  } else {
    const regRes = await fetch(`${api}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Sarah Jenkins',
        email: 'recruiter@example.com',
        password: 'Password123!',
        role: 'recruiter'
      })
    });
    const regData = await regRes.json();
    token = regData.token;
  }

  // Ensure student exists
  await fetch(`${api}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Alex Rivera',
      email: 'student@example.com',
      password: 'Password123!',
      role: 'student'
    })
  });

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const opportunities = [
    {
      title: 'Full Stack Software Engineer Intern',
      company: 'TechBridge Labs',
      description: 'Join our agile team building modern cloud-native web applications. You will work with React, Node.js, and MongoDB to ship user-facing features and improve platform reliability.',
      type: 'internship',
      workMode: 'remote',
      location: 'Remote, India',
      requirements: ['React', 'Node.js', 'REST APIs', 'Git'],
      stipend: '₹35,000 / month',
      deadline: '2026-11-30'
    },
    {
      title: 'Frontend Developer (React)',
      company: 'Apex Cloud Systems',
      description: 'We are seeking a talented Frontend Engineer passionate about clean UI/UX, responsive styling, and fast single-page applications.',
      type: 'full-time',
      workMode: 'hybrid',
      location: 'Bangalore, India',
      requirements: ['React 18', 'JavaScript', 'CSS3', 'Vite'],
      stipend: '₹8 - 12 LPA',
      deadline: '2026-12-15'
    },
    {
      title: 'Backend Engineering Intern',
      company: 'DataStream Technologies',
      description: 'Work on distributed microservices, database optimizations, and secure RESTful endpoints in Node.js and Express.',
      type: 'internship',
      workMode: 'onsite',
      location: 'Hyderabad, India',
      requirements: ['Node.js', 'Express', 'MongoDB', 'Authentication'],
      stipend: '₹40,000 / month',
      deadline: '2026-11-15'
    }
  ];

  for (const opp of opportunities) {
    const res = await fetch(`${api}/opportunities`, {
      method: 'POST',
      headers,
      body: JSON.stringify(opp)
    });
    const data = await res.json();
    console.log('Created opportunity:', data.data?.title || data.message);
  }

  console.log('Demo data seeded successfully!');
}

seed().catch(console.error);
