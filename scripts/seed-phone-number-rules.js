/**
 * Seed phone number normalization rules.
 *
 * Run: node scripts/seed-phone-number-rules.js
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import { CountryCallingCode } from '../models/countryCallingCode.js';
import { PhoneNumberRule } from '../models/phoneNumberRule.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resumeDB';
const KEEP_LEADING_TRUNK_ZERO = new Set(['IT', 'VA', 'SM']);

function ruleForCountry(country) {
    const keepLeadingZero = KEEP_LEADING_TRUNK_ZERO.has(country.iso2);

    return {
        iso2: country.iso2,
        callingCode: country.callingCode,
        removeLeadingTrunkZero: !keepLeadingZero,
        note: keepLeadingZero
            ? 'Leading zero is retained in international format for this numbering plan.'
            : 'Domestic trunk prefix zero is removed when storing international format.'
    };
}

async function seedPhoneNumberRules() {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const countries = await CountryCallingCode.find({}, { _id: 0, iso2: 1, callingCode: 1 }).sort({ name: 1 }).lean();
    if (!countries.length) {
        throw new Error('No country calling codes found. Run npm run seed:countries first.');
    }

    const rules = countries.map(ruleForCountry);
    const operations = rules.map(rule => ({
        updateOne: {
            filter: { iso2: rule.iso2 },
            update: { $set: rule },
            upsert: true
        }
    }));

    const result = await PhoneNumberRule.bulkWrite(operations, { ordered: false });
    console.log(`Phone number rules seeded: ${rules.length}`);
    console.log(`Inserted: ${result.upsertedCount}, modified: ${result.modifiedCount}, matched: ${result.matchedCount}`);

    await mongoose.disconnect();
}

seedPhoneNumberRules().catch(err => {
    console.error('Phone number rule seed failed:', err);
    process.exit(1);
});
