const express = require('express');
const cors = require('cors');
const sql = require('msnodesqlv8');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/restaurants', (req, res) => {
  const query = 'SELECT * FROM Restaurants';
  const connectionString =
    'server=DESKTOP-I7T6E5Q;Database=Food;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};Protocol=TCP;';

  sql.query(connectionString, query, (error, rows) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } else {
      res.json(rows);
    }
  });
});

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM Restaurants WHERE Id_restaurant = ?';
  const connectionString =
    'server=DESKTOP-I7T6E5Q;Database=Food;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};Protocol=TCP;';

  sql.query(connectionString, query, [id], (error, rows) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving restaurant');
    } else if (rows.length === 0) {
      res.status(404).send('Restaurant not found');
    } else {
      res.json(rows[0]);
    }
  });
});

app.get('/menu/:id_restaurant', (req, res) => {
  const idRestaurant = req.params.id_restaurant;
  const query =
    'SELECT Id_menu, Id_restaurant, Name_food, Description_food, Price_food FROM Menu WHERE Id_restaurant = ?';
  const connectionString =
    'server=DESKTOP-I7T6E5Q;Database=Food;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};Protocol=TCP;';

  sql.query(connectionString, query, [idRestaurant], (error, rows) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving menu items');
    } else {
      res.json(rows);
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
