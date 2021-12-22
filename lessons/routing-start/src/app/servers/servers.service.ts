export class ServersService {
  private servers = [
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

  getServers() {
    return this.servers;
  }

  getServer(id: number) {
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
