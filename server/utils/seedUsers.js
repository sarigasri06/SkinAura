const User = require('../models/User');

const testUsers = [
  {
    name: 'Priya Sharma',
    email: 'priya@test.com',
    password: 'priya123',
    role: 'customer',
    phone: '9876543210',
  },
  {
    name: 'Rahul Verma',
    email: 'rahul@test.com',
    password: 'rahul123',
    role: 'customer',
    phone: '9876543211',
  },
  {
    name: 'Ananya Patel',
    email: 'ananya@test.com',
    password: 'ananya123',
    role: 'customer',
    phone: '9876543212',
  },
  {
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin',
    phone: '9999999999',
  },
];

const seedUsers = async () => {
  try {
    const count = await User.countDocuments({});
    if (count > 0) {
      console.log(`Database already has ${count} users, skipping user seed.`);
      console.log('');
      console.log('  📋 TEST ACCOUNTS (already seeded):');
      console.log('  ─────────────────────────────────────────');
      testUsers.forEach((u) => {
        console.log(`  ${u.role === 'admin' ? '🔧' : '👤'} ${u.email}  |  ${u.password}  (${u.name})`);
      });
      console.log('');
      return;
    }

    for (const userData of testUsers) {
      const existing = await User.findOne({ email: userData.email });
      if (!existing) {
        // User.create triggers the pre-save bcrypt hook
        await User.create({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: userData.role,
          phone: userData.phone,
        });
      }
    }

    console.log('✅ Sample test users created!');
    console.log('');
    console.log('  📋 TEST ACCOUNTS:');
    console.log('  ─────────────────────────────────────────');
    testUsers.forEach((u) => {
      console.log(`  ${u.role === 'admin' ? '🔧' : '👤'} ${u.email}  |  ${u.password}  (${u.name})`);
    });
    console.log('');
    console.log('  Go to http://localhost:5173/login to sign in.');
    console.log('');
  } catch (error) {
    console.error(`User seeding error: ${error.message}`);
  }
};

module.exports = seedUsers;
