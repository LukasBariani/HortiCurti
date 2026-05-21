import { Request, Response } from 'express';
import prisma from '../prisma';

export async function createClient(req: Request, res: Response) {
  const { name, phoneWhatsapp } = req.body;

  if (!name || !phoneWhatsapp) {
    res.status(400).json({ error: 'name e phoneWhatsapp são obrigatórios' });
    return;
  }

  const client = await prisma.client.create({
    data: { name, phoneWhatsapp }
  });

  res.status(201).json(client);
}

export async function listClients(req: Request, res: Response) {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: 'desc' }
  });

  res.json(clients);
}