// const { Queue, Worker } = require('bullmq');
// const { sendEmail } = require('../services/email.service');
// // Adjust the path based on your file structure
// const redis = {
//   host: '127.0.0.1',
//   port: 6379,
// };
// const emailQueue = new Queue('emailQueue', { connection: redis });

// // Create a worker with the same connection details as the queue
// const emailWorker = new Worker(
//   'emailQueue',
//   async (job) => {
//     // Worker logic
//     const { htmlTemplate, userId, subject } = job.data;
//     const jobId = job.id;
//     await sendEmail(htmlTemplate, userId, subject, jobId);
//     console.log('Worker processed email job', job.id);
//   },
//   { connection: redis }
// );
// async function addEmailJob(htmlTemplate, userId, subject) {
//   try {
//     // Enqueue a job with specified data
//     await emailQueue.add('sendEmailJob', { htmlTemplate, userId, subject });
//     console.log('Email job added to the queue');
//   } catch (error) {
//     console.error('Failed to add email job to the queue:', error);
//   }
// }

// emailQueue.on('failed', async function (job, err) {
//   console.log(`Job ${job.id} failed with error ${err}`);
// });

// emailWorker.on('completed', (job) => {
//   console.log(`Job ${job.id} has been completed`);
// });

// emailWorker.on('error', (err) => {
//   console.log(`Worker error: ${err}`);
// });

// emailWorker.on('waiting', (jobId) => {
//   console.log(`Job ${jobId} is waiting`);
// });

// module.exports = { emailQueue, emailWorker, addEmailJob }; // Export the queue if you want to use it elsewhere

const { Queue, Worker } = require('bullmq');
const { sendEmail } = require('../services/email.service');

const { EventEmitter } = require('events');

const eventEmitter = new EventEmitter();

// Adjust the path based on your file structure
const redis = {
  host: '127.0.0.1',
  port: 6379,
};
const emailQueue = new Queue('emailQueue', { connection: redis });

// Create a worker with the same connection details as the queue
// const emailWorker = new Worker(
//   'emailQueue',
//   async (job) => {
//     // Worker logic
//     const { htmlTemplate, userId, subject } = job.data;
//     const jobId = job.id;
//     // for (let i = 0; i <= 100; i += 10) {
//     //   await job.updateProgress(i); // Update job progress
//     //   await sleep(1000); // Simulate some processing time
//     // }
//     // const totalParticipants = userId.length;
//     // userId.map(async (userId, index) => {
//     //   const progress = `${((index + 1) / totalParticipants) * 100}`;
//     //   console.log(index, { jobId: job.id, Progress: progress });
//     //   await job.updateProgress(progress);
//     //   // await sleep(1000);
//     // });

//     await sendEmail(htmlTemplate, userId, subject, job);
//     console.log('Worker processed email job', job.id);
//   },
//   { connection: redis }
// );

const emailWorker = new Worker(
  'emailQueue',
  async (job) => {
    // Worker logic
    const { htmlTemplate, userId, subject } = job.data;

    try {
      console.log('userid', userId);
      const totalParticipants = userId.length;
      for (let i = 0; i < userId.length; i + 1) {
        // eslint-disable-next-line no-await-in-loop
        await sendEmail(htmlTemplate, userId[i], subject, job, i, totalParticipants);
        const progress = Math.round(((i + 1) / userId.length) * 100);
        // eslint-disable-next-line no-await-in-loop
        await job.updateProgress(progress);
        eventEmitter.emit('sseUpdate', { jobId: job.id, progress });
      }
    } catch (error) {
      console.error(`Error processing job ${job.id}:`, error);
      throw error; // Rethrow to mark the job as failed
    }
    console.log(userId);
  },
  { connection: redis }
);

async function addEmailJob(htmlTemplate, userId, subject) {
  let job;
  try {
    // Enqueue a job with specified data
    job = await emailQueue.add('sendEmailJob', { htmlTemplate, userId, subject });

    eventEmitter.emit('sseUpdate', { message: `Job ${job.id} is waiting`, jobId: job.id, progress: 0 });
  } catch (error) {
    console.error('Failed to add email job to the queue:', error);
  }
}

// Function to send updates to SSE clients
function sendSSEUpdate(data) {
  eventEmitter.emit('sseUpdate', data);
}

emailWorker.on('progress', (job, progress) => {
  console.log(`Job ${job.id} is ${progress}% complete`);
  eventEmitter.emit('sseUpdate', { jobId: job.id, progress });
  // Remove the listener

  sendSSEUpdate({ jobId: job.id, progress });
});

emailQueue.on('failed', async function (job, err) {
  console.log(`Job ${job.id} failed with error ${err}`);
});

emailWorker.on('completed', (job) => {
  console.log(`Job ${job.id} has been completed`);
  eventEmitter.emit('sseUpdate', { message: `Job ${job.id} has been completed`, jobId: job.id, progress: 100 });
});

emailWorker.on('error', (err) => {
  console.log(`Worker error: ${err}`);
});

emailWorker.on('waiting', (job, progress) => {
  console.log(`Job ${job.id} is waiting`);
  eventEmitter.emit('sseUpdate', { jobId: job.id, progress });

  // sendSSEUpdate({ jobId: jobId, progress });
});

module.exports = { emailQueue, emailWorker, addEmailJob, eventEmitter }; // Export the queue if you want to use it elsewhere
