import express, {Application as ExApplication, Handler, Request, Response, Router} from 'express';
import {controllers} from './base.controller';
import {MetadataKeys} from './utils/metadata.keys';
import {IRouter} from './utils/decorators/handlers.decorator';

class Application {
  private readonly _instance: ExApplication;

  get instance(): ExApplication {
    return this._instance;
  }

  constructor() {
    this._instance = express();
    this._instance.use(express.json());
    this.registerRouters();
  }

  private registerRouters(): void {
    this._instance.get('/', (req: Request, res: Response): void => {
      res.json({message: 'Hello World!'});
    });

    const info: Array<{ api: string, handler: string }> = [];

    controllers.forEach((controllerClass) => {
      const controllerInstance: { [handleName: string]: Handler } = new controllerClass() as any;

      const path: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass);
      const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass);

      const router: Router = express.Router();

      routers.forEach(({method, path, handlerName}): void => {
        router[method](path, controllerInstance[String(handlerName)].bind(controllerInstance));

        info.push({
          api: `${method.toLocaleUpperCase()} ${path + path}`,
          handler: `${controllerClass.name}.${String(handlerName)}`,
        });
      });

      this._instance.use(path, router);
    });

    console.table(info);
  }
}

export default new Application();
