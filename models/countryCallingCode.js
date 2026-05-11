import mongoose from 'mongoose';

const countryCallingCodeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    iso2: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        unique: true
    },
    flag: {
        type: String,
        required: true,
        trim: true
    },
    flagImage: {
        data: Buffer,
        contentType: {
            type: String,
            trim: true
        },
        sourceUrl: {
            type: String,
            trim: true
        }
    },
    callingCode: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

countryCallingCodeSchema.index({ name: 1 });
countryCallingCodeSchema.index({ callingCode: 1 });

export const CountryCallingCode = mongoose.model('CountryCallingCode', countryCallingCodeSchema);
