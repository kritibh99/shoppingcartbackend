// import {Client, expect} from '@loopback/testlab';
// import {ShoppingappApplication} from '../..';
// import {setupApplication} from './test-helper';

// describe('CalcController', () => {
//   let app: ShoppingappApplication;
//   let client: Client;

//   before('setupApplication', async () => {
//     ({app, client} = await setupApplication());
//   });

//   after(async () => {
//     await app.stop();
//   });

//   it('add 2 numbers', async () => {
//     const res = await client.get('/add?a=1&b=2').expect(200);
//     expect(res.body).to.containEql({value: 3});
//   });

//   it('subtract 2 numbers', async () => {
//     const res = await client.get('/subtract?a=4&b=2').expect(200);
//     expect(res.body).to.containEql({value: 2});
//   })
// });
