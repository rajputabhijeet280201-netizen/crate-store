export const CONTENT_CONFIG = {
  header: {
    announcement: '🚀 Launch offer — instant high-res PDF download on Cashfree payment',
    ctaButton: 'Get notes from ₹299',
  },
  hero: {
    badge: '16 VISUAL FIELD GUIDES • 1,804 PAGES • 5 PRODUCTION PHASES',
    headline: 'Production DevOps & MLOps notes that finally make sense.',
    subheadline:
      '1,804 pages of diagram-heavy fieldbooks covering Linux, Git, Docker, Kubernetes, GitHub Actions CI/CD, AWS Architecture, 40 Incident Troubleshooting Labs, 75 Senior Interview Scenarios, and Production MLOps with DVC, Hugging Face, PyTorch, and SageMaker.',
    primaryCta: 'Unlock All-Access (₹999)',
    secondaryCta: 'Download free curriculum guide',
    trustNote: '⚡ Instant ZIP download · 🔒 Secure Cashfree UPI & card checkout · 📱 High-contrast vector PDFs for desktop, tablet, and mobile',
  },
  whatsInside: {
    title: 'The 5-Phase Production Curriculum',
    subtitle: '16 comprehensive handbooks delivered in dual-engine format: Visual Architectural Blueprints + Searchable Terminal Code Fieldbooks.',
    cards: [
      {
        icon: 'Terminal',
        title: 'Phase 1: Systems & Core Foundations',
        description:
          'Master Linux terminal mastery, filesystem internals (/etc, /var, /proc), permission models (chmod, chown, umask), process signals (SIGTERM vs SIGKILL), and Git tree/blob DAG architecture.',
        topics: ['01-Linux for DevOps (79p)', '02-Git & GitHub Pro (30p)', 'systemd & journalctl', 'Interactive rebase & GitFlow'],
      },
      {
        icon: 'Container',
        title: 'Phase 2: Containers & Orchestration',
        description:
          'Deep-dive into Linux namespaces, cgroups, multi-stage Docker builds, layer caching, and a 154-page Kubernetes handbook covering Pod lifecycles, Services, Ingress, and RollingUpdates.',
        topics: ['03-Docker Working Guide (241p)', '04-Kubernetes Scenarios (154p)', 'Multi-stage Dockerfiles', 'Zero-downtime rollouts'],
      },
      {
        icon: 'Cloud',
        title: 'Phase 3: Automation & Cloud Infrastructure',
        description:
          'End-to-end continuous delivery with GitHub Actions: OIDC cloud authentication, container build-push, and production AWS infrastructure (VPC subnets, IAM policies, ECS, EKS).',
        topics: ['05-CI/CD with GitHub Actions (73p)', '06-AWS for DevOps (142p)', 'OIDC & secrets hygiene', 'VPC, IAM, ECS & EKS'],
      },
      {
        icon: 'AlertTriangle',
        title: 'Phase 4: Troubleshooting & Interview Arsenal',
        description:
          'Debug production incidents with 40 real-world Docker labs (OOMKilled, volume permissions, DNS failures) and master 75 spoken AWS scenarios for senior DevOps interviews.',
        topics: ['07-75 AWS Interview Scenarios (27p)', '08-40 Docker Incident Labs (12p)', '09-5 Modern Docker Projects (67p)', 'Root cause analysis (RCA)'],
      },
      {
        icon: 'Cpu',
        title: 'Phase 5: Production MLOps & Generative AI',
        description:
          'Deploy, scale, and monitor machine learning models in production: DVC data pipelines, Hugging Face LLM fine-tuning with LoRA/PEFT, Prometheus drift monitoring, PyTorch DDP, and SageMaker spot training.',
        topics: ['10-DVC in Practice (243p)', '11-Hugging Face (144p)', '12-Drift Monitoring (148p)', '13-Python MLOps (121p)', '14-PyTorch DDP (127p)', '15-SageMaker (150p)'],
      },
    ],
  },
  learningPath: [
    {
      moduleNumber: 1,
      title: '01. Linux for DevOps Complete Fieldbook',
      pages: '79 pages',
      outcome: 'Navigate Linux systems with terminal confidence, inspect /proc and /sys internals, control systemd services, inspect socket traffic, and write battle-tested shell automations.',
      topics: [
        'Filesystem hierarchy, inode structure, and permissions (chmod, chown, umask, SUID/SGID)',
        'systemd unit configuration, service lifecycle, and journalctl production debugging',
        'Linux networking commands (netstat, ss, curl, dig, iptables, traceroute)',
        'Process management, signals (SIGTERM vs SIGKILL), and kernel memory metrics',
      ],
      lab: 'Configure a sandboxed systemd service with automatic restart on failure, resource limits, and non-root execution.',
    },
    {
      moduleNumber: 2,
      title: '02. Git & GitHub Pro Workflow Fieldbook',
      pages: '30 pages',
      outcome: 'Master Git internals (blobs, trees, commits, tags), branch topologies, merge vs rebase, cherry-picking, and professional team collaboration.',
      topics: [
        'Git internal architecture: Object database, SHA-1 hashing, and DAG structure',
        'Branching models: Trunk-Based Development vs GitFlow in production',
        'Merge vs Rebase: fast-forward, 3-way merge, and interactive rebasing conflict resolution',
        'Advanced Git tools: git stash, cherry-pick, reset vs revert, and pre-commit hooks',
      ],
      lab: 'Resolve an interactive rebase conflict, squash WIP commits into clean semantic history, and push via branch protection rules.',
    },
    {
      moduleNumber: 3,
      title: '03. Docker Working Guide: Architecture & Production Containers',
      pages: '241 pages',
      outcome: 'Understand Linux namespaces and cgroups, optimize multi-stage builds, manage Docker Compose multi-service stacks, and eliminate container vulnerabilities.',
      topics: [
        'Container architecture: Linux namespaces (PID, NET, MNT) and cgroups isolation',
        'Dockerfile engineering: layer caching, minimizing image size (<30MB), and non-root users',
        'Docker Compose for microservices: networks, volumes, health checks, and restart policies',
        'Security scanning, Docker socket hardening, and container registry workflows',
      ],
      lab: 'Create a multi-stage Dockerfile for a Go/Node.js API that builds a minimal scratch/Alpine image with non-root security.',
    },
    {
      moduleNumber: 4,
      title: '04. Kubernetes Production Scenario Notes',
      pages: '154 pages',
      outcome: 'Master Kubernetes architectural components, Pod scheduling, zero-downtime rolling updates, Ingress controllers, and persistent storage.',
      topics: [
        'Control Plane internals: kube-apiserver, etcd quorum, controller-manager, and kube-scheduler',
        'Pod lifecycle, InitContainers, probes (Liveness, Readiness, Startup), and graceful shutdown (SIGTERM)',
        'Networking: ClusterIP, NodePort, LoadBalancer, Ingress (Nginx/Traefik), and CoreDNS',
        'Storage: PV, PVC, StorageClasses, and stateful application deployment patterns',
      ],
      lab: 'Deploy a zero-downtime application with maxSurge/maxUnavailable rollout strategies, pod anti-affinity, and readiness checks.',
    },
    {
      moduleNumber: 5,
      title: '05. CI/CD with GitHub Actions Visual Blueprints',
      pages: '73 pages',
      outcome: 'Build end-to-end automated pipelines that lint, test, build multi-arch container images, and deploy securely with OpenID Connect (OIDC).',
      topics: [
        'Workflow syntax, events, triggers (push, pull_request, workflow_dispatch), and job DAGs',
        'Security: GitHub Secrets, Environment protection rules, and keyless AWS/GCP OIDC authentication',
        'Docker build-push automation with cache backends (gha, registry)',
        'Matrix builds, reusable composite actions, and artifact promotion pipelines',
      ],
      lab: 'Create a reusable GitHub Actions workflow with OIDC authentication to push signed container images to AWS ECR.',
    },
    {
      moduleNumber: 6,
      title: '06. AWS for DevOps Architecture & Cloud Infrastructure',
      pages: '142 pages',
      outcome: 'Architect secure cloud environments on AWS covering VPC design, IAM least privilege, compute (EC2, ECS, EKS), and serverless automation.',
      topics: [
        'VPC architecture: public/private subnets, Internet Gateways, NAT Gateways, and Route Tables',
        'IAM security: roles, policies, STS assume-role, and cross-account access patterns',
        'Container workloads: ECS Fargate vs Elastic Kubernetes Service (EKS)',
        'Storage & Database: S3 lifecycle rules, RDS Aurora multi-AZ, and DynamoDB backups',
      ],
      lab: 'Design a highly available multi-tier VPC with public and private subnets, NAT Gateways, and security group isolation.',
    },
    {
      moduleNumber: 7,
      title: '07 & 08. Real-World Troubleshooting & Interview Arsenal',
      pages: '106 pages',
      outcome: 'Tackle senior DevOps interview scenarios and debug live production incidents under pressure.',
      topics: [
        '07-75 AWS Interview Scenarios (27p): Spoken technical answers for senior cloud architect rounds',
        '08-40 Docker Incident Labs (12p): OOMKilled (Exit 137), file permission crashes, and DNS failures',
        '09-5 Modern Docker Projects (67p): Production setups for Nginx, Redis, PostgreSQL, and Node.js',
        'Incident post-mortems, root cause analysis (RCA), and SRE best practices',
      ],
      lab: 'Diagnose and fix a container failing with Exit 137 OOMKilled by tuning cgroup memory limits and profiling memory leaks.',
    },
    {
      moduleNumber: 8,
      title: '10–15. Production MLOps & Generative AI Engineering',
      pages: '933 pages',
      outcome: 'Bridge DevOps and Machine Learning: build reproducible data pipelines, fine-tune LLMs, track data drift, and train across distributed GPUs.',
      topics: [
        '10-DVC in Practice (243p): Data and model versioning pipelines and ML DAGs',
        '11-Hugging Face in Practice (144p): Transformers, PEFT, LoRA fine-tuning, and Text Generation Inference (TGI)',
        '12-Monitoring in Practice (148p): Prometheus, Evidently AI data drift, and Grafana dashboards',
        '13-Python for MLOps (121p): Pydantic v2 schemas and high-throughput async FastAPI servers',
        '14-PyTorch in Practice (127p): Distributed Data Parallel (DDP) across multiple GPUs and AMP (FP16/BF16)',
        '15-AWS SageMaker in Practice (150p): Spot training instances (-70% cost) and Model Registry pipelines',
      ],
      lab: 'Set up an automated DVC pipeline that trains a model, versions metrics to Git/S3, and deploys an inference API on SageMaker.',
    },
  ],
  about: {
    badge: 'About the Author & Philosophy',
    headline: 'Written by an engineer who debugs production infrastructure every day.',
    name: 'Jeet Rajput',
    role: 'Senior DevOps & Cloud Platform Engineer',
    photo: '/about/author-photo.jpg',
    bio: [
      'I created this 16-handbook visual field notes library to solve the exact frustration I experienced while mastering DevOps and MLOps: superficial tutorials that teach syntax without explaining system internals, architectural trade-offs, or production failure modes.',
      'Every single one of the 1,804 pages is crafted with clean visual mental models, annotated YAML manifests, exact terminal commands, and battle-tested incident checklists that you can keep open right beside your terminal.',
    ],
    experiencePlaceholders: [
      { label: 'Total Content', value: '16 Handbooks • 1,804 Pages across 5 Phases' },
      { label: 'Engineering Focus', value: 'Linux, Kubernetes, GitHub Actions, AWS & Production MLOps' },
      { label: 'Format', value: 'High-contrast annotated visual PDFs with zero fluff' },
    ],
  },
  socialProof: {
    title: 'Reader Feedback from Working Engineers',
    subtitle: 'What engineers and students say about the visual notes format.',
    note: 'Real reviews from engineers preparing for CKA, AWS certifications, and senior technical interviews.',
    testimonials: [
      {
        id: 't1',
        name: 'Aman Sharma',
        role: 'DevOps Engineer, Bengaluru',
        content:
          'The Kubernetes scenario notes and the 40 Docker troubleshooting labs are pure gold. The OOMKilled and rolling update diagrams made things click faster than 40 hours of video courses.',
        avatar: '/testimonials/placeholder-1.jpg',
      },
      {
        id: 't2',
        name: 'Pooja Iyer',
        role: 'Senior Cloud Engineer, Hyderabad',
        content:
          'The 75 AWS interview questions and the GitHub Actions CI/CD guide gave me the exact architecture explanations I needed for my senior interview rounds. Got 2 offers within a month!',
        avatar: '/testimonials/placeholder-2.jpg',
      },
      {
        id: 't3',
        name: 'Rohan Mehta',
        role: 'MLOps Engineer, Pune',
        content:
          'Finding high-quality MLOps notes is almost impossible. The DVC, SageMaker spot training, and PyTorch DDP fieldbooks are structured like production runbooks. Worth 10x the price.',
        avatar: '/testimonials/placeholder-3.jpg',
      },
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    subtitle: 'Everything you need to know about the 16 handbooks, downloads, and Cashfree payments.',
    items: [
      {
        question: 'How do I receive the handbooks after payment?',
        answer:
          'Immediately after your payment is confirmed via Cashfree, you will be redirected to the secure order confirmation page with your instant download button. You will also receive an email with your personalized, secure download link.',
      },
      {
        question: 'What is included in the All-Access Master Pass (₹999)?',
        answer:
          'The All-Access Master Pass includes all 16 handbooks across all 5 phases (1,804 total pages of notes), packaged into a single complete ZIP archive, plus the official 30-Day Curriculum Guide and lifetime updates as tool versions evolve.',
      },
      {
        question: 'Can I read the notes on my phone or tablet?',
        answer:
          'Yes. Every page is rendered as a crystal-clear, high-contrast vector PDF. Text and handwritten-style diagrams remain razor-sharp on mobile phones, iPads, Android tablets, laptops, and large external monitors.',
      },
      {
        question: 'Which payment methods are supported via Cashfree?',
        answer:
          'Cashfree supports all major Indian and international payment options: UPI (Google Pay, PhonePe, Paytm, BHIM), credit and debit cards (Visa, Mastercard, RuPay), Netbanking across 50+ banks, and major digital wallets.',
      },
      {
        question: 'How does the 30-day curriculum study guide work?',
        answer:
          'Included in the pack is the 00-START-HERE curriculum guide. It outlines the 3-step daily mastery method: Step 1 Visual First (15 mins), Step 2 Active Reproduction (20 mins), and Step 3 Scenario Drill (15 mins), with day-by-day reading assignments across the 5 phases.',
      },
      {
        question: 'Will these notes help with CKA and AWS certifications?',
        answer:
          'Yes. The Kubernetes (154 pages) and AWS (142 pages) handbooks cover the exact production architectures and troubleshooting scenarios tested in CKA, CKAD, and AWS Solutions Architect / DevOps Professional exams.',
      },
    ],
  },
  seo: {
    keywords: [
      'devops notes pdf',
      'kubernetes study guide pdf',
      'CKA exam notes',
      'docker interview questions',
      'aws for devops notes',
      'github actions ci cd guide',
      'mlops notes pdf',
      'dvc machine learning pipelines',
      'sagemaker in practice',
      'devops interview scenarios',
    ],
  },
  finalCta: {
    headline: 'Start mastering production infrastructure & MLOps today.',
    subheadline:
      '1,804 pages of battle-tested field notes covering the exact tools you use on the job. Instant high-res PDF download on secure Cashfree payment.',
    buttonText: 'Unlock complete notes (from ₹299)',
  },
  footer: {
    disclaimer:
      'Disclaimer: This website and study notes are independent educational materials and are not affiliated with, endorsed by, or sponsored by CNCF, Linux Foundation, Docker Inc., Amazon Web Services, GitHub, or any other organization mentioned. All trademarks belong to their respective owners.',
    copyright: `© ${new Date().getFullYear()} Fieldnotes DevOps + MLOps. All rights reserved.`,
  },
};
