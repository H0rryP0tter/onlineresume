import mongoose from 'mongoose';

const timeZoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    label: {
        type: String,
        required: true,
        trim: true
    },
    region: {
        type: String,
        required: true,
        trim: true
    },
    offsetMinutes: {
        type: Number,
        required: true
    },
    offsetLabel: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

timeZoneSchema.index({ region: 1, name: 1 });
timeZoneSchema.index({ offsetMinutes: 1 });

export const TimeZone = mongoose.model('TimeZone', timeZoneSchema);
