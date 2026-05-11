/**
 * Seed IANA time zones supported by this Node.js runtime.
 *
 * Run: node scripts/seed-time-zones.js
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import { TimeZone } from '../models/timeZone.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resumeDB';

function offsetMinutesFor(timeZone, date = new Date()) {
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
    }).formatToParts(date);

    const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
    const asUtc = Date.UTC(
        Number(values.year),
        Number(values.month) - 1,
        Number(values.day),
        Number(values.hour),
        Number(values.minute),
        Number(values.second)
    );

    return Math.round((asUtc - date.getTime()) / 60000);
}

function offsetLabel(minutes) {
    const sign = minutes >= 0 ? '+' : '-';
    const absolute = Math.abs(minutes);
    const hours = String(Math.floor(absolute / 60)).padStart(2, '0');
    const mins = String(absolute % 60).padStart(2, '0');
    return `UTC${sign}${hours}:${mins}`;
}

function regionFor(timeZone) {
    return timeZone.includes('/') ? timeZone.split('/')[0] : 'Other';
}

function displayLabel(timeZone, offset) {
    return `${timeZone.replaceAll('_', ' ')} (${offset})`;
}

async function seedTimeZones() {
    if (typeof Intl.supportedValuesOf !== 'function') {
        throw new Error('Intl.supportedValuesOf is not available in this Node.js runtime');
    }

    const names = Intl.supportedValuesOf('timeZone');
    const timeZones = names.map(name => {
        const minutes = offsetMinutesFor(name);
        const offset = offsetLabel(minutes);

        return {
            name,
            label: displayLabel(name, offset),
            region: regionFor(name),
            offsetMinutes: minutes,
            offsetLabel: offset
        };
    });

    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const operations = timeZones.map(timeZone => ({
        updateOne: {
            filter: { name: timeZone.name },
            update: { $set: timeZone },
            upsert: true
        }
    }));

    const result = await TimeZone.bulkWrite(operations, { ordered: false });
    console.log(`Time zones seeded: ${timeZones.length}`);
    console.log(`Inserted: ${result.upsertedCount}, modified: ${result.modifiedCount}, matched: ${result.matchedCount}`);

    await mongoose.disconnect();
}

seedTimeZones().catch(err => {
    console.error('Time zone seed failed:', err);
    process.exit(1);
});
