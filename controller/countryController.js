import { CountryCallingCode } from '../models/countryCallingCode.js';
import { PhoneNumberRule } from '../models/phoneNumberRule.js';

const flagImageBuffer = (imageData) => {
    if (!imageData) return null;
    if (Buffer.isBuffer(imageData)) return imageData;
    if (Buffer.isBuffer(imageData.buffer)) return imageData.buffer;
    return null;
};

export const getCallingCodes = (req, res, next) => {
    return Promise.all([
        CountryCallingCode.find({}, { _id: 0, name: 1, iso2: 1, flag: 1, flagImage: 1, callingCode: 1 })
            .sort({ name: 1 })
            .lean(),
        PhoneNumberRule.find({}, { _id: 0, iso2: 1, removeLeadingTrunkZero: 1, note: 1 }).lean()
    ])
        .then(([countries, rules]) => {
            const rulesByIso2 = new Map(rules.map(rule => [rule.iso2, rule]));
            const results = countries.map(country => {
                const image = country.flagImage;
                const imageBuffer = flagImageBuffer(image?.data);
                const hasImage = imageBuffer && image?.contentType;
                const flagImageDataUrl = hasImage
                    ? `data:${image.contentType};base64,${imageBuffer.toString('base64')}`
                    : '';
                const phoneRule = rulesByIso2.get(country.iso2);

                return {
                    name: country.name,
                    iso2: country.iso2,
                    flag: country.flag,
                    callingCode: country.callingCode,
                    flagImageDataUrl,
                    phoneRule: {
                        removeLeadingTrunkZero: phoneRule?.removeLeadingTrunkZero !== false,
                        note: phoneRule?.note || ''
                    }
                };
            });

            return res.json({ count: results.length, results });
        })
        .catch(next);
};
