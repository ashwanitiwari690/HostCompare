export interface GlossaryTerm {
  slug: string;
  term: string;
  shortDefinition: string;
  category: 'Infrastructure' | 'Performance' | 'Security' | 'Management';
  fullExplanation: string[];
  keyTakeaways: string[];
  comparisonContext: string;
  relatedTermSlugs: string[];
  relatedGuideSlugs: string[];
  relatedProviderSlugs: string[];
  faqs: { question: string; answer: string }[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: 'web-hosting',
    term: 'Web Hosting',
    category: 'Infrastructure',
    shortDefinition:
      'A service that allocates physical or virtual server storage, processing power, and network connectivity so website files can be accessed worldwide over the Internet.',
    fullExplanation: [
      'Web hosting is the foundational infrastructure that allows websites, applications, and web services to be accessible over the internet. When you build a website, all associated HTML documents, CSS stylesheets, JavaScript files, databases, and media assets must reside on a continuously connected computer known as a web server.',
      'When a user enters your domain name into a web browser, the Domain Name System (DNS) translates that domain into the numerical IP address of your host server. The server receives the HTTP/HTTPS request, processes any application logic (such as PHP or Node.js), queries the database if needed, and transmits the requested webpage back to the client device.',
      'Web hosting services vary widely in architecture, ranging from multi-tenant shared hosting to dedicated physical bare-metal hardware. Choosing the right hosting tier depends on expected traffic volume, resource requirements, database complexity, and the level of technical administrative control desired.',
    ],
    keyTakeaways: [
      'Hosting provides the compute and disk resources needed to serve website files 24/7.',
      'Differs from a domain name: the domain is the address (URL), while hosting is the physical space where files live.',
      'Core hosting architectures include Shared, VPS, Cloud, and Dedicated servers.',
    ],
    comparisonContext:
      'When comparing hosting providers on HostCompare, focus on server infrastructure, storage technology (NVMe vs SATA), uptime SLAs, and whether the environment offers automated daily backups and caching.',
    relatedTermSlugs: ['shared-hosting', 'vps', 'cloud-hosting', 'uptime'],
    relatedGuideSlugs: ['how-to-choose-web-hosting', 'domain-vs-hosting'],
    relatedProviderSlugs: ['hostinger', 'bluehost', 'siteground'],
    faqs: [
      {
        question: 'Do I need web hosting if I already own a domain name?',
        answer:
          'Yes. A domain name is merely your address on the internet. Without web hosting, your domain will not point to any server files, and visitors will see a blank or error page.',
      },
      {
        question: 'Can I change my web hosting provider later without losing my domain?',
        answer:
          'Absolutely. You can migrate your website files and databases to any host at any time by updating your domain’s DNS nameservers or A records.',
      },
    ],
  },
  {
    slug: 'shared-hosting',
    term: 'Shared Hosting',
    category: 'Infrastructure',
    shortDefinition:
      'An entry-level hosting environment where multiple independent websites share the physical CPU, RAM, and disk resources of a single server.',
    fullExplanation: [
      'Shared hosting is the most common and budget-friendly web hosting option. In a shared configuration, hundreds or even thousands of separate user accounts share the same physical server resources, including CPU cores, RAM, and network bandwidth.',
      'Modern shared hosting environments typically utilize OS-level virtualization tools such as CloudLinux LVE (Lightweight Virtual Environment) or CageFS to prevent a single traffic surge or compromised script on one website from crashing neighbor accounts.',
      'While cost-effective and typically managed via friendly control panels like cPanel or hPanel, shared hosting imposes strict resource ceilings (such as memory limits, simultaneous PHP workers, and database query quotas). High-traffic or resource-intensive applications will eventually require upgrading to VPS or cloud hosting.',
    ],
    keyTakeaways: [
      'Most economical choice for new blogs, personal portfolios, and low-traffic business sites.',
      'Server maintenance, security patches, and software updates are handled entirely by the host.',
      'Resource contention and strict PHP memory limits mean performance may drop under unexpected traffic spikes.',
    ],
    comparisonContext:
      'In our shared hosting comparisons, we look closely at entry vs renewal pricing, the type of web server used (LiteSpeed yields faster page loads than standard Apache), and whether daily backups are included for free.',
    relatedTermSlugs: ['web-hosting', 'vps', 'control-panel'],
    relatedGuideSlugs: ['shared-hosting-vs-vps', 'how-to-choose-web-hosting'],
    relatedProviderSlugs: ['hostinger', 'namecheap', 'bluehost', 'siteground'],
    faqs: [
      {
        question: 'How much traffic can shared hosting handle?',
        answer:
          'A well-optimized shared hosting plan with caching can comfortably handle between 10,000 and 30,000 monthly visits. Beyond that, database-heavy operations often hit execution limits.',
      },
      {
        question: 'Is shared hosting secure?',
        answer:
          'Reputable shared hosts isolate accounts using tools like CloudLinux CageFS. However, because you share the server IP address, neighbor activity can occasionally impact email deliverability if dedicated IP is not used.',
      },
    ],
  },
  {
    slug: 'vps',
    term: 'VPS (Virtual Private Server)',
    category: 'Infrastructure',
    shortDefinition:
      'A virtualized server environment that partitions a physical machine into isolated virtual servers, providing dedicated CPU cores and RAM.',
    fullExplanation: [
      'A Virtual Private Server (VPS) sits between shared hosting and dedicated bare-metal servers. Through hardware hypervisors like KVM (Kernel-based Virtual Machine), a single physical server is partitioned into multiple virtual servers.',
      'Unlike shared hosting, each VPS has guaranteed, dedicated allocations of CPU, RAM, and storage that cannot be consumed by other tenants on the hardware. Additionally, each VPS runs its own isolated operating system and grants root or administrator access.',
      'VPS hosting is offered in two main styles: Unmanaged (where the developer is responsible for installing the web server stack, firewalls, and security updates) and Managed (where the host provides a control panel, 24/7 server monitoring, automated backups, and technical support).',
    ],
    keyTakeaways: [
      'Guaranteed CPU and RAM ensure consistent performance unaffected by neighboring accounts.',
      'Provides full root access, custom firewall configurations, and choice of Linux distributions.',
      'Available in self-managed (for developers) and fully managed (for non-technical business owners) formats.',
    ],
    comparisonContext:
      'When evaluating VPS hosting, compare CPU architecture (dedicated vCPU vs shared threads), NVMe storage performance, monthly bandwidth allocations, and whether management tooling and backups are included or charged as add-ons.',
    relatedTermSlugs: ['shared-hosting', 'cloud-hosting', 'nvme'],
    relatedGuideSlugs: ['what-is-vps-hosting', 'shared-hosting-vs-vps', 'managed-vs-unmanaged-vps'],
    relatedProviderSlugs: ['digitalocean', 'vultr', 'cloudways', 'a2-hosting'],
    faqs: [
      {
        question: 'What is the difference between Managed and Unmanaged VPS?',
        answer:
          'An Unmanaged VPS delivers a raw operating system where you configure web servers, databases, security, and updates yourself. A Managed VPS includes automated setup, control panels, automated updates, and 24/7 host monitoring.',
      },
      {
        question: 'When should I upgrade from shared hosting to a VPS?',
        answer:
          'Upgrade when your site experiences frequent 503 Service Unavailable errors, when daily traffic regularly exceeds 1,000 visitors, or when your application requires custom server software, background workers, or higher PHP memory limits.',
      },
    ],
  },
  {
    slug: 'cloud-hosting',
    term: 'Cloud Hosting',
    category: 'Infrastructure',
    shortDefinition:
      'A scalable hosting infrastructure where websites run on an interconnected cluster of virtualized servers rather than a single physical machine.',
    fullExplanation: [
      'Cloud hosting utilizes a cluster of interconnected physical servers located in one or more data centers. Instead of your website relying on the health of a single physical server chassis, virtual machines pull resources from an expansive underlying hardware pool.',
      'The primary advantage of cloud infrastructure is high availability and instant scalability. If one hardware node in the cluster experiences a component failure (such as a power supply or RAM fault), your virtual instance seamlessly relocates to a healthy node with minimal or zero downtime.',
      'Cloud hosting platforms typically offer on-demand resource scaling (vertical CPU/RAM upgrades or horizontal clustering), utility billing (pay for what you consume per hour or month), and global data center redundancy.',
    ],
    keyTakeaways: [
      'Near-zero hardware downtime due to automatic cluster failover mechanisms.',
      'Instant vertical and horizontal scalability allows effortless handling of sudden traffic surges.',
      'Underpins major hyperscalers like AWS, Google Cloud Platform, DigitalOcean, and Cloudways.',
    ],
    comparisonContext:
      'In our cloud reviews, we analyze network latency, bandwidth transfer fees, snapshot costs, and ease of automated vertical scaling without service interruptions.',
    relatedTermSlugs: ['vps', 'uptime', 'cdn'],
    relatedGuideSlugs: ['what-is-cloud-hosting', 'developer-hosting-guide'],
    relatedProviderSlugs: ['cloudways', 'digitalocean', 'vultr'],
    faqs: [
      {
        question: 'How does Cloud hosting differ from traditional VPS?',
        answer:
          'A traditional VPS is bound to a single physical server hardware box. Cloud hosting instances draw resources from a redundant pool of networked machines, allowing auto-failover and dynamic resizing without manual data migration.',
      },
      {
        question: 'Is cloud hosting more expensive than shared hosting?',
        answer:
          'Yes, raw cloud infrastructure typically starts around $5 to $10/month, and managed cloud layers (like Cloudways) start around $11 to $14/month, compared to $2 to $4/month entry-level shared plans.',
      },
    ],
  },
  {
    slug: 'bandwidth',
    term: 'Bandwidth & Data Transfer',
    category: 'Performance',
    shortDefinition:
      'The maximum rate of data transfer across a network connection, and the total volume of data transmitted between your server and visitors over a billing period.',
    fullExplanation: [
      'While technical networking defines bandwidth as the maximum transmission capacity of a pipeline (measured in megabits or gigabits per second), hosting providers commonly use the term to describe monthly data transfer volume (measured in gigabytes or terabytes).',
      'Every time a visitor views your page, data travels from the server: HTML, CSS, JavaScript, images, video, and API responses. A 2 MB webpage visited by 50,000 people consumes approximately 100 GB of monthly bandwidth.',
      'Many budget shared hosting plans advertise "unmetered bandwidth." In reality, unmetered does not mean infinite: hosts limit consumption through hardware port speeds (e.g., 100 Mbps caps) and strict CPU/RAM Fair Use policies that throttle accounts before network bandwidth is exhausted.',
    ],
    keyTakeaways: [
      'Bandwidth measures the total data moved between your server and site visitors.',
      '"Unmetered" hosting means no per-gigabyte overage fees, but accounts remain constrained by CPU, RAM, and I/O caps.',
      'Using a CDN (Content Delivery Network) offloads up to 70% of static asset bandwidth from your primary hosting server.',
    ],
    comparisonContext:
      'We check whether bandwidth limits result in hard site suspensions, throttling, or per-gigabyte overage charges, distinguishing truly transparent cloud transfer allowances from misleading "unlimited" claims.',
    relatedTermSlugs: ['cdn', 'uptime', 'shared-hosting'],
    relatedGuideSlugs: ['how-to-improve-website-speed', 'how-to-choose-web-hosting'],
    relatedProviderSlugs: ['hostinger', 'siteground', 'digitalocean'],
    faqs: [
      {
        question: 'What happens if my website exceeds its monthly bandwidth limit?',
        answer:
          'Depending on your host, exceeding bandwidth will either result in an automated 509 Bandwidth Limit Exceeded error page, server speed throttling, or automatic overage billing (common on cloud hosts like DigitalOcean and AWS).',
      },
      {
        question: 'How can I calculate how much bandwidth my website needs?',
        answer:
          'Multiply your average page size (e.g., 2 MB) by expected monthly page views (e.g., 30,000) and add a 50% buffer for traffic surges and crawler activity. In this case, 2 MB × 30,000 = 60 GB, plus buffer = ~90 GB/month.',
      },
    ],
  },
  {
    slug: 'ssl',
    term: 'SSL/TLS Certificate',
    category: 'Security',
    shortDefinition:
      'A digital cryptographic certificate that authenticates website identity and enables an encrypted HTTPS connection between browser and server.',
    fullExplanation: [
      'SSL (Secure Sockets Layer), and its modern successor TLS (Transport Layer Security), encrypts communication between the visitor’s web browser and the hosting server. This ensures sensitive information—such as login credentials, credit card details, and personal data—cannot be intercepted or altered by third parties.',
      'A valid SSL certificate activates the padlock icon in the browser address bar and serves content over HTTPS rather than insecure HTTP. Major search engines like Google treat HTTPS as an explicit search ranking signal and flag non-HTTPS websites as "Not Secure".',
      'Today, nearly all quality web hosting providers include free, automated Domain Validated (DV) certificates through Let’s Encrypt or ZeroSSL. Premium Organization Validated (OV) and Extended Validation (EV) certificates provide additional corporate vetting for enterprise websites.',
    ],
    keyTakeaways: [
      'Essential for user privacy, ecommerce security, and search engine optimization (SEO).',
      'Free automated SSL certificates (Let’s Encrypt) are now an industry standard; never pay extra for basic SSL.',
      'Protects against man-in-the-middle attacks, cookie hijacking, and data tampering.',
    ],
    comparisonContext:
      'We penalize any hosting provider that still attempts to charge high annual fees for standard SSL certificates or fails to provide automated 90-day renewal mechanisms.',
    relatedTermSlugs: ['web-hosting', 'cdn'],
    relatedGuideSlugs: ['how-ssl-works', 'how-to-choose-web-hosting'],
    relatedProviderSlugs: ['siteground', 'dreamhost', 'a2-hosting'],
    faqs: [
      {
        question: 'Is a free Let’s Encrypt SSL certificate as secure as a paid certificate?',
        answer:
          'Yes. Cryptographically, free Let’s Encrypt certificates use the same 256-bit encryption algorithms as paid certificates. Paid certificates differ primarily in corporate identity vetting and financial warranty insurance, not encryption strength.',
      },
      {
        question: 'Does SSL improve my Google search rankings?',
        answer:
          'Yes. Google has officially used HTTPS as a ranking signal since 2014, and Google Chrome actively displays security warnings on sites without an active SSL certificate.',
      },
    ],
  },
  {
    slug: 'cdn',
    term: 'CDN (Content Delivery Network)',
    category: 'Performance',
    shortDefinition:
      'A geographically distributed network of proxy servers and data centers that cache and deliver static website assets from edge locations closest to visitors.',
    fullExplanation: [
      'A Content Delivery Network (CDN) is a distributed group of servers deployed across multiple global data centers (Points of Presence, or PoPs). When a visitor accesses your website, static assets—such as images, CSS, JavaScript, and video—are delivered from the closest geographic PoP rather than traveling halfway across the world from your origin web server.',
      'By serving files from edge servers, a CDN drastically reduces network latency (Time to First Byte and First Contentful Paint), preventing slow load times for international visitors.',
      'In addition to acceleration, modern CDNs like Cloudflare, Fastly, and CloudFront provide built-in DDoS mitigation, web application firewalls (WAF), automatic image compression (WebP/AVIF), and edge caching.',
    ],
    keyTakeaways: [
      'Minimizes physical distance latency by serving cached content from edge nodes near the visitor.',
      'Protects origin hosting servers from being overwhelmed during unexpected viral traffic spikes.',
      'Provides integrated Layer 3/4 and Layer 7 DDoS mitigation and bot protection.',
    ],
    comparisonContext:
      'We check whether hosting providers include native one-click CDN integration (such as Cloudflare or proprietary edge networks) and whether CDN caching is included in base pricing.',
    relatedTermSlugs: ['bandwidth', 'nvme', 'web-hosting'],
    relatedGuideSlugs: ['how-to-improve-website-speed', 'what-is-cloud-hosting'],
    relatedProviderSlugs: ['hostinger', 'siteground', 'cloudways'],
    faqs: [
      {
        question: 'Can a CDN replace web hosting?',
        answer:
          'No. A CDN is a caching layer, not an origin server. Your original website files, databases, and application code must still live on a web host. The CDN copies static files from your host and serves them from edge locations.',
      },
      {
        question: 'Is Cloudflare free to use with any web host?',
        answer:
          'Yes. Cloudflare offers a generous free tier that includes global CDN caching, free SSL, and standard DDoS protection, which can be connected to virtually any hosting provider by updating domain nameservers.',
      },
    ],
  },
  {
    slug: 'nvme',
    term: 'NVMe SSD Storage',
    category: 'Performance',
    shortDefinition:
      'A solid-state storage protocol designed for high-speed PCIe bus communication, delivering up to 6x faster data throughput and lower latency than SATA SSDs.',
    fullExplanation: [
      'NVMe (Non-Volatile Memory Express) is an advanced storage protocol developed specifically for solid-state media. Unlike older SATA SSDs that communicate over the legacy AHCI interface designed for mechanical spinning hard drives, NVMe drives connect directly to the computer’s high-speed PCI Express (PCIe) bus.',
      'This direct PCIe connection allows NVMe drives to execute up to 64,000 command queues with 64,000 commands per queue simultaneously, compared to SATA’s single queue of 32 commands. In real-world performance, NVMe delivers read/write speeds up to 3,500–7,000 MB/s versus SATA’s 550 MB/s ceiling.',
      'For web hosting, NVMe storage drastically accelerates database queries, WordPress dashboard navigation, dynamic page generation, and ecommerce checkout processing where high Input/Output Operations Per Second (IOPS) are demanded.',
    ],
    keyTakeaways: [
      'Delivers up to 5–7x higher read/write throughput and significantly lower seek latency than SATA SSDs.',
      'Directly speeds up database operations (MySQL/MariaDB) and PHP dynamic execution.',
      'Has rapidly become the standard storage medium for premium shared, VPS, and cloud hosting.',
    ],
    comparisonContext:
      'When comparing hosting hardware specs on HostCompare, we verify whether the host provides true NVMe storage or relies on older SATA SSD drives.',
    relatedTermSlugs: ['vps', 'cloud-hosting', 'shared-hosting'],
    relatedGuideSlugs: ['how-to-improve-website-speed', 'how-to-choose-web-hosting'],
    relatedProviderSlugs: ['a2-hosting', 'hostinger', 'vultr'],
    faqs: [
      {
        question: 'Will NVMe storage make my website noticeably faster?',
        answer:
          'For static HTML pages, the difference may be subtle if cached by a CDN. However, for database-driven CMS sites like WordPress, WooCommerce, and Magento, NVMe delivers noticeably faster page rendering and admin dashboard responsiveness.',
      },
      {
        question: 'How do I know if my hosting provider uses NVMe?',
        answer:
          'Hosts that utilize NVMe actively highlight it in their plan specifications. If a host only lists "SSD Storage" without mentioning NVMe, they are typically utilizing older, cheaper SATA SSD drives.',
      },
    ],
  },
  {
    slug: 'uptime',
    term: 'Website Uptime & SLAs',
    category: 'Infrastructure',
    shortDefinition:
      'The percentage of time a web server and website remain operational and accessible to visitors over a given measurement period.',
    fullExplanation: [
      'Website uptime measures the availability and reliability of your hosting provider’s infrastructure. It is expressed as a percentage of total time in a given month or year. A 99.9% uptime rate is the standard baseline across the hosting industry.',
      'While the difference between 99.9% and 99.99% may appear minuscule, the real-world downtime difference is substantial: 99.9% uptime permits 8 hours and 45 minutes of downtime per year, whereas 99.99% ("four nines") permits only 52 minutes of total annual downtime.',
      'Reputable hosts provide a Service Level Agreement (SLA) that outlines credit compensation if server availability drops below their guaranteed threshold. However, SLAs typically exclude scheduled maintenance windows and customer-induced application crashes.',
    ],
    keyTakeaways: [
      '99.9% uptime translates to up to ~43 minutes of allowed downtime per month.',
      '99.99% uptime requires redundant server clustering and automated failover architecture.',
      'Always review the fine print of an SLA: most hosts offer billing credits rather than cash refunds.',
    ],
    comparisonContext:
      'We audit the uptime track record and SLA terms of every host we review, noting whether uptime guarantees are backed by transparent public status dashboards and third-party monitoring.',
    relatedTermSlugs: ['web-hosting', 'cloud-hosting'],
    relatedGuideSlugs: ['how-to-choose-web-hosting', 'how-to-improve-website-speed'],
    relatedProviderSlugs: ['siteground', 'dreamhost', 'digitalocean'],
    faqs: [
      {
        question: 'Can any web host guarantee 100% uptime?',
        answer:
          'Some cloud hosts advertise 100% uptime SLAs (such as DreamHost), but in practice, no system is immune to catastrophic network interruptions or unforeseen software bugs. 100% SLAs simply mean the host will credit your account if any downtime occurs.',
      },
      {
        question: 'How can I monitor my website uptime independently?',
        answer:
          'Free and freemium services like UptimeRobot, Pingdom, and Better Stack check your site every 1–5 minutes from multiple global locations and alert you via email or SMS when downtime is detected.',
      },
    ],
  },
  {
    slug: 'control-panel',
    term: 'Hosting Control Panel',
    category: 'Management',
    shortDefinition:
      'A web-based graphical user interface that allows website owners to manage server settings, databases, domains, emails, and files without command-line code.',
    fullExplanation: [
      'A hosting control panel is a browser-based dashboard that simplifies the administrative management of a web server. Without a control panel, server administration requires entering command-line instructions via SSH to configure Apache/Nginx, install PHP extensions, and create MySQL databases.',
      'The historical industry standard is cPanel (often paired with WHM for server managers). Due to licensing fee increases in recent years, many top providers have engineered custom proprietary dashboards, such as Hostinger’s hPanel, SiteGround’s Site Tools, and DreamHost’s custom panel.',
      'Core functionalities provided by hosting control panels include file managers, FTP account creation, MySQL database wizards, DNS zone editing, SSL deployment, email mailbox management, and one-click application installers (e.g., Softaculous).',
    ],
    keyTakeaways: [
      'Eliminates the need for command-line server knowledge for routine hosting tasks.',
      'cPanel remains the most portable interface; proprietary panels (hPanel, Site Tools) often offer cleaner, faster modern UI.',
      'Developer-focused cloud hosts (DigitalOcean, Vultr) do not include control panels by default unless installed by the user.',
    ],
    comparisonContext:
      'In our provider evaluations, we test control panels for ease of use, mobile responsiveness, and whether key features like phpMyAdmin, Cron jobs, and Git deployments are easily accessible.',
    relatedTermSlugs: ['shared-hosting', 'vps', 'web-hosting'],
    relatedGuideSlugs: ['how-to-install-wordpress', 'how-to-connect-domain-to-hosting'],
    relatedProviderSlugs: ['hostinger', 'siteground', 'bluehost'],
    faqs: [
      {
        question: 'Is cPanel better than custom control panels like hPanel?',
        answer:
          'cPanel is familiar and makes migrating between hosts easy. However, custom dashboards like Hostinger’s hPanel and SiteGround’s Site Tools are often faster, more beginner-friendly, and avoid third-party licensing markups.',
      },
      {
        question: 'Can I install a free control panel on a VPS?',
        answer:
          'Yes. Popular free and open-source control panels for VPS servers include CloudPanel, CyberPanel (LiteSpeed-based), aaPanel, and HestiaCP.',
      },
    ],
  },
];

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((t) => t.slug === slug);
}

