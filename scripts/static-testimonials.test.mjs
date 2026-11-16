import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fetchReviews, prepareReview, readReviewDraft } from '../src/lib/staticTestimonials.js';

test('published reviews come from a shared static file and drafts stay private', async () => {
  const originalFetch = globalThis.fetch;
  const storage = new Map();
  const fixture = { id: 'test-only', client_name: 'Test visitor', company_role: 'Test role', message: 'Test fixture for the read path, never published.', rating: 5 };
  globalThis.localStorage = { getItem: key => storage.get(key) || null, setItem: (key,value) => storage.set(key,value) };
  try {
    globalThis.fetch = async (url) => { assert.equal(url, '/testimonials.json'); return new Response(JSON.stringify([fixture])); };
    assert.equal(readReviewDraft(), null);
    const link = prepareReview(fixture);
    assert.ok(link.startsWith('https://wa.me/918766971902?text='));
    assert.equal(readReviewDraft().client_name, fixture.client_name);
    assert.equal((await fetchReviews())[0].id, fixture.id);
    // A different browser has no draft but still receives the published file.
    storage.clear();
    assert.equal(readReviewDraft(), null);
    assert.equal((await fetchReviews())[0].id, fixture.id);
    assert.deepEqual(await fetchReviews(undefined, 1), []);
    assert.throws(() => prepareReview({ ...fixture, rating: 0 }));
    globalThis.fetch = async () => new Response('[]', { status: 503 });
    await assert.rejects(fetchReviews(), /could not be loaded/);
    globalThis.fetch = async () => new Response('[{}]');
    await assert.rejects(fetchReviews(), /temporarily unavailable/);
  } finally {
    globalThis.fetch = originalFetch;
    delete globalThis.localStorage;
  }
});
