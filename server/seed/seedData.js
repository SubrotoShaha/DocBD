const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const path = require('path');

// Load env from parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');
const DoctorProfile = require('../models/DoctorProfile');
const SymptomMapping = require('../models/SymptomMapping');

/**
 * Comprehensive symptom-to-specialization mappings
 * Covers common symptoms patients in Bangladesh search for
 */
const symptomMappings = [
  // General Medicine
  { symptom: 'fever', specializations: ['General Medicine', 'Pediatrics'], description: 'Elevated body temperature' },
  { symptom: 'cold', specializations: ['General Medicine', 'ENT'], description: 'Common cold symptoms' },
  { symptom: 'cough', specializations: ['General Medicine', 'Pulmonology'], description: 'Persistent coughing' },
  { symptom: 'fatigue', specializations: ['General Medicine', 'Endocrinology'], description: 'Persistent tiredness' },
  { symptom: 'weakness', specializations: ['General Medicine', 'Neurology'], description: 'General body weakness' },
  { symptom: 'weight loss', specializations: ['General Medicine', 'Endocrinology'], description: 'Unexplained weight loss' },

  // Cardiology
  { symptom: 'chest pain', specializations: ['Cardiology', 'Pulmonology'], description: 'Pain in the chest area' },
  { symptom: 'heart palpitations', specializations: ['Cardiology'], description: 'Irregular or racing heartbeat' },
  { symptom: 'shortness of breath', specializations: ['Cardiology', 'Pulmonology'], description: 'Difficulty breathing' },
  { symptom: 'high blood pressure', specializations: ['Cardiology', 'General Medicine'], description: 'Hypertension symptoms' },

  // Dermatology
  { symptom: 'skin rash', specializations: ['Dermatology'], description: 'Skin irritation or rash' },
  { symptom: 'acne', specializations: ['Dermatology'], description: 'Acne breakouts' },
  { symptom: 'skin issue', specializations: ['Dermatology'], description: 'General skin problems' },
  { symptom: 'itching', specializations: ['Dermatology', 'General Medicine'], description: 'Persistent itching' },
  { symptom: 'hair loss', specializations: ['Dermatology'], description: 'Hair thinning or loss' },
  { symptom: 'eczema', specializations: ['Dermatology'], description: 'Chronic skin inflammation' },

  // Orthopedics
  { symptom: 'joint pain', specializations: ['Orthopedics', 'Rheumatology'], description: 'Pain in joints' },
  { symptom: 'back pain', specializations: ['Orthopedics', 'Neurology'], description: 'Lower or upper back pain' },
  { symptom: 'bone fracture', specializations: ['Orthopedics'], description: 'Broken bones' },
  { symptom: 'knee pain', specializations: ['Orthopedics'], description: 'Pain in knee area' },
  { symptom: 'muscle pain', specializations: ['Orthopedics', 'General Medicine'], description: 'Muscular discomfort' },

  // Neurology
  { symptom: 'headache', specializations: ['Neurology', 'General Medicine'], description: 'Head pain' },
  { symptom: 'migraine', specializations: ['Neurology'], description: 'Severe recurring headaches' },
  { symptom: 'dizziness', specializations: ['Neurology', 'ENT'], description: 'Feeling of unsteadiness' },
  { symptom: 'numbness', specializations: ['Neurology'], description: 'Loss of sensation' },
  { symptom: 'seizures', specializations: ['Neurology'], description: 'Epileptic episodes' },

  // Gastroenterology
  { symptom: 'stomach pain', specializations: ['Gastroenterology', 'General Medicine'], description: 'Abdominal pain' },
  { symptom: 'nausea', specializations: ['Gastroenterology', 'General Medicine'], description: 'Feeling of sickness' },
  { symptom: 'vomiting', specializations: ['Gastroenterology'], description: 'Throwing up' },
  { symptom: 'diarrhea', specializations: ['Gastroenterology'], description: 'Loose watery stools' },
  { symptom: 'acidity', specializations: ['Gastroenterology'], description: 'Acid reflux or heartburn' },
  { symptom: 'bloating', specializations: ['Gastroenterology'], description: 'Abdominal distension' },

  // ENT
  { symptom: 'ear pain', specializations: ['ENT'], description: 'Pain in the ear' },
  { symptom: 'sore throat', specializations: ['ENT', 'General Medicine'], description: 'Throat pain' },
  { symptom: 'hearing loss', specializations: ['ENT'], description: 'Difficulty hearing' },
  { symptom: 'nasal congestion', specializations: ['ENT'], description: 'Blocked nose' },

  // Ophthalmology
  { symptom: 'eye pain', specializations: ['Ophthalmology'], description: 'Pain in eyes' },
  { symptom: 'blurred vision', specializations: ['Ophthalmology', 'Neurology'], description: 'Vision problems' },
  { symptom: 'red eye', specializations: ['Ophthalmology'], description: 'Eye redness or irritation' },

  // Psychiatry
  { symptom: 'anxiety', specializations: ['Psychiatry'], description: 'Anxiety and panic disorders' },
  { symptom: 'depression', specializations: ['Psychiatry'], description: 'Persistent sadness' },
  { symptom: 'insomnia', specializations: ['Psychiatry', 'Neurology'], description: 'Difficulty sleeping' },
  { symptom: 'stress', specializations: ['Psychiatry', 'General Medicine'], description: 'Mental stress' },

  // Gynecology
  { symptom: 'menstrual problems', specializations: ['Gynecology'], description: 'Irregular or painful periods' },
  { symptom: 'pregnancy care', specializations: ['Gynecology'], description: 'Prenatal care' },
  { symptom: 'pelvic pain', specializations: ['Gynecology', 'Urology'], description: 'Pain in pelvic region' },

  // Urology
  { symptom: 'urinary problems', specializations: ['Urology'], description: 'Difficulty urinating' },
  { symptom: 'kidney pain', specializations: ['Urology', 'General Medicine'], description: 'Pain in kidney area' },

  // Pediatrics
  { symptom: 'child fever', specializations: ['Pediatrics'], description: 'Fever in children' },
  { symptom: 'child cough', specializations: ['Pediatrics', 'Pulmonology'], description: 'Cough in children' },

  // Pulmonology
  { symptom: 'asthma', specializations: ['Pulmonology'], description: 'Breathing difficulty and wheezing' },
  { symptom: 'breathing difficulty', specializations: ['Pulmonology', 'Cardiology'], description: 'Dyspnea' },

  // Endocrinology
  { symptom: 'diabetes', specializations: ['Endocrinology', 'General Medicine'], description: 'Blood sugar issues' },
  { symptom: 'thyroid problems', specializations: ['Endocrinology'], description: 'Thyroid gland disorders' },
];

/**
 * Sample doctors for demo purposes
 */
const sampleDoctors = [
  {
    name: 'Dr. Aminul Islam',
    email: 'dr.aminul@docbd.com',
    specialization: 'Cardiology',
    location: 'Dhaka',
    bmdcNumber: 'BMDC-10001',
    bio: 'Experienced cardiologist with 15 years of practice at National Heart Foundation. Specializes in interventional cardiology and heart failure management.',
    consultationFee: 1500,
    availability: [
      { day: 'Sunday', startTime: '09:00', endTime: '14:00' },
      { day: 'Tuesday', startTime: '09:00', endTime: '14:00' },
      { day: 'Thursday', startTime: '16:00', endTime: '20:00' },
    ],
    rating: 4.8,
  },
  {
    name: 'Dr. Fatema Begum',
    email: 'dr.fatema@docbd.com',
    specialization: 'Dermatology',
    location: 'Dhaka',
    bmdcNumber: 'BMDC-10002',
    bio: 'Board-certified dermatologist specializing in skin allergies, eczema, and cosmetic dermatology. 10 years experience at Dhaka Medical College.',
    consultationFee: 1200,
    availability: [
      { day: 'Saturday', startTime: '10:00', endTime: '15:00' },
      { day: 'Monday', startTime: '10:00', endTime: '15:00' },
      { day: 'Wednesday', startTime: '10:00', endTime: '15:00' },
    ],
    rating: 4.6,
  },
  {
    name: 'Dr. Rahman Chowdhury',
    email: 'dr.rahman@docbd.com',
    specialization: 'General Medicine',
    location: 'Chittagong',
    bmdcNumber: 'BMDC-10003',
    bio: 'Internal medicine specialist with expertise in infectious diseases and preventive medicine. 12 years at Chittagong Medical College Hospital.',
    consultationFee: 800,
    availability: [
      { day: 'Saturday', startTime: '08:00', endTime: '13:00' },
      { day: 'Sunday', startTime: '08:00', endTime: '13:00' },
      { day: 'Monday', startTime: '08:00', endTime: '13:00' },
      { day: 'Wednesday', startTime: '08:00', endTime: '13:00' },
    ],
    rating: 4.5,
  },
  {
    name: 'Dr. Nasrin Akter',
    email: 'dr.nasrin@docbd.com',
    specialization: 'Gynecology',
    location: 'Sylhet',
    bmdcNumber: 'BMDC-10004',
    bio: 'Expert in women\'s health, prenatal care, and gynecological surgery. 8 years of experience at Sylhet MAG Osmani Medical College.',
    consultationFee: 1000,
    availability: [
      { day: 'Sunday', startTime: '10:00', endTime: '16:00' },
      { day: 'Tuesday', startTime: '10:00', endTime: '16:00' },
      { day: 'Thursday', startTime: '10:00', endTime: '16:00' },
    ],
    rating: 4.7,
  },
  {
    name: 'Dr. Kamal Hossain',
    email: 'dr.kamal@docbd.com',
    specialization: 'Neurology',
    location: 'Dhaka',
    bmdcNumber: 'BMDC-10005',
    bio: 'Neurologist specializing in epilepsy, stroke, and headache disorders. Former chief of neurology at BIRDEM Hospital.',
    consultationFee: 2000,
    availability: [
      { day: 'Saturday', startTime: '14:00', endTime: '19:00' },
      { day: 'Monday', startTime: '14:00', endTime: '19:00' },
      { day: 'Wednesday', startTime: '14:00', endTime: '19:00' },
    ],
    rating: 4.9,
  },
  {
    name: 'Dr. Sufia Khatun',
    email: 'dr.sufia@docbd.com',
    specialization: 'Pediatrics',
    location: 'Rajshahi',
    bmdcNumber: 'BMDC-10006',
    bio: 'Pediatrician with specialization in neonatal care. 10 years at Rajshahi Medical College Hospital. Passionate about child health education.',
    consultationFee: 700,
    availability: [
      { day: 'Saturday', startTime: '09:00', endTime: '14:00' },
      { day: 'Sunday', startTime: '09:00', endTime: '14:00' },
      { day: 'Tuesday', startTime: '09:00', endTime: '14:00' },
      { day: 'Thursday', startTime: '09:00', endTime: '14:00' },
    ],
    rating: 4.4,
  },
  {
    name: 'Dr. Rafiq Ahmed',
    email: 'dr.rafiq@docbd.com',
    specialization: 'Orthopedics',
    location: 'Dhaka',
    bmdcNumber: 'BMDC-10007',
    bio: 'Orthopedic surgeon specializing in joint replacement and sports injuries. Trained at BSMMU with 14 years of surgical experience.',
    consultationFee: 1800,
    availability: [
      { day: 'Sunday', startTime: '11:00', endTime: '17:00' },
      { day: 'Wednesday', startTime: '11:00', endTime: '17:00' },
    ],
    rating: 4.7,
  },
  {
    name: 'Dr. Tahmina Rahman',
    email: 'dr.tahmina@docbd.com',
    specialization: 'Psychiatry',
    location: 'Dhaka',
    bmdcNumber: 'BMDC-10008',
    bio: 'Psychiatrist focusing on anxiety, depression, and cognitive behavioral therapy. Advocate for mental health awareness in Bangladesh.',
    consultationFee: 1500,
    availability: [
      { day: 'Saturday', startTime: '15:00', endTime: '20:00' },
      { day: 'Tuesday', startTime: '15:00', endTime: '20:00' },
      { day: 'Thursday', startTime: '15:00', endTime: '20:00' },
    ],
    rating: 4.8,
  },
  {
    name: 'Dr. Habibur Rahman',
    email: 'dr.habib@docbd.com',
    specialization: 'Gastroenterology',
    location: 'Khulna',
    bmdcNumber: 'BMDC-10009',
    bio: 'Gastroenterologist with expertise in endoscopy and liver diseases. 9 years at Khulna Medical College Hospital.',
    consultationFee: 1100,
    availability: [
      { day: 'Saturday', startTime: '09:00', endTime: '15:00' },
      { day: 'Monday', startTime: '09:00', endTime: '15:00' },
      { day: 'Thursday', startTime: '09:00', endTime: '15:00' },
    ],
    rating: 4.3,
  },
  {
    name: 'Dr. Mahmuda Akter',
    email: 'dr.mahmuda@docbd.com',
    specialization: 'ENT',
    location: 'Chittagong',
    bmdcNumber: 'BMDC-10010',
    bio: 'ENT specialist with expertise in sinus surgery and hearing disorders. Practicing at Chittagong ENT Hospital for 7 years.',
    consultationFee: 900,
    availability: [
      { day: 'Sunday', startTime: '10:00', endTime: '16:00' },
      { day: 'Tuesday', startTime: '10:00', endTime: '16:00' },
      { day: 'Thursday', startTime: '10:00', endTime: '16:00' },
    ],
    rating: 4.5,
  },
  {
    name: 'Dr. Anisur Rahman',
    email: 'dr.anisur@docbd.com',
    specialization: 'Pulmonology',
    location: 'Dhaka',
    bmdcNumber: 'BMDC-10011',
    bio: 'Pulmonologist specializing in asthma, COPD, and respiratory infections. Senior consultant at National Institute of Diseases of the Chest and Hospital.',
    consultationFee: 1300,
    availability: [
      { day: 'Saturday', startTime: '08:00', endTime: '13:00' },
      { day: 'Monday', startTime: '08:00', endTime: '13:00' },
      { day: 'Wednesday', startTime: '14:00', endTime: '18:00' },
    ],
    rating: 4.6,
  },
  {
    name: 'Dr. Sharmin Jahan',
    email: 'dr.sharmin@docbd.com',
    specialization: 'Ophthalmology',
    location: 'Sylhet',
    bmdcNumber: 'BMDC-10012',
    bio: 'Eye specialist with expertise in cataract surgery and glaucoma treatment. 6 years experience at Ispahani Islamia Eye Institute.',
    consultationFee: 1000,
    availability: [
      { day: 'Saturday', startTime: '09:00', endTime: '14:00' },
      { day: 'Monday', startTime: '09:00', endTime: '14:00' },
      { day: 'Wednesday', startTime: '09:00', endTime: '14:00' },
    ],
    rating: 4.4,
  },
];

/**
 * Main seed function
 */
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      DoctorProfile.deleteMany({}),
      SymptomMapping.deleteMany({}),
    ]);

    // ─── Seed Symptom Mappings ─────────────────────────────
    console.log('💊 Seeding symptom mappings...');
    await SymptomMapping.insertMany(symptomMappings);
    console.log(`   ✅ ${symptomMappings.length} symptom mappings created`);

    // ─── Create Admin User ─────────────────────────────────
    console.log('👤 Creating admin user...');
    const admin = await User.create({
      name: 'System Admin',
      email: 'admin@docbd.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log(`   ✅ Admin: admin@docbd.com / admin123`);

    // ─── Create Sample Doctors ─────────────────────────────
    console.log('🩺 Creating sample doctors...');
    for (const doc of sampleDoctors) {
      const user = await User.create({
        name: doc.name,
        email: doc.email,
        password: 'doctor123',
        role: 'doctor',
      });

      await DoctorProfile.create({
        userId: user._id,
        bmdcNumber: doc.bmdcNumber,
        specialization: doc.specialization,
        location: doc.location,
        bio: doc.bio,
        consultationFee: doc.consultationFee,
        availability: doc.availability,
        rating: doc.rating,
        totalReviews: Math.floor(Math.random() * 100) + 10,
      });

      console.log(`   ✅ ${doc.name} — ${doc.specialization} (${doc.location})`);
    }

    // ─── Create Sample Patient ─────────────────────────────
    console.log('🧑 Creating sample patient...');
    await User.create({
      name: 'Rahim Uddin',
      email: 'patient@docbd.com',
      password: 'patient123',
      role: 'patient',
    });
    console.log(`   ✅ Patient: patient@docbd.com / patient123`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('─────────────────────────────────');
    console.log('Demo Accounts:');
    console.log('  Admin:   admin@docbd.com   / admin123');
    console.log('  Doctor:  dr.aminul@docbd.com / doctor123');
    console.log('  Patient: patient@docbd.com / patient123');
    console.log('─────────────────────────────────');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
