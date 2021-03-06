//using fastify inject for testing routes
const request = require("supertest");
const { fastify } = require('../app');
describe('Testing Product Routes', () => {
  afterAll(() => {
    fastify.close();
  });

  test('Should get all products details', async (done) => {
    const response = await fastify.inject({
      method: 'GET',
      headers: { "x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjZXNzIjoiZnVsbCIsImlhdCI6MTU4NDE2Njc4MH0.c5s0lusL_MIOU4RQFh1uzTJCOz6qgd_iaQcPwU1MzNI" },
      url: '/products'
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
    done();
  });
  test('should get product by id', async (done) => {
    const response = await fastify.inject({
      method: 'GET',
      headers: { "x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjZXNzIjoiZnVsbCIsImlhdCI6MTU4NDE2Njc4MH0.c5s0lusL_MIOU4RQFh1uzTJCOz6qgd_iaQcPwU1MzNI" },
      url: '/products/1'
    });
    expect(response.statusCode).toBe(200);
    done();
  });
  test('Should add a New Product in Products Table', async (done) => {
    const response = await fastify.inject({
      method: 'POST',
      headers: { "x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjZXNzIjoiZnVsbCIsImlhdCI6MTU4NDE2Njc4MH0.c5s0lusL_MIOU4RQFh1uzTJCOz6qgd_iaQcPwU1MzNI" },
      body: {
        "name": "mk210",
        "category": "mouse",
        "hsncode": "9654",
        "company": "zebronics",
        "serialNo": "zeb0987",
        "stock": "10"
      },
      url: '/products',

    })
    var result = JSON.stringify(response.body);
    console.log(result.length);
    expect(response.statusCode).toBe(200);
    expect(result.length).toBeGreaterThan(0);
    done();
  });
  test('should update an existing product',async(done)=>{
    const response = await fastify.inject({
      method:'PATCH',
      headers:{ "x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjZXNzIjoiZnVsbCIsImlhdCI6MTU4NDE2Njc4MH0.c5s0lusL_MIOU4RQFh1uzTJCOz6qgd_iaQcPwU1MzNI" },
      body:{
        company:'artis'
      },
      url:'/products/1'
    })
    expect(response.statusCode).toBe(200);
    done();
  });
  test('should delete a product',async(done)=>{
    const response = await fastify.inject({
      method:'DELETE',
      headers:{ "x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjZXNzIjoiZnVsbCIsImlhdCI6MTU4NDE2Njc4MH0.c5s0lusL_MIOU4RQFh1uzTJCOz6qgd_iaQcPwU1MzNI" },
      url:'/products/35'
    })
    expect(response.statusCode).toBe(200);
    done();
  });
  test('should fetch records for products based on filter provided',async(done)=>{
    const response = await fastify.inject({
      method:'POST',
      headers:{ "x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjZXNzIjoiZnVsbCIsImlhdCI6MTU4NDE2Njc4MH0.c5s0lusL_MIOU4RQFh1uzTJCOz6qgd_iaQcPwU1MzNI" },
      body:{
        "productId":"2"
      },
      url:'/products/records/Sales'
    })
    expect(response.statusCode).toBe(200);
    done();
  })
});