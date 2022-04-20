import app from '../app';
import db from '../src/modules/app/app.models';

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
