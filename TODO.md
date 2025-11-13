# TODO: Implement Local AI Recommendations with @xenova/transformers

- [x] Add embedding field to Event model (array of numbers)
- [x] Create UserSearch model with query and embedding fields
- [x] Update events route POST /api/events to generate and store embeddings on creation
- [x] Update recommendation route to implement POST /api/search: Save user query with embedding
- [x] Update recommendation route to implement POST /api/events: Create event with embedding (integrate with existing events route)
- [x] Update recommendation route to implement GET /api/recommendations/:userId: Aggregate user embeddings and rank events by cosine similarity
- [x] Update frontend API calls in api.js to use new recommendation endpoints
- [ ] Seed embeddings for existing events
- [ ] Test embedding generation and similarity calculation
- [ ] Verify frontend integration
