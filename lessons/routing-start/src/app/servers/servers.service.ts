import { Server } from "./server/server.model";

export class ServersService {
  
  private servers: Server[] = [
    {
      id: 1,
      name: 'production-server',
      status: 'online'
    },
    {
      id: 2,
      name: 'test-server',
      status: 'offline'
    },
    {
      id: 3,
      name: 'dev-server',
      status: 'offline'
    }
  ];

  getServers(): Server[] {
    return this.servers;
  }

  getServer(id: number): Server {
    return this.servers.find((server) => server.id === id);
  }

  updateServer(id: number, serverInfo: { name: string, status: string }) {
    const server = this.getServer(id);

    if (server) {
      server.name = serverInfo.name;
      server.status = serverInfo.status;
    }
  }
}
