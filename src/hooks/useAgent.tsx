import { ElevenLabsClient } from "elevenlabs";

const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });
const agent = await client.conversationalAi.getAgent("MAUCQe7LwkQtcnpS8vDn");

export default function useAgent() {

}
