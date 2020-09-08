import { registerAs } from '@nestjs/config';

const myConfig = { foo: 'bar' };
export default registerAs('coffees', () => myConfig);
