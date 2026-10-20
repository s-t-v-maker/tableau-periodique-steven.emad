
export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const message = body.message;

    if (typeof message !== "string" || !message.trim()) {
      return Response.json(
        { error: "Please enter a question." },
        { status: 400 }
      );
    }

    const answer = await context.env.AI.run(
      "@cf/meta/llama-3.1-8b-instruct",
      {
        messages: [
          {
            role: "system",
            content:
              "You are STEVEN AI, a friendly educational tutor. Help students understand science and social studies. Reply in the language used by the student. Explain step by step and encourage learning."
          },
          {
            role: "user",
            content: message.slice(0, 4000)
          }
        ]
      }
    );

    return Response.json({
      reply: answer.response
    });
  } catch (error) {
    return Response.json(
      { error: "AI is not configured yet. Please try again later." },
      { status: 500 }
    );
  }
}
