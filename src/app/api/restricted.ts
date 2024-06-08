//import { authOptions } from './auth/[...nextauth]/route';
import { authOptions } from '../authOptions';

import { getServerSession } from 'next-auth/next';

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log('session restricted', session);
}
