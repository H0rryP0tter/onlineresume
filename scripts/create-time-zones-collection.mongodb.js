use('resumeDB');

db.createCollection('timezones', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'label', 'region', 'offsetMinutes', 'offsetLabel'],
      properties: {
        name: { bsonType: 'string' },
        label: { bsonType: 'string' },
        region: { bsonType: 'string' },
        offsetMinutes: { bsonType: 'number' },
        offsetLabel: { bsonType: 'string' }
      }
    }
  }
});

db.timezones.createIndex({ name: 1 }, { unique: true });
db.timezones.createIndex({ region: 1, name: 1 });
db.timezones.createIndex({ offsetMinutes: 1 });
