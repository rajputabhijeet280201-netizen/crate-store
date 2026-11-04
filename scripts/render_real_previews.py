import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import pypdfium2 as pdfium
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_DIR = os.path.join(BASE_DIR, 'local-pdfs', 'bundle-all-access')
OUT_DIR = os.path.join(BASE_DIR, 'public', 'previews')

PREVIEW_MAP = {
    'single-topic': [
        ('01-Core-Foundations/01-linux-for-devops.pdf', 0, 'page-1.webp'),   # Cover
        ('01-Core-Foundations/01-linux-for-devops.pdf', 2, 'page-2.webp'),   # Terminal fundamentals
        ('01-Core-Foundations/02-git-and-github-pro.pdf', 0, 'page-3.webp'), # Git cover
        ('01-Core-Foundations/02-git-and-github-pro.pdf', 3, 'page-4.webp'), # Git snapshot model
    ],
    'complete-edition': [
        ('02-Containers-and-Orchestration/03-docker-working-guide.pdf', 0, 'page-1.webp'),      # Docker cover
        ('02-Containers-and-Orchestration/03-docker-working-guide.pdf', 3, 'page-2.webp'),      # Container architecture
        ('02-Containers-and-Orchestration/04-kubernetes-scenario-notes.pdf', 0, 'page-3.webp'), # K8s cover
        ('02-Containers-and-Orchestration/04-kubernetes-scenario-notes.pdf', 4, 'page-4.webp'), # Replication & rollouts
        ('03-Automation-and-Cloud/05-ci-cd-with-github-actions.pdf', 0, 'page-5.webp'),         # CI/CD cover
        ('03-Automation-and-Cloud/06-aws-for-devops.pdf', 0, 'page-6.webp'),                    # AWS cover
    ],
    'lifetime-bundle': [
        ('05-MLOps-and-Production-AI/10-dvc-in-practice.pdf', 0, 'page-1.webp'),          # DVC cover
        ('05-MLOps-and-Production-AI/11-hugging-face-in-practice.pdf', 0, 'page-2.webp'), # Hugging Face
        ('05-MLOps-and-Production-AI/14-pytorch-in-practice.pdf', 0, 'page-3.webp'),      # PyTorch
        ('05-MLOps-and-Production-AI/15-sagemaker-in-practice.pdf', 0, 'page-4.webp'),    # SageMaker
        ('04-Troubleshooting-and-Interviews/07-aws-interview-questions-for-devops.pdf', 0, 'page-5.webp'), # 75 AWS Qs
        ('04-Troubleshooting-and-Interviews/08-docker-scenario-interview-questions.pdf', 0, 'page-6.webp'), # 40 Docker Labs
    ],
}

print(f"Generating authentic previews from {PDF_DIR} into {OUT_DIR}...")

for tier, pages in PREVIEW_MAP.items():
    tier_out_dir = os.path.join(OUT_DIR, tier)
    os.makedirs(tier_out_dir, exist_ok=True)
    print(f"\n📁 Tier: {tier} -> {tier_out_dir}")
    
    for rel_pdf, page_idx, out_filename in pages:
        full_pdf_path = os.path.join(PDF_DIR, rel_pdf.replace('/', os.sep))
        out_path = os.path.join(tier_out_dir, out_filename)
        
        if not os.path.exists(full_pdf_path):
            print(f"  ⚠️ Warning: PDF not found: {full_pdf_path}")
            continue
            
        doc = pdfium.PdfDocument(full_pdf_path)
        if page_idx >= len(doc):
            print(f"  ⚠️ Warning: Page index {page_idx} out of range for {rel_pdf} (total {len(doc)})")
            continue
            
        page = doc[page_idx]
        # Render at scale 2 for crisp resolution (approx 1200x1680)
        img = page.render(scale=2.0).to_pil()
        
        # Save as high-quality WebP
        img.save(out_path, format='WEBP', quality=85, method=6)
        file_size_kb = os.path.getsize(out_path) / 1024
        print(f"  ✅ Rendered [{tier}/{out_filename}] from {os.path.basename(rel_pdf)} (Page {page_idx+1}) - {img.size[0]}x{img.size[1]} ({file_size_kb:.1f} KB)")

print("\n🎉 All original PDF previews generated successfully!")
