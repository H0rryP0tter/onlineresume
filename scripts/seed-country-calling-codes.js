/**
 * Seed country calling codes.
 *
 * Run: node scripts/seed-country-calling-codes.js
 */
import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import { CountryCallingCode } from '../models/countryCallingCode.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resumeDB';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '..', 'data', 'country-calling-codes.json');

function flagImageUrl(iso2) {
    return `https://flagcdn.com/w40/${iso2.toLowerCase()}.png`;
}

async function fetchFlagImage(country) {
    const sourceUrl = flagImageUrl(country.iso2);
    const response = await fetch(sourceUrl);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status} while fetching ${sourceUrl}`);
    }

    return {
        data: Buffer.from(await response.arrayBuffer()),
        contentType: response.headers.get('content-type') || 'image/png',
        sourceUrl
    };
}

async function withFlagImages(countries) {
    const batchSize = 12;
    const enriched = [];

    for (let i = 0; i < countries.length; i += batchSize) {
        const batch = countries.slice(i, i + batchSize);
        const downloaded = await Promise.all(batch.map(async country => {
            try {
                return {
                    ...country,
                    flagImage: await fetchFlagImage(country)
                };
            } catch (err) {
                console.warn(`Could not fetch flag image for ${country.iso2}: ${err.message}`);
                return country;
            }
        }));
        enriched.push(...downloaded);
        console.log(`Prepared flag images: ${Math.min(i + batch.length, countries.length)}/${countries.length}`);
    }

    return enriched;
}

async function seedCountryCallingCodes() {
    const raw = await fs.readFile(dataPath, 'utf8');
    const countries = await withFlagImages(JSON.parse(raw));

    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const operations = countries.map(country => ({
        updateOne: {
            filter: { iso2: country.iso2 },
            update: { $set: country },
            upsert: true
        }
    }));

    const result = await CountryCallingCode.bulkWrite(operations, { ordered: false });
    console.log(`Country calling codes seeded: ${countries.length}`);
    console.log(`Inserted: ${result.upsertedCount}, modified: ${result.modifiedCount}, matched: ${result.matchedCount}`);

    await mongoose.disconnect();
}

seedCountryCallingCodes().catch(err => {
    console.error('Country calling code seed failed:', err);
    process.exit(1);
});
