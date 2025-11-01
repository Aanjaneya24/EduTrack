const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/adminSchema.js');
const Student = require('./models/studentSchema.js');
const Teacher = require('./models/teacherSchema.js');
const Sclass = require('./models/sclassSchema.js');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB for seeding'))
.catch(err => console.error('MongoDB connection error:', err));

async function seedGuestAccounts() {
    try {
        console.log('Starting guest account seeding...\n');

        // Clean up existing guest accounts first
        console.log('Cleaning up existing guest accounts...');
        await Student.deleteOne({ rollNum: 1, name: 'kite' });
        await Teacher.deleteOne({ email: 'Aanjaneya Pandey' });
        await Admin.deleteOne({ email: 'John@12' });
        console.log('✅ Cleanup completed\n');

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('zxc', salt);

        // 1. Create Guest Admin Account (Admin doesn't use bcrypt, stores plain password)
        console.log('Creating Guest Admin...');
        const existingAdmin = await Admin.findOne({ email: 'John@12' });
        
        let guestAdmin;
        if (!existingAdmin) {
            guestAdmin = new Admin({
                name: 'John Doe',
                email: 'John@12',
                password: 'zxc', // Admin stores plain text
                role: 'Admin',
                schoolName: 'Guest Demo School'
            });
            await guestAdmin.save();
            console.log('✅ Guest Admin created: John@12 / zxc');
        } else {
            guestAdmin = existingAdmin;
            console.log('ℹ️  Guest Admin already exists');
        }

        // 2. Create a Demo Class for the school
        console.log('\nCreating Demo Class...');
        let demoClass = await Sclass.findOne({ 
            sclassName: 'Demo Class 1',
            school: guestAdmin._id 
        });

        if (!demoClass) {
            demoClass = new Sclass({
                sclassName: 'Demo Class 1',
                school: guestAdmin._id
            });
            await demoClass.save();
            console.log('✅ Demo Class created');
        } else {
            console.log('ℹ️  Demo Class already exists');
        }

        // 3. Create Guest Student Account (uses bcrypt)
        console.log('\nCreating Guest Student...');
        const existingStudent = await Student.findOne({ 
            rollNum: 1,
            name: 'kite',
            school: guestAdmin._id
        });

        if (!existingStudent) {
            const guestStudent = new Student({
                name: 'kite',
                rollNum: 1,
                password: hashedPassword, // Student uses bcrypt
                sclassName: demoClass._id,
                school: guestAdmin._id,
                role: 'Student'
            });
            await guestStudent.save();
            console.log('✅ Guest Student created: Roll#1, Name: kite / zxc');
        } else {
            console.log('ℹ️  Guest Student already exists');
        }

        // 4. Create Guest Teacher Account (uses bcrypt)
        console.log('\nCreating Guest Teacher...');
        const existingTeacher = await Teacher.findOne({ 
            email: 'Aanjaneya Pandey',
            school: guestAdmin._id
        });

        if (!existingTeacher) {
            const guestTeacher = new Teacher({
                name: 'Aanjaneya Pandey',
                email: 'Aanjaneya Pandey',
                password: hashedPassword, // Teacher uses bcrypt
                role: 'Teacher',
                school: guestAdmin._id,
                teachSclass: demoClass._id
            });
            await guestTeacher.save();
            console.log('✅ Guest Teacher created: Aanjaneya Pandey / zxc');
        } else {
            console.log('ℹ️  Guest Teacher already exists');
        }

        console.log('\n✅ Guest account seeding completed successfully!');
        console.log('\n📝 Guest Credentials:');
        console.log('   Admin    : John@12 / zxc');
        console.log('   Student  : Roll#1, Name: kite / zxc');
        console.log('   Teacher  : Aanjaneya Pandey / zxc');
        console.log('\nYou can now use "Continue as Guest" on the login page!');

    } catch (error) {
        console.error('❌ Error seeding guest accounts:', error);
    } finally {
        mongoose.connection.close();
        console.log('\nDatabase connection closed.');
    }
}

// Run the seeding function
seedGuestAccounts();
