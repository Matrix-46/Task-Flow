require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

connectDB();

const app = express();

app.use(helmet());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Backend Assignment API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/v1/auth',
            tasks: '/api/v1/tasks'
        }
    });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});

module.exports = app;
