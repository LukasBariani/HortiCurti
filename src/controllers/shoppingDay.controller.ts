import { Request, Response } from 'express';
import prisma from '../prisma';

export async function createShoppingDay(req: Request, res: Response) {
  // Verifica se já existe um dia aberto hoje
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existing = await prisma.shoppingDay.findFirst({
    where: {
      date: { gte: today },
      status: 'open'
    }
  });

  if (existing) {
    res.status(400).json({
      error: 'Já existe um dia de compra aberto hoje',
      shoppingDay: existing
    });
    return;
  }

  const shoppingDay = await prisma.shoppingDay.create({
    data: {}
  });

  res.status(201).json(shoppingDay);
}

export async function listShoppingDays(req: Request, res: Response) {
  const days = await prisma.shoppingDay.findMany({
    orderBy: { date: 'desc' },
    include: {
      _count: { select: { orders: true } } // quantos pedidos tem no dia
    }
  });

  res.json(days);
}