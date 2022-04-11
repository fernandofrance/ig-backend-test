# Considerações

Não consegui colocar a API em um container Docker e fazer ela se comunicar com o meu banco de dados, tive problema de connection refused enquanto realizava os testes. O banco de dados pode ser usado com o Docker sem problemas, como explicado nas instruções abaixo. Espero não ser um fator desclassificatório do teste, com mais alguns dias de prazo para estudo eu conseguiria resolver este problema.

O teste também requisita TDD, comecei a aprender sobre ele e o Docker recentemente, então os testes que escrevi nessa aplicação podem estar incompletos por falta de conhecimento, porém eu entendo os princípios do TDD (test first, code later) e consigo trabalhar em projetos que utilizam essa metodologia.

No README do teste também possui um exemplo de objeto de usuário:
```
{
  id: uuid,
  nome: string, 
  sobrenome: string,
  CPF: number,
  e-mail string:,
}
```

Optei por usar o CPF como string, pois como número poderia ter um bug onde se o CPF começasse com 0 (exemplo: 001.234.567-89), ao salvar no banco de dados os primeiros dígitos seriam deletados, invalidando o CPF (deixando dessa forma: 1.234.567-89).

# Rodando o app

1. Crie um arquivo `.env` e insira os valores conforme especificado no arquivo `.env.example`

2. Inicialize o banco de dados PostgreSQL utilizando:
```
docker run -e POSTGRES_PASSWORD=<SENHA> -d -p <PORTA>:<PORTA> postgres
```
Lembre-se de utilizar a mesma senha e porta que inseriu no `.env`!

3. Instale as dependências utilizando `yarn install` ou `npm install`

4. Inicie o app utilizando `yarn start` ou `npm run start`

5. Para rodar a suite de testes utilize `yarn test` ou `npm run test`

# Insomnia

O arquivo `Insomnia_2022-04-11.json` possui as rotas pré-configuradas para teste, você pode utilizar as variáveis de ambiente do próprio Insomnia para configurar o token JWT
