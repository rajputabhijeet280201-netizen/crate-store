import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function inspect() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error('Missing URL or service role key');
    return;
  }

  console.log('Connecting to Supabase at:', url);
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: buckets, error: bError } = await supabase.storage.listBuckets();
  if (bError) {
    console.error('Error listing buckets:', bError);
    return;
  }

  console.log(`Found ${buckets.length} bucket(s):`);
  for (const b of buckets) {
    console.log(` - Bucket: "${b.name}" (public: ${b.public})`);
    
    // List recursively / folders
    async function listFolder(prefix = '') {
      const { data: items, error: fError } = await supabase.storage.from(b.name).list(prefix, { limit: 100 });
      if (fError) {
        console.error(`   Error listing ${b.name}/${prefix}:`, fError);
        return;
      }
      if (!items || items.length === 0) {
        if (!prefix) console.log(`   (empty bucket)`);
        return;
      }
      for (const item of items) {
        const itemPath = prefix ? `${prefix}/${item.name}` : item.name;
        if (item.id === null || !item.metadata) {
          console.log(`   📁 [Folder] ${itemPath}`);
          await listFolder(itemPath);
        } else {
          const sizeKb = item.metadata?.size ? (item.metadata.size / 1024).toFixed(1) + ' KB' : 'unknown size';
          console.log(`   📄 [File]   ${itemPath} (${sizeKb}, updated: ${item.updated_at || 'n/a'})`);
        }
      }
    }

    await listFolder();
  }
}

inspect().catch(console.error);

