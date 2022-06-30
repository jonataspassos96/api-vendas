import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ShowOrderService from '../services/ShowOrderService';

export default class OrdersController {
  public async create(req: Request, res: Response) {
    const { customerId, products } = req.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({
      customerId,
      products,
    });

    return res.json(order);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;

    const showOrder = new ShowOrderService();

    const order = await showOrder.execute({ id });

    return res.json(order);
  }
}
