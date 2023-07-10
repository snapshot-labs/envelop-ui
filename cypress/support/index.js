import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
  failureThreshold: 0.03,
  allowSizeMismatch: true
});
