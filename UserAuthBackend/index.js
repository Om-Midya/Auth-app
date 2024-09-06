const express = require('express');
const app = express();
const connectDB = require('./database_config');
app.use(express.json());


// Connect to database
connectDB();
app.get('/health',(req,res)=>{
    res.status(200).json({status:'UP'});
})
// Routes
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

app.use('/api', authRoutes);
app.use('/api', protectedRoutes);

//Global error handler
app.use((req, res, next) => {
    res.status(404).json({error: 'Not found'});
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});