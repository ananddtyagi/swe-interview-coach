import { Problem } from "../problem.types";

// Add a new problem for designing a chat application
export const chatApplication: Problem = {
    name: "Chat Application",
    problem: `# Chat Application System Design

## Problem Statement
Design a real-time chat application similar to popular messaging platforms.

## Requirements

### Functional Requirements
- Users should be able to send messages to other users in real-time
- Support both 1-on-1 and group chats
- Messages should persist across sessions
- Users should see when others are online/offline
- Support message history and search

### Non-Functional Requirements
- Low latency for message delivery
- High availability and reliability
- System should be scalable to millions of users
- Messages should be delivered in order
- Data consistency across multiple devices

## Discussion Points
- How would you handle real-time message delivery?
- What architecture would you use for scalability?
- How would you implement user presence?
- How would you store and retrieve message history?
- How would you handle offline users and message delivery?
- What database(s) would you choose and why?
- How would you ensure message ordering?
- How would you handle security and privacy?
    Considerations include handling user connections, message delivery, scalability, and data persistence. Think about how you would manage user presence, message history, and real-time updates. `,
}
