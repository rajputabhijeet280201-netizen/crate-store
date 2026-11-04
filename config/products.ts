export interface ProductTier {
  id: string;
  slug: string;
  name: string;
  badge?: string;
  tagline: string;
  priceInInr: number;
  originalPriceInInr: number;
  isPopular?: boolean;
  ctaText: string;
  features: string[];
  notIncluded?: string[];
  /** Which learning-path modules are included in this tier. */
  modulesIncluded: string[];
  /** Canonical path inside the storage bucket / local-pdfs (e.g. "products/file.zip"). */
  storagePath: string;
  /** Kept in sync with storagePath for backward compatibility with the Prisma Product.fileKey field. */
  fileKey: string;
  /** Optional sample chapter path. */
  sampleStoragePath?: string;
  sampleFileKey?: string;
  /** Number of preview pages to show (default 4). */
  previewPages?: number;
}

export interface IndividualProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceInInr: number;
  originalPriceInInr: number;
  fileKey: string;
  storagePath: string;
  visualStoragePath?: string;
  category: string;
  pages: number;
  badge?: string;
}

export const PRODUCTS_CONFIG: Record<string, ProductTier> = {
  'single-topic': {
    id: 'prod_single_topic_01',
    slug: 'single-topic',
    name: 'Phase 1: Linux & Git Starter Pack',
    badge: 'FOUNDATION',
    tagline: 'Master operating system internals and clean version control. Includes Linux for DevOps Fieldbook (79 pages) and Git & GitHub Pro (30 pages).',
    priceInInr: 299,
    originalPriceInInr: 999,
    ctaText: 'Buy Starter Pack (₹299)',
    features: [
      '01-Linux for DevOps Complete Fieldbook (79 pages, 4.4 MB)',
      '02-Git & GitHub Pro Workflow Fieldbook (30 pages)',
      '00-Official 30-Day DevOps & MLOps Curriculum & Study Guide',
      '/etc, /var, /proc filesystems, process signals (SIGTERM vs SIGKILL)',
      'Blobs, trees, commits, clean rebasing vs merging & PR workflows',
      'High-resolution vector PDFs with handwritten architecture diagrams',
      'Instant ZIP download on Cashfree payment completion',
    ],
    notIncluded: [
      'Docker from First Principles & Kubernetes Scenario Notes',
      'CI/CD with GitHub Actions & AWS for DevOps Architecture',
      '40 Incident Labs, 75 AWS Interview Scenarios & 5 Projects',
      'Phase 5: MLOps, DVC, Hugging Face, PyTorch & SageMaker',
    ],
    modulesIncluded: ['Phase 1: Systems & Core Foundations', '30-Day Study Guide'],
    storagePath: 'products/linux-git-starter-pack.zip',
    fileKey: 'products/linux-git-starter-pack.zip',
    sampleStoragePath: 'samples/devops-mlops-curriculum-guide.pdf',
    sampleFileKey: 'samples/devops-mlops-curriculum-guide.pdf',
    previewPages: 4,
  },
  'complete-edition': {
    id: 'prod_complete_edition_02',
    slug: 'complete-edition',
    name: 'DevOps Engineering Complete Track (Phases 1–4)',
    badge: 'MOST POPULAR • BEST VALUE',
    tagline: 'Complete production DevOps path: 9 Handbooks, 865 pages covering Systems, Containers, Cloud Infrastructure, Incident Response & Senior Interview Prep.',
    priceInInr: 699,
    originalPriceInInr: 1999,
    isPopular: true,
    ctaText: 'Get DevOps Track (₹699)',
    features: [
      '9 Production Handbooks across Phases 1, 2, 3, and 4 (865 pages total)',
      '01-Linux for DevOps (79p) + 02-Git & GitHub Pro (30p)',
      '03-Docker Working Guide (241p) + 04-Kubernetes Production Scenarios (154p)',
      '05-CI/CD with GitHub Actions (73p) + 06-AWS for DevOps Architecture (142p)',
      '07-75 AWS Spoken Interview Questions for Senior DevOps Roles (27p)',
      '08-40 Docker Incident Troubleshooting Labs: OOMKilled, volume & DNS (12p)',
      '09-5 Modern Docker Production Projects (Nginx, Redis, Postgres) (67p)',
      '00-Official 30-Day DevOps Study Schedule & 3-Step Mastery Method',
      'Instant ZIP download with lifetime re-download capability',
    ],
    notIncluded: [
      'Phase 5: Production MLOps & Generative AI Engineering (DVC, Hugging Face, PyTorch, SageMaker)',
    ],
    modulesIncluded: [
      'Phase 1: Systems & Core Foundations',
      'Phase 2: Containers & Orchestration',
      'Phase 3: Automation & Cloud Infrastructure',
      'Phase 4: Real-World Troubleshooting & Interview Prep',
    ],
    storagePath: 'products/devops-complete-edition.zip',
    fileKey: 'products/devops-complete-edition.zip',
    sampleStoragePath: 'samples/devops-mlops-curriculum-guide.pdf',
    sampleFileKey: 'samples/devops-mlops-curriculum-guide.pdf',
    previewPages: 6,
  },
  'lifetime-bundle': {
    id: 'prod_lifetime_bundle_03',
    slug: 'lifetime-bundle',
    name: 'All-Access Master Pass: DevOps + MLOps + GenAI',
    badge: 'ALL 16 HANDBOOKS • 1,804 PAGES',
    tagline: 'The full infrastructure-to-AI engineering path. All 5 Phases, 16 Handbooks, 1,804 pages including Production MLOps, LLMs, DVC, PyTorch, and SageMaker.',
    priceInInr: 999,
    originalPriceInInr: 3999,
    ctaText: 'Unlock All-Access Pass (₹999)',
    features: [
      'ALL 16 Handbooks across All 5 Phases (1,804 total pages of visual field notes)',
      'Complete DevOps Core (Phases 1 to 4): Linux, Git, Docker, K8s, CI/CD & AWS',
      'Phase 4 Interview Arsenal: 75 AWS Scenarios, 40 Docker Labs & 5 Microservice Projects',
      '10-DVC in Practice (243p): Data & model versioning pipelines and ML DAGs',
      '11-Hugging Face in Practice (144p): Transformers, PEFT, LoRA & TGI serving',
      '12-Monitoring in Practice (148p): Prometheus metrics, Evidently AI drift & Grafana',
      '13-Python for MLOps (121p): Pydantic v2 data validation & async FastAPI',
      '14-PyTorch in Practice (127p): Distributed Data Parallel (DDP) across GPUs & AMP',
      '15-AWS SageMaker in Practice (150p): Spot training (-70% cost) & Model Registry',
      '00-Curriculum & Study Guide with the 30-Day Daily Learning Schedule',
      'Lifetime access & free updates as tool versions evolve',
    ],
    modulesIncluded: [
      'Phase 1: Systems & Core Foundations',
      'Phase 2: Containers & Orchestration',
      'Phase 3: Automation & Cloud Infrastructure',
      'Phase 4: Real-World Troubleshooting & Interview Prep',
      'Phase 5: Production MLOps & Generative AI Engineering',
    ],
    storagePath: 'products/all-access-bundle.zip',
    fileKey: 'products/all-access-bundle.zip',
    sampleStoragePath: 'samples/devops-mlops-curriculum-guide.pdf',
    sampleFileKey: 'samples/devops-mlops-curriculum-guide.pdf',
    previewPages: 6,
  },
};

export const INDIVIDUAL_PRODUCTS: IndividualProduct[] = [
  // Phase 1
  {
    id: 'prod_linux_01',
    slug: 'linux-for-devops',
    title: '01. Linux for DevOps Complete Fieldbook',
    description: 'Master terminal mastery, /etc, /var, /proc filesystems, permissions (chmod/chown), process signals (SIGTERM vs SIGKILL), bash text tools, and systemd units.',
    priceInInr: 149,
    originalPriceInInr: 499,
    fileKey: 'bundle-all-access/01-Core-Foundations/01-linux-for-devops.pdf',
    storagePath: 'bundle-all-access/01-Core-Foundations/01-linux-for-devops.pdf',
    visualStoragePath: 'visual/01-Core-Foundations/01-linux-for-devops-visual-infographics.pdf',
    category: 'Core Foundations',
    pages: 79,
    badge: 'PHASE 1',
  },
  {
    id: 'prod_git_02',
    slug: 'git-and-github-pro',
    title: '02. Git & GitHub Pro Workflow Fieldbook',
    description: 'Professional version control: blobs, trees, commits, clean rebasing vs merging, resolving merge conflicts, PR review standards, and CI triggers.',
    priceInInr: 149,
    originalPriceInInr: 499,
    fileKey: 'bundle-all-access/01-Core-Foundations/02-git-and-github-pro.pdf',
    storagePath: 'bundle-all-access/01-Core-Foundations/02-git-and-github-pro.pdf',
    visualStoragePath: 'visual/01-Core-Foundations/02-git-and-github-pro-visual-infographics.pdf',
    category: 'Core Foundations',
    pages: 30,
    badge: 'PHASE 1',
  },
  // Phase 2
  {
    id: 'prod_docker_03',
    slug: 'docker-working-guide',
    title: '03. Docker from First Principles Working Guide',
    description: '241-page visual working guide: namespaces, cgroups, layered union storage, multi-stage builds, Docker Compose, bridge networking, and rootless security.',
    priceInInr: 199,
    originalPriceInInr: 699,
    fileKey: 'bundle-all-access/02-Containers-and-Orchestration/03-docker-working-guide.pdf',
    storagePath: 'bundle-all-access/02-Containers-and-Orchestration/03-docker-working-guide.pdf',
    visualStoragePath: 'visual/02-Containers-and-Orchestration/03-docker-working-guide-visual-infographics.pdf',
    category: 'Containers',
    pages: 241,
    badge: 'PHASE 2',
  },
  {
    id: 'prod_k8s_04',
    slug: 'kubernetes-scenario-notes',
    title: '04. Kubernetes Production Scenario Notes',
    description: '154-page architectural fieldbook: Pod lifecycle, ReplicaSets, Deployments, ClusterIP vs NodePort vs LoadBalancer, Ingress Controllers, ConfigMaps, Secrets, Rollouts.',
    priceInInr: 199,
    originalPriceInInr: 699,
    fileKey: 'bundle-all-access/02-Containers-and-Orchestration/04-kubernetes-scenario-notes.pdf',
    storagePath: 'bundle-all-access/02-Containers-and-Orchestration/04-kubernetes-scenario-notes.pdf',
    category: 'Orchestration',
    pages: 154,
    badge: 'PHASE 2',
  },
  // Phase 3
  {
    id: 'prod_cicd_05',
    slug: 'ci-cd-with-github-actions',
    title: '05. CI/CD with GitHub Actions Automation Blueprints',
    description: '73-page workflow blueprints: triggers, matrix builds, environments, OIDC IAM keys, caching, Docker image publishing to GHCR, and staging release gates.',
    priceInInr: 149,
    originalPriceInInr: 499,
    fileKey: 'bundle-all-access/03-Automation-and-Cloud/05-ci-cd-with-github-actions.pdf',
    storagePath: 'bundle-all-access/03-Automation-and-Cloud/05-ci-cd-with-github-actions.pdf',
    visualStoragePath: 'visual/03-Automation-and-Cloud/05-ci-cd-with-github-actions-visual-infographics.pdf',
    category: 'Automation',
    pages: 73,
    badge: 'PHASE 3',
  },
  {
    id: 'prod_aws_06',
    slug: 'aws-for-devops',
    title: '06. AWS for DevOps Production Cloud Architecture',
    description: '142-page enterprise cloud fieldbook: IAM zero-trust policies, multi-tier VPC subnets, NAT gateways, EC2, S3 bucket security policies, ECS containers & CloudWatch.',
    priceInInr: 199,
    originalPriceInInr: 699,
    fileKey: 'bundle-all-access/03-Automation-and-Cloud/06-aws-for-devops.pdf',
    storagePath: 'bundle-all-access/03-Automation-and-Cloud/06-aws-for-devops.pdf',
    category: 'Cloud Infrastructure',
    pages: 142,
    badge: 'PHASE 3',
  },
  // Phase 4
  {
    id: 'prod_interview_07',
    slug: 'aws-interview-questions',
    title: '07. 75 AWS Interview Questions for DevOps Engineers',
    description: 'Spoken technical answers and architectural scenario explanations: HA, auto-scaling, disaster recovery, blue-green deployments, IAM policies, and cost optimization.',
    priceInInr: 149,
    originalPriceInInr: 499,
    fileKey: 'bundle-all-access/04-Troubleshooting-and-Interviews/07-aws-interview-questions-for-devops.pdf',
    storagePath: 'bundle-all-access/04-Troubleshooting-and-Interviews/07-aws-interview-questions-for-devops.pdf',
    category: 'Interview Prep',
    pages: 27,
    badge: 'PHASE 4',
  },
  {
    id: 'prod_docker_labs_08',
    slug: 'docker-scenario-troubleshooting',
    title: '08. 40 Docker Scenario Troubleshooting Labs',
    description: 'Real-world incident response: OOMKilled exits, permissions on mounted volumes, port conflicts, zombie processes, container DNS failure, and CPU throttling.',
    priceInInr: 149,
    originalPriceInInr: 499,
    fileKey: 'bundle-all-access/04-Troubleshooting-and-Interviews/08-docker-scenario-interview-questions.pdf',
    storagePath: 'bundle-all-access/04-Troubleshooting-and-Interviews/08-docker-scenario-interview-questions.pdf',
    category: 'Troubleshooting',
    pages: 12,
    badge: 'PHASE 4',
  },
  {
    id: 'prod_docker_projects_09',
    slug: 'modern-docker-projects',
    title: '09. 5 Modern Docker Production Projects',
    description: '67-page complete multi-tier deployable applications: Web frontend, API microservice, Postgres database, Redis caching, Nginx reverse proxy, and health check monitoring.',
    priceInInr: 149,
    originalPriceInInr: 499,
    fileKey: 'bundle-all-access/04-Troubleshooting-and-Interviews/09-modern-docker-projects.pdf',
    storagePath: 'bundle-all-access/04-Troubleshooting-and-Interviews/09-modern-docker-projects.pdf',
    category: 'Portfolio Projects',
    pages: 67,
    badge: 'PHASE 4',
  },
  // Phase 5 (MLOps)
  {
    id: 'prod_dvc_10',
    slug: 'dvc-in-practice',
    title: '10. DVC in Practice: Data & Model Versioning',
    description: '243-page complete guide: Git-like data versioning, remote S3/GCS storage sync, reproducible ML pipelines, DAG dependencies, and experiment tracking.',
    priceInInr: 199,
    originalPriceInInr: 699,
    fileKey: 'bundle-all-access/05-MLOps-and-Production-AI/10-dvc-in-practice.pdf',
    storagePath: 'bundle-all-access/05-MLOps-and-Production-AI/10-dvc-in-practice.pdf',
    category: 'MLOps & AI',
    pages: 243,
    badge: 'PHASE 5',
  },
  {
    id: 'prod_hf_11',
    slug: 'hugging-face-in-practice',
    title: '11. Hugging Face in Practice: LLMs, PEFT & LoRA',
    description: '144 pages: Transformers architecture, parameter-efficient fine-tuning (LoRA / QLoRA), Text Generation Inference (TGI), model quantization, and production deployment.',
    priceInInr: 199,
    originalPriceInInr: 699,
    fileKey: 'bundle-all-access/05-MLOps-and-Production-AI/11-hugging-face-in-practice.pdf',
    storagePath: 'bundle-all-access/05-MLOps-and-Production-AI/11-hugging-face-in-practice.pdf',
    category: 'MLOps & AI',
    pages: 144,
    badge: 'PHASE 5',
  },
  {
    id: 'prod_monitoring_12',
    slug: 'monitoring-in-practice',
    title: '12. Monitoring in Practice: Prometheus & Evidently AI',
    description: '148 pages: Model performance tracking, data drift, concept drift detection, Population Stability Index (PSI), Prometheus metrics, and Grafana alerting dashboards.',
    priceInInr: 199,
    originalPriceInInr: 699,
    fileKey: 'bundle-all-access/05-MLOps-and-Production-AI/12-monitoring-in-practice.pdf',
    storagePath: 'bundle-all-access/05-MLOps-and-Production-AI/12-monitoring-in-practice.pdf',
    category: 'MLOps & AI',
    pages: 148,
    badge: 'PHASE 5',
  },
  {
    id: 'prod_python_13',
    slug: 'python-for-mlops',
    title: '13. Python for MLOps: Pydantic v2 & FastAPI Serving',
    description: '121 pages: Strict data contracts with Pydantic v2, high-throughput asynchronous inference APIs with FastAPI, dependency injection, and Dockerized microservice design.',
    priceInInr: 199,
    originalPriceInInr: 699,
    fileKey: 'bundle-all-access/05-MLOps-and-Production-AI/13-python-for-mlops.pdf',
    storagePath: 'bundle-all-access/05-MLOps-and-Production-AI/13-python-for-mlops.pdf',
    category: 'MLOps & AI',
    pages: 121,
    badge: 'PHASE 5',
  },
  {
    id: 'prod_pytorch_14',
    slug: 'pytorch-in-practice',
    title: '14. PyTorch in Practice: Distributed Training & AMP',
    description: '127 pages: Distributed Data Parallel (DDP) across multiple GPUs, Automatic Mixed Precision (AMP FP16/BF16), TorchScript compilation, and CUDA memory optimization.',
    priceInInr: 199,
    originalPriceInInr: 699,
    fileKey: 'bundle-all-access/05-MLOps-and-Production-AI/14-pytorch-in-practice.pdf',
    storagePath: 'bundle-all-access/05-MLOps-and-Production-AI/14-pytorch-in-practice.pdf',
    category: 'MLOps & AI',
    pages: 127,
    badge: 'PHASE 5',
  },
  {
    id: 'prod_sagemaker_15',
    slug: 'sagemaker-in-practice',
    title: '15. AWS SageMaker in Practice: Production ML at Scale',
    description: '150 pages: Managed training jobs with EC2 Spot Instances (-70% cost), SageMaker Model Registry, Serverless Endpoints, multi-model endpoints, and MLOps CI/CD pipelines.',
    priceInInr: 199,
    originalPriceInInr: 699,
    fileKey: 'bundle-all-access/05-MLOps-and-Production-AI/15-sagemaker-in-practice.pdf',
    storagePath: 'bundle-all-access/05-MLOps-and-Production-AI/15-sagemaker-in-practice.pdf',
    category: 'MLOps & AI',
    pages: 150,
    badge: 'PHASE 5',
  },
];

export const PRODUCTS_LIST = Object.values(PRODUCTS_CONFIG);

export function getProductBySlug(slug: string): ProductTier | undefined {
  return PRODUCTS_CONFIG[slug];
}

export function formatInr(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}
