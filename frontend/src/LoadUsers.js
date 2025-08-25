const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "Admin"
  },
  {
    name: "Mentor John",
    email: "mentor@example.com",
    password: "mentor123",
    role: "Mentor"
  },
  {
    name: "Mentee Jane",
    email: "mentee@example.com",
    password: "mentee123",
    role: "Mentee"
  }
];

localStorage.setItem('users', JSON.stringify(users));
alert("✅ Test users loaded into localStorage!");