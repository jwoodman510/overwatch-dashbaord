export class Environment {
  production: boolean;
  overwatchApi: {
    host: string;
    version: string;
  };
  battleTags: Array<string>;
}
