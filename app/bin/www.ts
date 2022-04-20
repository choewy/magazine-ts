import app from '../app.module';
import db from '../src/models';

const port = process.env.PORT || 5000;
const log = `Server ruuning on port ${port}`;

db.sequelize
  .sync({})
  .then(() => {
    app.listen(port, () => console.log(log));
  })
  .catch((error) => {
    console.log(error);
  });
