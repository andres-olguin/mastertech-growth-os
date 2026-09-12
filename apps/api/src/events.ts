import { EventEmitter } from 'events';
import { Response } from 'express';

class EventBroker extends EventEmitter {}
export const broker = new EventBroker();

// Lista de clientes conectados a SSE
let clients: Response[] = [];

export function addSSEClient(res: Response) {
  clients.push(res);
  res.on('close', () => {
    clients = clients.filter(client => client !== res);
  });
}

export function broadcastEvent(event: string, data: any) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  clients.forEach(client => client.write(payload));
}