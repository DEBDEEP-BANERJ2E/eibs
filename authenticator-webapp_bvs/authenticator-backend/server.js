const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const walletRoutes = require('./routes/walletRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Use wallet routes
app.use('/api/wallet', walletRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
