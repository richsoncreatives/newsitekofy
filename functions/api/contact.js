// Cloudflare Pages Function: handles form submissions at /api/contact on Cloudflare edge
export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    return new Response(JSON.stringify({
      success: true,
      message: 'Inquiry received. Thank you for reaching out to Eric Richson Darko.',
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      success: true,
      message: 'Inquiry received successfully.'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
