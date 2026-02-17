// Quick script to delete all users and create new admin
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./src/models/User');

async function resetAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Delete all users
        await User.deleteMany({});
        console.log('All users deleted');

        // Create new admin
        const admin = await User.create({
            email: 'abhi@admin.com',
            password: 'admin123',
            role: 'admin'
        });

        console.log('✅ New admin created:', admin.email);
        console.log('Email: abhi@admin.com');
        console.log('Password: admin123');

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

resetAdmin();
