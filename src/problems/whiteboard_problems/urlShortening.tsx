import { Problem } from "../problem.types";

export const urlShortening: Problem = {
    name: "URL Shortening",
    problem: `# URL Shortening Service Design

## Problem Statement
Design a URL shortening service similar to TinyURL or Bitly that converts long URLs into shorter, more manageable aliases.

## Requirements

### Functional Requirements
- Users can input a long URL and receive a shortened URL
- When users access the shortened URL, they should be redirected to the original URL
- Links should be unique and hard to guess
- Optional: Custom short URLs for premium users
- Optional: Analytics on URL usage

### Non-Functional Requirements
- High availability and reliability
- Minimal latency for URL redirection
- Scalable to handle millions of URLs
- URLs should persist long-term
- System should be secure against malicious URLs

## Discussion Points
- How would you generate unique short URLs?
- What is the optimal length for shortened URLs?
- How would you handle collisions in URL generation?
- What storage solution would you use?
- How would you handle URL expiration?
- How would you scale the system?
- How would you handle security concerns?
- What analytics would you track and how?`,
}

