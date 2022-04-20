import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const swaggerYaml = YAML.load(path.join(__dirname, '../swagger.yaml'));

const Swagger = () => ({
  url: '/apiDocs',
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerYaml),
});

export default Swagger();
