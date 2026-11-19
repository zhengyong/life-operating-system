import {jensenHuangPerspective} from './jensen-huang';
import type {PerspectiveEvent} from '@/lib/perspectives';

// Add future event files here; profile archives aggregate the same shared records.
export const perspectiveEvents: PerspectiveEvent[] = [jensenHuangPerspective];
