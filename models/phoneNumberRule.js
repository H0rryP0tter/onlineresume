import mongoose from 'mongoose';

const phoneNumberRuleSchema = new mongoose.Schema({
    iso2: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        unique: true
    },
    callingCode: {
        type: String,
        required: true,
        trim: true
    },
    removeLeadingTrunkZero: {
        type: Boolean,
        default: true
    },
    note: {
        type: String,
        trim: true
    }
}, { timestamps: true });

phoneNumberRuleSchema.index({ callingCode: 1 });

export const PhoneNumberRule = mongoose.model('PhoneNumberRule', phoneNumberRuleSchema);
