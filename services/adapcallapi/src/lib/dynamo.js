const aws = require('aws-sdk');

const TABLE_NAME = 'Ligacoes';

module.exports = class Dynamo {
  constructor(){
    // region: 'sa-east-1' - pode definir a região no serverless.yml e usar a variável de ambiente
    region: process.env.region,
    // o json próprio que o dynamo retorna é ruim para leitura, então usa o DocumentClient para estruturar o json melhor
    this.db = aws.DynamoDB.DocumentClient({
      endpoint: (
        process.env.IS_OFFLINE
          ? 'http://localhost:8000'
          : undefined
      ),
    })
  }
  // Nunca utilizar scan em produção, o custo é alto
  // LastEvaluatedKey: pega p último registro da última execução (com limit), e o ExclusiveStartKey começa com a key especificada
  // assim, faz uma função recursiva para paginação, que não é mt boa, mas dá pra fazer
  // se não passar um limit, o dynamo usa um default de 200 e poucos
  async scan({ LastEvaluatedKey, _items = [] }){
    try {
      const { Items , LastEvaluatedKey: lastKey} = await this.db.scan({
        TableName: TABLE_NAME,
        ExclusiveStartKey: LastEvaluatedKey
        // Limit: 50: o Limit não é legal usar com filtro (ex: ligações urgentes), porque percorre a tabela interia, mas só retorna 50 itens
      }).promisse();

      if (lastKey) return this.scan({
        LastEvaluatedKey: lastKey,
        _items: _items.concat(Items),
      });

      return Items
    } catch (error) {
      throw error
    }
  }

  async query(){
    try {
      const { Items } = await this.db.query().promisse();

      return Items
    } catch (error) {
      throw error
    }
  }

  async get(){
    try {
      const { Items } = await this.db.query().promisse();

      return Items
    } catch (error) {
      throw error
    }
  }
};
