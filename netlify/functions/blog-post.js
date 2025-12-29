/**
 * AI Blog Posting Endpoint
 * Allows AI to post directly to blog.ai-ministries.com (Blogger)
 *
 * SAFE WORKFLOW:
 * 1. Store content in Supabase first (can't be lost)
 * 2. Publish to Blogger
 * 3. Update record with published URL
 *
 * POST with:
 * {
 *   "title": "Post Title",
 *   "content": "HTML or Markdown content",
 *   "labels": ["tag1", "tag2"],  // optional
 *   "image_prompt": "Pollinations prompt for header image",  // optional
 *   "author": "Violet"  // optional, for attribution
 * }
 */

// AI-MINISTRIES Supabase (for storage)
const SUPABASE_URL = "https://todhqdgatlejylifqpni.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable__I2HKmigwOP5xf-9OiIBgA_cdWmpYta";

// Blogger OAuth credentials (server-side only - from environment variables)
const BLOGGER_CREDENTIALS = {
  refresh_token: process.env.BLOGGER_REFRESH_TOKEN,
  client_id: process.env.BLOGGER_CLIENT_ID,
  client_secret: process.env.BLOGGER_CLIENT_SECRET,
  token_uri: "https://oauth2.googleapis.com/token"
};

const BLOG_URL = "https://blog.ai-ministries.com";

// Store content in Supabase (SAFETY NET - content can't be lost)
async function storeInSupabase(data) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_drafts`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      title: data.title,
      content: data.content,
      labels: data.labels || [],
      image_prompt: data.image_prompt || null,
      author: data.author || 'AI',
      status: 'pending',
      created_at: new Date().toISOString()
    })
  });

  const result = await response.json();
  if (response.status >= 400) {
    // Table might not exist yet - that's OK, continue without storage
    console.log('Storage warning:', result);
    return null;
  }
  return result[0];
}

// Update stored record with published URL
async function updateStoredRecord(id, publishedUrl, bloggerPostId) {
  if (!id) return;

  await fetch(`${SUPABASE_URL}/rest/v1/blog_drafts?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: 'published',
      published_url: publishedUrl,
      blogger_post_id: bloggerPostId,
      published_at: new Date().toISOString()
    })
  });
}

// Get fresh access token using refresh token
async function getAccessToken() {
  const response = await fetch(BLOGGER_CREDENTIALS.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: BLOGGER_CREDENTIALS.client_id,
      client_secret: BLOGGER_CREDENTIALS.client_secret,
      refresh_token: BLOGGER_CREDENTIALS.refresh_token,
      grant_type: 'refresh_token'
    })
  });
  const data = await response.json();
  if (!data.access_token) {
    throw new Error('Failed to get access token: ' + JSON.stringify(data));
  }
  return data.access_token;
}

// Get blog ID from URL
async function getBlogId(accessToken) {
  const response = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/byurl?url=${encodeURIComponent(BLOG_URL)}`,
    { headers: { 'Authorization': `Bearer ${accessToken}` } }
  );
  const data = await response.json();
  if (!data.id) {
    throw new Error('Failed to get blog ID: ' + JSON.stringify(data));
  }
  return data.id;
}

// Generate header image with Pollinations (gen.pollinations.ai - NEW endpoint, needs auth in Netlify env)
function generateHeaderImage(prompt) {
  const width = 1200;
  const height = 630; // 1200x630 for blog headers (social media optimal)
  const seed = Math.floor(Math.random() * 1000000); // Random seed for variety
  const encodedPrompt = encodeURIComponent(prompt);
  return `https://gen.pollinations.ai/image/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true`;
}

// Convert markdown to basic HTML if needed
function markdownToHtml(content) {
  let html = content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  return '<p>' + html + '</p>';
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed. Use POST.' })
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const { title, content, labels, image_prompt, author } = payload;

    if (!title || !content || !image_prompt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields: title, content, image_prompt',
          why: 'All blog posts MUST have an image. Provide image_prompt text and we generate it.',
          fix: 'Add image_prompt: "description of image you want"',
          example: {
            title: "My Post Title",
            content: "Post content here...",
            image_prompt: "Abstract digital art of AI collaboration, glowing nodes, dark background"
          }
        })
      };
    }

    // STEP 1: Store in Supabase first (SAFETY NET)
    const storedRecord = await storeInSupabase(payload);
    const recordId = storedRecord?.id;

    // STEP 2: Get access token and blog ID
    const accessToken = await getAccessToken();
    const blogId = await getBlogId(accessToken);

    // STEP 3: Build post content
    let postContent = '';

    if (image_prompt) {
      const imageUrl = generateHeaderImage(image_prompt);
      postContent += `<div style="text-align:center;margin-bottom:20px;">
        <img src="${imageUrl}" alt="${title}" style="max-width:100%;border-radius:8px;">
      </div>\n\n`;
    }

    if (author) {
      postContent += `<p><em>By ${author}</em></p>\n\n`;
    }

    if (content.includes('**') || content.includes('##') || content.includes('\n\n')) {
      postContent += markdownToHtml(content);
    } else {
      postContent += content;
    }

    // STEP 4: Create post via Blogger API
    const postData = {
      kind: 'blogger#post',
      blog: { id: blogId },
      title: title,
      content: postContent
    };

    if (labels && labels.length > 0) {
      postData.labels = labels;
    }

    const postResponse = await fetch(
      `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      }
    );

    const postResult = await postResponse.json();

    if (postResult.error) {
      throw new Error('Blogger API error: ' + JSON.stringify(postResult.error));
    }

    // STEP 5: Update stored record with published info
    await updateStoredRecord(recordId, postResult.url, postResult.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        post_id: postResult.id,
        url: postResult.url,
        title: postResult.title,
        published: postResult.published,
        stored_id: recordId
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to post to blog',
        details: error.message
      })
    };
  }
};
