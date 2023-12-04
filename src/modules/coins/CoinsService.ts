export type ConnectionState = 'connected' | 'disconnected' | 'connecting';
type Listener = (state: ConnectionState) => void;
type Subscriber = (data: any) => void;

export class CoinsService {
  // eslint-disable-next-line no-use-before-define
  private static instance: CoinsService;

  private readonly retryDelay = 3000;
  private readonly endpoint = 'wss://ws.coincap.io/prices?assets=ALL';

  private subscribers: Subscriber[] = [];
  private listeners: Listener[] = [];
  private socket: WebSocket | null = null;
  private retryTimeout: NodeJS.Timeout | null = null;

  private constructor() {
    this.connect();
    this.setupOnlineStatusListener();
  }

  private connect() {
    this.socket = new WebSocket(this.endpoint);

    this.socket.addEventListener('open', () => {
      this.broadcastState('connected');
      this.clearRetryTimeout();
    });

    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      this.broadcast(data);
    });

    this.socket.addEventListener('error', () => {
      console.error('WebSocket error');
      this.broadcastState('disconnected');
      this.clearRetryTimeout();
      this.handleConnectionError();
    });

    this.socket.addEventListener('close', () => {
      console.error('WebSocket connection closed');
      this.broadcastState('disconnected');
      this.clearRetryTimeout();
      this.handleConnectionError();
    });
  }

  private handleConnectionError() {
    this.retryTimeout = setTimeout(() => {
      this.connect();
    }, this.retryDelay);
  }

  private clearRetryTimeout() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
      this.retryTimeout = null;
    }
  }

  private broadcast(data: any) {
    this.subscribers.forEach((subscriber) => {
      subscriber(data);
    });
  }

  private broadcastState(state: ConnectionState) {
    this.listeners.forEach((listener) => {
      listener(state);
    });
  }

  private setupOnlineStatusListener() {
    const isClient = typeof window !== 'undefined';

    if (isClient) {
      window.addEventListener('online', () => {
        // You might want to attempt reconnection when the browser comes online
        if (!this.socket) {
          this.connect();
        }
      });

      window.addEventListener('offline', () => {
        this.handleConnectionError();
      });
    }
  }

  // Implementing singleton pattern
  public static getInstance(): CoinsService {
    if (!CoinsService.instance) {
      CoinsService.instance = new CoinsService();
    }
    return CoinsService.instance;
  }

  public subscribe(subscriber: Subscriber) {
    this.subscribers.push(subscriber);
  }

  public unsubscribe(subscriber: Subscriber) {
    this.subscribers = this.subscribers.filter((s) => s !== subscriber);
  }

  public listen(listener: Listener) {
    this.listeners.push(listener);
  }
}
