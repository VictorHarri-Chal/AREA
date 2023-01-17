const userSchema = new mongoose.Schema({
    name: String,
    required: true,
    age: Number,
    required: false,
    email: String,
    required: true
});
