// Initialize the library database with collections and indexes
db = db.getSiblingDB('library');

// Create collections
db.createCollection('users');
db.createCollection('books');
db.createCollection('loans');

// Create indexes for users
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.users.createIndex({ class: 1 });
db.users.createIndex({ name: "text" });

// Create indexes for books
db.books.createIndex({ title: "text", author: "text" });
db.books.createIndex({ genre: 1 });
db.books.createIndex({ year: 1 });

// Create indexes for loans
db.loans.createIndex({ book_id: 1 });
db.loans.createIndex({ reader_id: 1 });
db.loans.createIndex({ returned_at: 1 });
db.loans.createIndex({ due_date: 1 });
db.loans.createIndex({ borrowed_at: -1 });

print('MongoDB initialization completed successfully!');
