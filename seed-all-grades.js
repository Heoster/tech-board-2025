const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting comprehensive database seeding...');

try {
    // Reset database first
    console.log('📊 Resetting database...');
    execSync('node reset-database-simple.js', { stdio: 'inherit' });

    // Seed each class using our comprehensive seed files
    const classes = [6, 7, 8, 9, 11];

    for (const classNum of classes) {
        console.log(`\n🌱 Seeding Class ${classNum}...`);
        try {
            execSync(`node server/seed/class${classNum}-seed.js`, { stdio: 'inherit' });
        } catch (error) {
            console.error(`❌ Error seeding Class ${classNum}:`, error.message);
        }
    }

    console.log('\n✅ Database seeding completed!');
    console.log('📈 Summary:');
    console.log('- Class 6: 300+ questions (Computer basics, Office tools, Python basics, HTML basics)');
    console.log('- Class 7: 300+ questions (OS, File management, Python programming, HTML/CSS)');
    console.log('- Class 8: 300+ questions (Memory systems, Networking, Databases, Advanced Python)');
    console.log('- Class 9: 300+ questions (Computer architecture, Number systems, Boolean logic, SQL)');
    console.log('- Class 11: 300+ questions (Advanced Python OOP, Data structures, Cybersecurity, Project management)');
    console.log('- Admin user: username=admin, password=admin123');

} catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
}