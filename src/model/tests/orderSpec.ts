import { Order, OrderStore } from '../order';
import supertest from 'supertest';
import app from '../../server';
import { OrderHandler } from '../../handlers/order';
import client from '../../database';

const store = new OrderStore();
const request = supertest(app);

let stat: string = 'active';

const newOrder: Order = {
  status: stat,
  user_id: '1',
};

const order = new OrderHandler();

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create(newOrder)).toBeDefined();
  });

  it('should have a completed order method', () => {
    expect(store.completedOrder).toBeDefined();
  });

  it('should have a current order method', () => {
    expect(store.currentOrder).toBeDefined();
  });
});

describe('Order Endpoints', () => {
  it('should have an index method by endpoint', async () => {
    const response = await request.get('/api/orders');
    expect(response.status).toBe(200);
  });

  it('should have a show method by endpoint', async () => {
    const response = await request.get('/api/orders/1');
    expect(response.status).toBe(200);
  });
  it('should have a create method by endpoint', async () => {
    const response = await request.post('/api/orders').send(newOrder);
    expect(response.status).toBe(200);
  });
  it('should have a completed method by endpoint', async () => {
    const response = await request.get('/api/orders/complete/1');
    expect(response.status).toBe(401);
  });
  it('should have a active method by endpoint', async () => {
    const response = await request.get('/api/orders/active/2');
    expect(response.status).toBe(401);
  });
});
