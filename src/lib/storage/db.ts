import type { TMSStore } from './types';
import { STORE_KEY } from './types';
import { seedStore, SEED_VERSION } from './seed';

export function getStore(): TMSStore {
  const raw = localStorage.getItem(STORE_KEY);
  if (!raw) {
    const store = seedStore();
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
    return store;
  }
  try {
    const store = JSON.parse(raw) as TMSStore;
    return migrateStore(store);
  } catch {
    const store = seedStore();
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
    return store;
  }
}

export function saveStore(store: TMSStore): void {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

export function resetStore(): TMSStore {
  const store = seedStore();
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
  return store;
}

export function nextId(store: TMSStore, table: string): number {
  const key = table;
  store.counters[key] = (store.counters[key] || 0) + 1;
  return store.counters[key];
}

export function now(): string {
  return new Date().toISOString();
}

export function getUserById(store: TMSStore, id: number) {
  return store.users.find((u) => u.id === id);
}

export function userName(store: TMSStore, id: number): string {
  return getUserById(store, id)?.full_name ?? `User #${id}`;
}

/** Upgrade old localStorage to latest aligned demo dataset */
function migrateStore(store: TMSStore): TMSStore {
  if (!store.version || store.version < SEED_VERSION) {
    const fresh = seedStore();
    localStorage.setItem(STORE_KEY, JSON.stringify(fresh));
    return fresh;
  }
  if (!Array.isArray(store.activity_log)) store.activity_log = [];
  if (!store.counters) store.counters = {};
  store.activity_log = store.activity_log.map((row) => ({
    ...row,
    entity_label: row.entity_label ?? String(row.entity_type || '').replace(/_/g, ' '),
    link: row.link ?? '/shared/activity-log',
  }));
  return store;
}
