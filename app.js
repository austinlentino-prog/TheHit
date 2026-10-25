const supabaseUrl = "https://rsizxtuvflonxicjumsq.supabase.co";
const supabaseKey = "sb_publishable_ttZji3aeTOpmZ0q3udUvvQ__tbWaiPZ";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

async function loadPosts() {

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const feed = document.getElementById("feed");

  feed.innerHTML = data.map(post => `
    <div class="post">
      <div class="username">
        @${post.username}
      </div>

      <div class="content">
        ${post.content}
      </div>
    </div>
  `).join("");
}

async function makePost() {

  const input =
    document.getElementById("postInput");

  const text = input.value.trim();

  if (!text) return;

  const { error } = await supabase
    .from("posts")
    .insert([
      {
        username: "Austin",
        content: text
      }
    ]);

  if (error) {
    console.error(error);
    alert("Failed to post.");
    return;
  }

  input.value = "";

  loadPosts();
}

loadPosts();
