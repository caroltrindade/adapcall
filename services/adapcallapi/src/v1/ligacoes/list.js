'use strict';
const dynamo = require('../../lib/dynamo');

module.exports.run = async event => {
  try {
    const ligacoes = await dynamo.scan()

    return {
      statusCode: 200,
      body: JSON.stringify({
        ligacoes,
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error,
        message: 'deu erro!',
      }),
    }
  };
};
