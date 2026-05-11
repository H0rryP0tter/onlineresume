use('resumeDB');

db.createCollection('countrycallingcodes', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'iso2', 'flag', 'callingCode'],
      properties: {
        name: { bsonType: 'string' },
        iso2: { bsonType: 'string' },
        flag: { bsonType: 'string' },
        flagImage: {
          bsonType: 'object',
          properties: {
            data: { bsonType: 'binData' },
            contentType: { bsonType: 'string' },
            sourceUrl: { bsonType: 'string' }
          }
        },
        callingCode: { bsonType: 'string' }
      }
    }
  }
});

db.countrycallingcodes.createIndex({ iso2: 1 }, { unique: true });
db.countrycallingcodes.createIndex({ name: 1 });
db.countrycallingcodes.createIndex({ callingCode: 1 });
