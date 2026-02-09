import dns from 'dns';

try {
    // Use Google and Cloudflare DNS to resolve SRV record issues
    dns.setServers(['8.8.8.8', '1.1.1.1']);
    console.log('Custom DNS servers set: 8.8.8.8, 1.1.1.1');
} catch (error) {
    console.error('Failed to set custom DNS servers:', error);
}
