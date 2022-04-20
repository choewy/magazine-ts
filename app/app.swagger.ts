import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const yamlPath = path.join(__dirname, '../swagger.yaml');
const swaggerYaml = YAML.load(yamlPath);

const Swagger = () => ({
  url: '/apiDocs',
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerYaml),
});

export default Swagger();
