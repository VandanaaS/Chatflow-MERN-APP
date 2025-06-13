# Architecture Overview

## High-Level System Design

- Frontend: React (Hooks, Axios, WebSocket Client)
- Backend: Node.js + Express + MongoDB + Mongoose + Socket.io
- Authentication: JWT (JSON Web Tokens)
- Real-time Messaging: WebSockets via Socket.io
- Deployment: Can be extended with GitHub Actions

## Database Schema Design

- Users: { _id, username, email, passwordHash, avatarUrl, createdAt }
- Conversations: { _id, participants: [UserId], createdAt, updatedAt }
- Messages: { _id, conversationId, senderId, content, timestamp }

## API Design

- POST /auth/register
- POST /auth/login
- GET /users/me
- GET /conversations
- POST /conversations
- GET /conversations/:id/messages
- POST /conversations/:id/messages
- WebSocket: /ws

## Scaling Considerations

- MongoDB Atlas sharding for large datasets
- Redis PubSub for scaling Socket.io across multiple servers
- Load balancers for API and WebSockets
- Horizontal scaling of Node.js instances
- CDN for static frontend assets

## Trade-Offs & Decisions

- Chose WebSockets over polling for real-time delivery.
- Chose MERN stack for simplicity and developer velocity.
- JWT-based stateless auth for simplicity, but would add refresh tokens in production.
- Skipped full encryption layer (out of scope for prototype).

