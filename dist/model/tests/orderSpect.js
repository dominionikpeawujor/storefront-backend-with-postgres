"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const store = new order_1.OrderStore();
const request = (0, supertest_1.default)(server_1.default);
let stat = 'active';
const newOrder = {
    status: stat,
    user_id: '1',
    product_id: '1',
    quantity: '200',
};
describe('Order Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have an create method', () => {
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
});
