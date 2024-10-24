const express = require('express');
const app = express();
const sequelize = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const setupSwagger = require('./swagger/swagger');
const productRoutes = require('./routes/productRoutes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.json());
setupSwagger(app);

app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', authRoutes);

sequelize.authenticate()
    .then(async () => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        await sequelize.sync({ alter: true }); 
        console.log('Tabela Product sincronizada com sucesso.');

    })
    .catch((error) => {
        console.error('Erro ao conectar ao banco de dados ou sincronizar: ', error);
    });

module.exports = app;
