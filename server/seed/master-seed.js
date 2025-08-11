const seedClass6Questions = require('./class6-seed');
const seedClass7Questions = require('./class7-seed');
const seedClass8Questions = require('./class8-seed');
const seedClass9Questions = require('./class9-seed');
const seedClass11Questions = require('./class11-seed');

async function seedAllQuestions() {
    try {
        console.log('Starting comprehensive seeding process...');

        console.log('Seeding Class 6 questions...');
        await seedClass6Questions();

        console.log('Seeding Class 7 questions...');
        await seedClass7Questions();

        console.log('Seeding Class 8 questions...');
        await seedClass8Questions();

        console.log('Seeding Class 9 questions...');
        await seedClass9Questions();

        console.log('Seeding Class 11 questions...');
        await seedClass11Questions();

        console.log('All seeding completed successfully!');
        console.log('Total classes seeded: 5 (Class 6, 7, 8, 9, 11)');
        console.log('Each class has 300+ questions covering comprehensive topics');

    } catch (error) {
        console.error('Error during seeding process:', error);
    }
}

if (require.main === module) {
    seedAllQuestions();
}

module.exports = seedAllQuestions;