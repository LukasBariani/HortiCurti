import { Request, Response } from 'express';
import prisma from '../prisma';

export async function createOrder(req: Request, res: Response) {
  const { clientId, shoppingDayId, rawMessages } = req.body;

  if (!clientId || !shoppingDayId || !rawMessages?.length) {
    res.status(400).json({
      error: 'clientId, shoppingDayId e rawMessages são obrigatórios'
    });
    return;
  }

  // Verifica se cliente existe
  const client = await prisma.client.findUnique({ where: { id: clientId } });
  if (!client) {
    res.status(404).json({ error: 'Cliente não encontrado' });
    return;
  }

  // Verifica se o dia de compra existe e está aberto
  const shoppingDay = await prisma.shoppingDay.findUnique({
    where: { id: shoppingDayId }
  });
  if (!shoppingDay || shoppingDay.status !== 'open') {
    res.status(404).json({ error: 'Dia de compra não encontrado ou já fechado' });
    return;
  }

  const order = await prisma.order.create({
    data: {
      clientId,
      shoppingDayId,
      rawMessages
    },
    include: {
      client: true,
      shoppingDay: true
    }
  });

  res.status(201).json(order);
}

export async function listOrders(req: Request, res: Response) {
  const { shoppingDayId } = req.query;

  const orders = await prisma.order.findMany({
    where: shoppingDayId
      ? { shoppingDayId: String(shoppingDayId) }
      : undefined,
    include: {
      client: true,
      orderItems: true
    },
    orderBy: { createdAt: 'desc' }
  });

  res.json(orders);
}