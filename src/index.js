import { create } from '@wppconnect-team/wppconnect';
import csvToJson from 'csvtojson';
import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { dataProcessor, Throttle } from './processor.js';
import { getMessage } from './utils.js';

const throttle = new Throttle({
  objectMode: true,
  requestsPerSecond: 1,
});

create().then((client) => {
  pipeline(
    createReadStream('filename.csv'),
    csvToJson(),
    dataProcessor,
    throttle,
    async function* (source) {
      let counter = 0;
      for await (const data of source) {
        console.log(`processed ${++counter} items...\n`);
        const { name, phone } = JSON.parse(data);
        await client.sendText(phone, getMessage(name)).then((content) => {
          console.log('content', content);
        });
      }
    }
  );
});
