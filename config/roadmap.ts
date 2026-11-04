export interface Handbook {
  id: string;
  title: string;
  tag?: string;
  price: number;
  blueprints: number;
  pages: number;
  format: string;
  badge?: string;
  category: string;
  icon: string;
  description: string;
  topics: string[];
  previewPages: string[];
}

export interface Milestone {
  number: string;
  numberInt: number;
  title: string;
  status: 'ACTIVE' | 'UPCOMING';
  handbooks: Handbook[];
}

export const ROADMAP_MILESTONES: Milestone[] = [
  {
    number: '01',
    numberInt: 1,
    title: 'Phase 1: Systems & Core Foundations',
    status: 'ACTIVE',
    handbooks: [
      {
        id: 'linux-fieldbook',
        title: '01. Linux for DevOps Complete Fieldbook',
        tag: '79 PAGES',
        price: 149,
        blueprints: 85,
        pages: 79,
        format: 'Instant PDF (4.4 MB)',
        category: 'Operating System Internals',
        icon: 'Terminal',
        description:
          'Handwritten visual notes on Linux terminal, /etc, /var, /proc filesystems, permissions (chmod/chown), process signals (SIGTERM vs SIGKILL), bash text tools, and systemd services.',
        topics: [
          'Filesystem hierarchy standard: /etc, /var, /proc, /sys',
          'Process lifecycle & signals (SIGTERM vs SIGKILL vs SIGHUP)',
          'User/group permissions, setuid/setgid, and umask',
          'systemd unit files, journalctl, and daemon management',
          'Linux network tools: ss, ip, curl, dig, iptables',
        ],
        previewPages: [
          '/previews/linux-infographic-p1.webp',
          '/previews/linux-infographic-p2.webp',
          '/previews/single-topic/page-1.webp',
          '/previews/single-topic/page-2.webp',
        ],
      },
      {
        id: 'git-fieldbook',
        title: '02. Git & GitHub Pro Workflow Fieldbook',
        tag: '30 PAGES',
        price: 149,
        blueprints: 32,
        pages: 30,
        format: 'Instant PDF',
        category: 'Version Control',
        icon: 'GitBranch',
        description:
          'Professional version control reference detailing Git internals (blobs, trees, commits), branching strategies, clean rebasing vs merging, resolving merge conflicts, and team PR standards.',
        topics: [
          'Git internal storage: blobs, trees, commit objects',
          'Merge vs Rebase mental models & interactive rebase',
          'Conflict resolution without losing commits',
          'Cherry-pick, stash architecture, and reflog recovery',
          'GitHub branch protection & PR review automation',
        ],
        previewPages: [
          '/previews/git-infographic-p1.webp',
          '/previews/git-infographic-p2.webp',
          '/previews/single-topic/page-3.webp',
          '/previews/single-topic/page-4.webp',
        ],
      },
    ],
  },
  {
    number: '02',
    numberInt: 2,
    title: 'Phase 2: Containers & Cluster Orchestration',
    status: 'ACTIVE',
    handbooks: [
      {
        id: 'docker-working-guide',
        title: '03. Docker from First Principles Working Guide',
        tag: '241 PAGES',
        price: 199,
        blueprints: 140,
        pages: 241,
        format: 'Instant PDF (9.7 MB)',
        category: 'Containerization',
        icon: 'Box',
        description:
          'Comprehensive 241-page visual working guide from single container to production stacks: namespaces, cgroups, layered union storage, multi-stage builds, compose orchestration, bridge networking, and rootless security.',
        topics: [
          'Linux kernel primitives: namespaces and cgroups',
          'Layered storage drivers & build cache optimization',
          'Production multi-stage builds for minimal image size',
          'Docker Compose multi-service stacks & health checks',
          'Bridge, host, overlay networks & rootless daemon security',
        ],
        previewPages: ['/previews/complete-edition/page-3.webp', '/previews/complete-edition/page-4.webp'],
      },
      {
        id: 'k8s-scenario-notes',
        title: '04. Kubernetes Production Scenario Notes',
        tag: '154 PAGES',
        price: 199,
        blueprints: 110,
        pages: 154,
        format: 'Instant PDF (7.0 MB)',
        category: 'Orchestration',
        icon: 'Boxes',
        description:
          '154-page architectural notes on distributed cluster operations: Pod lifecycle, ReplicaSets, Deployments, Services (ClusterIP, NodePort, LoadBalancer), Ingress, ConfigMaps, Secrets, Rollouts, and self-healing clusters.',
        topics: [
          'Pod lifecycle, probes (liveness, readiness, startup)',
          'ReplicaSets, Deployments & zero-downtime rolling updates',
          'Services (ClusterIP, NodePort, LoadBalancer) & kube-proxy',
          'Ingress controllers, routing rules & TLS termination',
          'ConfigMaps, Secrets, volume mounts & RBAC permissions',
        ],
        previewPages: ['/previews/complete-edition/page-1.webp', '/previews/complete-edition/page-3.webp'],
      },
    ],
  },
  {
    number: '03',
    numberInt: 3,
    title: 'Phase 3: Automation & Cloud Infrastructure',
    status: 'ACTIVE',
    handbooks: [
      {
        id: 'cicd-github-actions',
        title: '05. CI/CD with GitHub Actions Automation Blueprints',
        tag: '73 PAGES',
        price: 149,
        blueprints: 55,
        pages: 73,
        format: 'Instant PDF',
        category: 'CI/CD Automation',
        icon: 'Workflow',
        description:
          'Hands-on pipeline workflows from commit to cloud deployment: workflow triggers, matrix builds, environment secrets, OIDC AWS authentication, caching, container image publishing, and staging gates.',
        topics: [
          'Workflow triggers, path filtering, and concurrency groups',
          'Matrix builds across OS and Node/Python versions',
          'OIDC token exchange for keyless AWS / cloud auth',
          'Action cache, artifacts, and GHCR container registry publishing',
          'Reusable workflows, custom composite actions & deployment environments',
        ],
        previewPages: ['/previews/complete-edition/page-2.webp', '/previews/complete-edition/page-4.webp'],
      },
      {
        id: 'aws-devops-architecture',
        title: '06. AWS for DevOps Production Cloud Architecture',
        tag: '142 PAGES',
        price: 199,
        blueprints: 95,
        pages: 142,
        format: 'Instant PDF',
        category: 'Cloud Architecture',
        icon: 'Cloud',
        description:
          '142-page enterprise cloud infrastructure fieldbook: IAM zero-trust policies, VPC subnets, Route Tables, NAT gateways, EC2 autoscaling, S3 bucket security, ECS container services, and CloudWatch metrics.',
        topics: [
          'Multi-tier VPC architecture: public, private, and database subnets',
          'Internet Gateways, NAT Gateways & custom route tables',
          'IAM least-privilege roles, policies & service boundaries',
          'EC2 launch templates, Auto Scaling Groups & Application Load Balancers',
          'Amazon ECS with Fargate, S3 bucket encryption & CloudWatch logs',
        ],
        previewPages: ['/previews/complete-edition/page-1.webp', '/previews/complete-edition/page-4.webp'],
      },
    ],
  },
  {
    number: '04',
    numberInt: 4,
    title: 'Phase 4: Real-World Incident Troubleshooting & Projects',
    status: 'ACTIVE',
    handbooks: [
      {
        id: 'docker-troubleshooting',
        title: '08. 40 Docker Scenario Troubleshooting Labs',
        tag: '12 LABS',
        price: 149,
        blueprints: 40,
        pages: 12,
        format: 'Instant PDF',
        category: 'Incident Response',
        icon: 'Flame',
        description:
          'Real-world container incident response and error resolution: OOMKilled exits, permissions on mounted volumes, port conflicts, zombie processes, container DNS failure, and CPU throttling under on-call pressure.',
        topics: [
          'Diagnosing OOMKilled (Exit code 137) and memory leak tracing',
          'Volume permission mismatches (UID 1000 vs root)',
          'Port binding errors, zombie PID 1 processes & tini init',
          'Container DNS failure in bridge networks',
          'CPU quota throttling & graceful shutdown signal handling',
        ],
        previewPages: ['/previews/complete-edition/page-3.webp', '/previews/complete-edition/page-4.webp'],
      },
      {
        id: 'docker-projects',
        title: '09. 5 Modern Docker Production Projects',
        tag: '5 PROJECTS',
        price: 149,
        blueprints: 50,
        pages: 67,
        format: 'Instant PDF',
        category: 'Portfolio Projects',
        icon: 'FolderGit2',
        description:
          'Complete multi-tier application architectures ready to deploy: Web frontend, API microservice, Postgres database, Redis caching, Nginx reverse proxy, and automated health checks.',
        topics: [
          'Project 1: React + Node API + Postgres + Nginx Reverse Proxy',
          'Project 2: Python FastAPI + Redis background worker stack',
          'Project 3: Microservice event bus with RabbitMQ and workers',
          'Project 4: High-availability Prometheus + Grafana monitoring stack',
          'Project 5: Production-ready Docker Compose with secrets and volumes',
        ],
        previewPages: ['/previews/complete-edition/page-1.webp', '/previews/complete-edition/page-2.webp'],
      },
    ],
  },
  {
    number: '05',
    numberInt: 5,
    title: 'Phase 4 (Continued): Senior Technical Interview Arsenal',
    status: 'ACTIVE',
    handbooks: [
      {
        id: 'aws-interview-guide',
        title: '07. 75 AWS Interview Questions for DevOps Engineers',
        tag: '75 SCENARIOS',
        price: 149,
        blueprints: 75,
        pages: 27,
        format: 'Instant PDF',
        category: 'Interview Preparation',
        icon: 'HelpCircle',
        description:
          'Spoken technical answers and architectural scenario explanations using the Observe -> Diagnose -> Isolate -> Fix framework for high availability, auto-scaling, DR, blue-green deployments, and cost optimization.',
        topics: [
          'The Observe -> Diagnose -> Isolate -> Fix interview framework',
          'Designing 99.99% multi-region high availability architectures',
          'Disaster recovery: RTO vs RPO, Pilot Light vs Warm Standby',
          'Blue-Green vs Canary zero-downtime deployment tradeoffs',
          'AWS cost optimization: Reserved Instances, Savings Plans & Spot strategies',
        ],
        previewPages: ['/previews/complete-edition/page-2.webp', '/previews/complete-edition/page-3.webp'],
      },
    ],
  },
  {
    number: '06',
    numberInt: 6,
    title: 'Phase 5: MLOps Data & Pipeline Versioning',
    status: 'ACTIVE',
    handbooks: [
      {
        id: 'dvc-practice',
        title: '10. DVC in Practice: Data & Model Versioning',
        tag: '243 PAGES',
        price: 199,
        blueprints: 120,
        pages: 243,
        format: 'Instant PDF (3.0 MB)',
        category: 'MLOps & AI',
        icon: 'Database',
        description:
          '243-page complete guide: Git-like data versioning, remote S3/GCS storage sync, reproducible ML pipelines, DAG dependencies, experiment tracking, and automated model versioning.',
        topics: [
          'DVC fundamentals: pointer files (.dvc), remotes & content hash caching',
          'Configuring remote cloud storage (AWS S3, Google Cloud Storage, MinIO)',
          'Building reproducible ML pipelines (dvc.yaml and stage dependencies)',
          'Experiment tracking, metric diffs, and parameter matrix comparisons',
          'Integrating DVC with Git and CI/CD pipelines',
        ],
        previewPages: ['/previews/complete-edition/page-1.webp', '/previews/complete-edition/page-4.webp'],
      },
      {
        id: 'python-mlops',
        title: '13. Python for MLOps: Pydantic v2 & FastAPI',
        tag: '121 PAGES',
        price: 199,
        blueprints: 80,
        pages: 121,
        format: 'Instant PDF',
        category: 'MLOps Software Engineering',
        icon: 'Code',
        description:
          '121 pages: Strict data contracts with Pydantic v2, high-throughput asynchronous inference APIs with FastAPI, dependency injection, and Dockerized microservice design.',
        topics: [
          'Pydantic v2 model validation, serialization & strict typing',
          'FastAPI async routing, lifespan events & background tasks',
          'Packaging ML models for low-latency batch and stream inference',
          'Error handling, request schema documentation & OpenAPI generation',
          'Containerized deployment with Gunicorn/Uvicorn workers',
        ],
        previewPages: ['/previews/complete-edition/page-2.webp', '/previews/complete-edition/page-3.webp'],
      },
    ],
  },
  {
    number: '07',
    numberInt: 7,
    title: 'Phase 5: Generative AI & Deep Learning Engineering',
    status: 'ACTIVE',
    handbooks: [
      {
        id: 'huggingface-practice',
        title: '11. Hugging Face in Practice: LLMs, PEFT & LoRA',
        tag: '144 PAGES',
        price: 199,
        blueprints: 95,
        pages: 144,
        format: 'Instant PDF',
        category: 'Generative AI',
        icon: 'Sparkles',
        description:
          '144 pages: Transformers architecture, parameter-efficient fine-tuning (LoRA / QLoRA), Text Generation Inference (TGI), model quantization (AWQ/GPTQ), and production LLM serving.',
        topics: [
          'Transformers pipeline, tokenization & attention mechanics',
          'Parameter-Efficient Fine-Tuning: LoRA, QLoRA & rank configurations',
          'Quantization strategies: 4-bit / 8-bit precision (BitsAndBytes, AWQ)',
          'Text Generation Inference (TGI) & vLLM high-throughput serving',
          'Model evaluation, hallucination detection & prompt engineering gates',
        ],
        previewPages: ['/previews/complete-edition/page-3.webp', '/previews/complete-edition/page-4.webp'],
      },
      {
        id: 'pytorch-practice',
        title: '14. PyTorch in Practice: Distributed Training & AMP',
        tag: '127 PAGES',
        price: 199,
        blueprints: 90,
        pages: 127,
        format: 'Instant PDF',
        category: 'Deep Learning',
        icon: 'Cpu',
        description:
          '127 pages: Distributed Data Parallel (DDP) across multiple GPUs, Automatic Mixed Precision (AMP FP16/BF16), TorchScript compilation, and CUDA memory optimization.',
        topics: [
          'PyTorch tensors, autograd mechanics & compute graphs',
          'Distributed Data Parallel (DDP) setup across multi-GPU nodes',
          'Automatic Mixed Precision (AMP) with torch.cuda.amp for 2x speedup',
          'TorchScript & ONNX export for low-latency production inference',
          'Diagnosing CUDA Out of Memory (OOM) & gradient accumulation',
        ],
        previewPages: ['/previews/complete-edition/page-1.webp', '/previews/complete-edition/page-2.webp'],
      },
    ],
  },
  {
    number: '08',
    numberInt: 8,
    title: 'Phase 5: Production Observability & Model Drift',
    status: 'ACTIVE',
    handbooks: [
      {
        id: 'monitoring-practice',
        title: '12. Monitoring in Practice: Prometheus & Evidently AI',
        tag: '148 PAGES',
        price: 199,
        blueprints: 85,
        pages: 148,
        format: 'Instant PDF',
        category: 'ML Observability',
        icon: 'Activity',
        description:
          '148 pages: Model performance tracking, data drift, concept drift detection, Population Stability Index (PSI), Prometheus metrics, and Grafana alerting dashboards.',
        topics: [
          'Data drift vs concept drift: statistical testing (KS test, Chi-square)',
          'Population Stability Index (PSI) & Wasserstein distance calculation',
          'Evidently AI report generation and automated drift evaluation',
          'Exporting custom inference latency and error metrics to Prometheus',
          'Grafana dashboards for real-time model health & automated alerts',
        ],
        previewPages: ['/previews/complete-edition/page-2.webp', '/previews/complete-edition/page-4.webp'],
      },
    ],
  },
  {
    number: '09',
    numberInt: 9,
    title: 'Phase 5: Enterprise Cloud MLOps at Scale',
    status: 'ACTIVE',
    handbooks: [
      {
        id: 'sagemaker-practice',
        title: '15. AWS SageMaker in Practice: Production ML',
        tag: '150 PAGES',
        price: 199,
        blueprints: 90,
        pages: 150,
        format: 'Instant PDF',
        category: 'Cloud MLOps',
        icon: 'CloudLightning',
        description:
          '150 pages: Managed training jobs with EC2 Spot Instances (-70% cost), SageMaker Model Registry, Serverless Endpoints, multi-model endpoints, and MLOps CI/CD pipelines.',
        topics: [
          'SageMaker Estimators & managed EC2 Spot training (-70% compute bill)',
          'Model Registry: version approval workflows & metadata lineage',
          'Real-time, asynchronous & Serverless Endpoints configuration',
          'Multi-Model Endpoints (MME) for cost-efficient low-traffic models',
          'Automated MLOps pipelines with SageMaker Pipelines and GitHub Actions',
        ],
        previewPages: ['/previews/complete-edition/page-1.webp', '/previews/complete-edition/page-3.webp'],
      },
    ],
  },
];
