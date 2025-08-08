#!/usr/bin/env node

/**
 * Expanded Simple MCQ Questions Seeder
 * Seeds 50+ appropriate multiple-choice questions per grade
 */

const database = require('../config/database');

// Generate more questions programmatically
function generateQuestions() {
    const questions = {
        6: [
            // Computer Basics
            { q: "What does CPU stand for?", opts: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Computer Processing Unit"], correct: 0, diff: "basic" },
            { q: "Which device is used to input text?", opts: ["Monitor", "Keyboard", "Speaker", "Printer"], correct: 1, diff: "basic" },
            { q: "What is the main function of RAM?", opts: ["Store data permanently", "Store data temporarily", "Display images", "Connect to internet"], correct: 1, diff: "basic" },
            { q: "Which is an operating system?", opts: ["Microsoft Word", "Windows", "Google Chrome", "Adobe Photoshop"], correct: 1, diff: "basic" },
            { q: "What does WWW stand for?", opts: ["World Wide Web", "World Wide Work", "Web Wide World", "Wide World Web"], correct: 0, diff: "basic" },
            { q: "Which is an input device?", opts: ["Monitor", "Mouse", "Speaker", "Printer"], correct: 1, diff: "basic" },
            { q: "What is software?", opts: ["Physical parts of computer", "Programs and applications", "Computer screen", "Keyboard and mouse"], correct: 1, diff: "basic" },
            { q: "Which stores data permanently?", opts: ["RAM", "Hard Drive", "CPU", "Monitor"], correct: 1, diff: "basic" },
            { q: "What is hardware?", opts: ["Computer programs", "Physical parts of computer", "Internet connection", "Computer games"], correct: 1, diff: "basic" },
            { q: "Which is an output device?", opts: ["Keyboard", "Mouse", "Monitor", "Microphone"], correct: 2, diff: "basic" },
        ],
        7: [
            // Web and Internet
            { q: "Which language is used for web pages?", opts: ["HTML", "Python", "Java", "C++"], correct: 0, diff: "basic" },
            { q: "What is a browser?", opts: ["A type of computer", "Software to access websites", "A programming language", "A type of printer"], correct: 1, diff: "basic" },
            { q: "Copy shortcut key is?", opts: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + Z"], correct: 0, diff: "basic" },
            { q: "What does URL stand for?", opts: ["Universal Resource Locator", "Uniform Resou