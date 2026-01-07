import type { NextApiRequest } from "next";

/**
 * Get the client IP address from the request
 * Handles various proxy headers and direct connections
 */
export function getClientIp(req: NextApiRequest): string {
  // Check various headers that proxies/load balancers might use
  const forwarded = req.headers["x-forwarded-for"];
  const realIp = req.headers["x-real-ip"];
  const cfConnectingIp = req.headers["cf-connecting-ip"]; // Cloudflare
  
  // x-forwarded-for can contain multiple IPs, take the first one
  if (forwarded) {
    const ips = Array.isArray(forwarded) ? forwarded[0] : forwarded;
    return ips.split(",")[0].trim();
  }
  
  if (realIp) {
    return Array.isArray(realIp) ? realIp[0] : realIp;
  }
  
  if (cfConnectingIp) {
    return Array.isArray(cfConnectingIp) ? cfConnectingIp[0] : cfConnectingIp;
  }
  
  // Fallback to connection remote address
  if (req.socket?.remoteAddress) {
    return req.socket.remoteAddress;
  }
  
  // Last resort
  return "Unknown";
}

