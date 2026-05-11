import { TimeZone } from '../models/timeZone.js';

export const getTimeZones = (req, res, next) => {
    return TimeZone.find({}, { _id: 0, name: 1, label: 1, region: 1, offsetMinutes: 1, offsetLabel: 1 })
        .sort({ offsetMinutes: 1 })
        .lean()
        .then(timeZones => {
            const results = timeZones.map(tz => ({
                ...tz,
                label: `(${tz.offsetLabel}) ${tz.name.replace(/_/g, ' ')}`
            }));
            res.json({ count: results.length, results });
        })
        .catch(next);
};
