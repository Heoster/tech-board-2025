const seedClass6 = require('./improved-grade6-questions');
const seedClass7 = require('./class7-seed');
const seedClass8 = require('./class8-seed');
const seedClass9 = require('./class9-seed');
const seedClass11 = require('./class11-seed');

async function runAllSeeds() {
    console.log('Starting database seeding...');

    try {
        await seedClass6();
        await seedClass7();
        await seedClass8();
        await seedClass9();
        await seedClass11();

        console.log('All classes seeded successfully!');
    } catch (error) {
        console.error('Error during seeding:', error);
    }
}

if (require.main === module) {
    runAllSeeds();
}

module.exports = runAllSeeds;