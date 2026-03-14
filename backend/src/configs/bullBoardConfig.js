import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import mailQueue from '../queues/mailQueue.js';
import testQueue from '../queues/testQueue.js';




const bullServerAdapter = new ExpressAdapter();

createBullBoard({
    queues: [new BullAdapter(mailQueue), new BullAdapter(testQueue)],
    serverAdapter: bullServerAdapter
})

bullServerAdapter.setBasePath('/ui');

export default bullServerAdapter;