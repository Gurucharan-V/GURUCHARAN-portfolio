import { useEffect, useState } from "react";

const DISCORD_ID = "568377748867776522";

export default function DiscordStatus() {
  const [presence, setPresence] = useState(null);

  useEffect(() => {
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
      .then(res => res.json())
      .then(data => setPresence(data.data))
      .catch(() => setPresence(undefined));
  }, []);

  if (presence === null) return <div>Loading Discord status...</div>;
  if (presence === undefined) return <div>Discord user not found or unavailable.</div>;

  const { discord_user, discord_status } = presence;
  const avatarUrl = `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png`;

  return (
    <div style={{ textAlign: "center", margin: "2rem 0" }}>
      <img
        src={avatarUrl}
        alt={discord_user.username}
        style={{ width: 96, height: 96, borderRadius: "50%", marginBottom: 12 }}
      />
      <div style={{ fontWeight: "bold", fontSize: 24 }}>{discord_user.username}</div>
      <div style={{ color: "#888" }}>Status: {discord_status}</div>
    </div>
  );
} 